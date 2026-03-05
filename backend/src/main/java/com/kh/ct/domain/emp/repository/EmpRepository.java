package com.kh.ct.domain.emp.repository;

import com.kh.ct.domain.emp.dto.EmpDto;
import com.kh.ct.domain.emp.entity.Emp;
import com.kh.ct.domain.health.dto.HealthDto;
import com.kh.ct.global.common.CommonEnums;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmpRepository extends JpaRepository<Emp, String> {

    List<Emp> findByEmpStatus(CommonEnums.EmpStatus status);

    List<Emp> findByEmpNameContainingAndEmpStatus(String keyword, CommonEnums.EmpStatus status);

    Optional<Emp> findByEmpIdAndEmpStatus(String empId, CommonEnums.EmpStatus status);

    Optional<Emp> findByAirlineIdAndRole(com.kh.ct.domain.emp.entity.Airline airline, CommonEnums.Role role);

    Optional<Emp> findByEmailAndRole(String email, CommonEnums.Role role);

    Optional<Emp> findByEmailAndEmpStatus(String email, CommonEnums.EmpStatus empStatus);

    List<Emp> findByAirlineId_AirlineIdAndJob(Long airlineId, String job);

    Optional<Emp> findByEmpNameAndEmailAndEmpStatus(String empName, String email, CommonEnums.EmpStatus status);

    Optional<Emp> findByEmpIdAndEmailAndEmpStatus(String empId, String email, CommonEnums.EmpStatus status);

    @Query("SELECT e FROM Emp e " +
            "LEFT JOIN FETCH e.departmentId dept " +
            "LEFT JOIN FETCH e.airlineId airline " +
            "WHERE e.empId = :empId")
    Optional<Emp> findByIdWithDetails(@Param("empId") String empId);

    boolean existsByEmpNo(String empNo);

    @Query("""
        select max(e.empNo)
        from Emp e
        where e.empNo like concat(:yearPrefix, '%')
    """)
    String findMaxEmpNoByYearPrefix(@Param("yearPrefix") String yearPrefix);

    @Query(
            value = """
    select new com.kh.ct.domain.health.dto.HealthDto$AdminEmpHealthRow(
      e.empId,
      e.empName,
      d.departmentName,
      e.job,
      e.startDate,
      (select max(pt.testDate)from EmpPhysicalTest pt where pt.empId.empId = e.empId),
      (select eh.healthPoint
         from EmpHealth eh
        where eh.empId = e
          and eh.createDate = (
              select max(eh2.createDate)
              from EmpHealth eh2
              where eh2.empId = e
          )
      )
    )
    from Emp e
    left join e.departmentId d
    where (:empName is null or :empName = '' or e.empName like concat('%', :empName, '%'))
    order by e.empName asc
  """,
            countQuery = """
    select count(e)
    from Emp e
    where (:empName is null or :empName = '' or e.empName like concat('%', :empName, '%'))
  """
    )
    Page<HealthDto.AdminEmpHealthRow> findAdminEmpHealthRows(@Param("empName") String empName, Pageable pageable);

    // 역할별 직원 조회 (JOIN FETCH로 LAZY 직렬화 문제 방지)
    // ✅ 활성 직원(empStatus='Y')만 조회
    @Query("""
            SELECT DISTINCT e
            FROM Emp e
            LEFT JOIN FETCH e.departmentId dept
            LEFT JOIN FETCH e.airlineId airline
            WHERE (:role IS NULL OR e.role = :role)
              AND (:airlineId IS NULL OR airline.airlineId = :airlineId)
              AND e.empStatus = 'Y'
            ORDER BY e.empName ASC
        """)
    List<Emp> findByRoleAndAirlineId(
            @Param("role") CommonEnums.Role role,
            @Param("airlineId") Long airlineId
    );

    List<Emp> findByAirlineId_AirlineIdAndDepartmentId_DepartmentIdAndEmpStatusAndEmpIdNot(
            Long airlineId,
            Long departmentId,
            CommonEnums.EmpStatus empStatus,
            String empIdNot
    );

    @Query("SELECT e.email FROM Emp e " +
            "WHERE e.airlineId.airlineId = :airlineId " +
            "AND e.empStatus = :empStatus " +
            "AND (e.role = :superAdminRole OR e.role = :airlineAdminRole) " +
            "AND e.email IS NOT NULL " +
            "AND e.email != '' " +
            "ORDER BY " +
            "  CASE WHEN e.role = :superAdminRole THEN 1 " +
            "       WHEN e.role = :airlineAdminRole THEN 2 " +
            "       ELSE 3 END, " +
            "  e.createDate ASC")
    List<String> findAdminEmailsByAirlineId(
            @Param("airlineId") Long airlineId,
            @Param("empStatus") CommonEnums.EmpStatus empStatus,
            @Param("superAdminRole") CommonEnums.Role superAdminRole,
            @Param("airlineAdminRole") CommonEnums.Role airlineAdminRole
    );

    @Query("SELECT e.empId FROM Emp e " +
            "WHERE e.airlineId.airlineId = :airlineId " +
            "AND e.empStatus = :empStatus " +
            "AND (e.role = :superAdminRole OR e.role = :airlineAdminRole) " +
            "ORDER BY " +
            "  CASE WHEN e.role = :superAdminRole THEN 1 " +
            "       WHEN e.role = :airlineAdminRole THEN 2 " +
            "       ELSE 3 END, " +
            "  e.createDate ASC")
    List<String> findAdminEmpIdsByAirlineId(
            @Param("airlineId") Long airlineId,
            @Param("empStatus") CommonEnums.EmpStatus empStatus,
            @Param("superAdminRole") CommonEnums.Role superAdminRole,
            @Param("airlineAdminRole") CommonEnums.Role airlineAdminRole
    );

    @Query(
            value = """
                select new com.kh.ct.domain.emp.dto.EmpDto$EmployeeManagementRow(
                    e.empId,
                    e.empNo,
                    e.empName,
                    d.departmentName,
                    e.role,
                    e.job,
                    e.phone,
                    e.email,
                    e.empStatus,
                    e.startDate,
                    p.fileId,
                    a.airlineName
                )
                from Emp e
                left join e.departmentId d
                left join e.airlineId a
                left join e.profileImage p
                where a.airlineId = :airlineId
                  and (:departmentId is null or d.departmentId = :departmentId)
                  and (:empStatus is null or e.empStatus = :empStatus)
                  and (
                        :q is null or :q = '' or
                        e.empName like concat('%', :q, '%') or
                        e.empNo like concat('%', :q, '%') or
                        e.empId like concat('%', :q, '%') or
                        e.email like concat('%', :q, '%') or
                        e.phone like concat('%', :q, '%') or
                        d.departmentName like concat('%', :q, '%')
                  )
                order by e.empName asc
            """,
            countQuery = """
                select count(e)
                from Emp e
                left join e.departmentId d
                left join e.airlineId a
                where a.airlineId = :airlineId
                  and (:departmentId is null or d.departmentId = :departmentId)
                  and (:empStatus is null or e.empStatus = :empStatus)
                  and (
                        :q is null or :q = '' or
                        e.empName like concat('%', :q, '%') or
                        e.empNo like concat('%', :q, '%') or
                        e.empId like concat('%', :q, '%') or
                        e.email like concat('%', :q, '%') or
                        e.phone like concat('%', :q, '%') or
                        d.departmentName like concat('%', :q, '%')
                  )
            """
    )
    Page<EmpDto.EmployeeManagementRow> findEmployeeManagementRowsByAirline(
            @Param("airlineId") Long airlineId,
            @Param("q") String q,
            @Param("departmentId") Long departmentId,
            @Param("empStatus") CommonEnums.EmpStatus empStatus,
            Pageable pageable
    );

    boolean existsByDepartmentId_DepartmentIdAndEmpStatus(Long departmentId, CommonEnums.EmpStatus empStatus);

    // ✅ ✅ 추가: 부서/팀 구성원 목록 조회 (members API의 핵심)
    List<Emp> findByDepartmentId_DepartmentId(Long departmentId);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("""
        update Emp e
           set e.departmentId = null
         where e.departmentId.departmentId in :deptIds
    """)
    int bulkDetachDepartment(@Param("deptIds") List<Long> deptIds);

    interface DeptEmpCountView {
        Long getDepartmentId();
        Long getCnt();
    }

    @Query("""
        select e.departmentId.departmentId as departmentId,
               count(e) as cnt
        from Emp e
        where e.empStatus = :empStatus
          and e.departmentId.departmentId in :deptIds
        group by e.departmentId.departmentId
    """)
    List<DeptEmpCountView> countEmployeesByDepartmentIds(
            @Param("deptIds") List<Long> deptIds,
            @Param("empStatus") CommonEnums.EmpStatus empStatus
    );

    long countByDepartmentId_DepartmentIdAndEmpStatus(Long departmentId, CommonEnums.EmpStatus empStatus);
}