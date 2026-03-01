package com.kh.ct.domain.emp.repository;

import com.kh.ct.domain.emp.entity.Department;
import com.kh.ct.global.common.CommonEnums;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Optional<Department> findByDepartmentNameAndDepartmentStatus(
            String departmentName,
            CommonEnums.CommonStatus departmentStatus
    );

    /**
     * ✅ 최상위 부서 목록(검색+페이징)
     * - manager는 EntityGraph로 같이 로딩(N+1 방지)
     * - children은 size() 접근 시 N+1 가능(필요하면 최적화 버전 제공 가능)
     */
    @EntityGraph(attributePaths = {"manager"})
    @Query("""
        select d
        from Department d
        where d.parentDepartment is null
          and d.departmentStatus = :status
          and (:q is null or :q = '' or lower(d.departmentName) like lower(concat('%', :q, '%')))
        """)
    Page<Department> findTopDepartments(
            @Param("status") CommonEnums.CommonStatus status,
            @Param("q") String q,
            Pageable pageable
    );

    /**
     * ✅ 하위 조직(팀) 목록
     * - 팀의 leader를 child.manager에서 꺼내기 위해 manager도 같이 로딩
     */
    @EntityGraph(attributePaths = {"manager"})
    @Query("""
        select d
        from Department d
        where d.parentDepartment.departmentId = :parentId
          and d.departmentStatus = :status
        order by d.departmentId asc
        """)
    List<Department> findChildren(
            @Param("parentId") Long parentId,
            @Param("status") CommonEnums.CommonStatus status
    );

    /**
     * ✅ 상세 조회에서 manager까지 함께 로딩
     */
    @EntityGraph(attributePaths = {"manager"})
    @Query("""
        select d
        from Department d
        where d.departmentId = :deptId
        """)
    Optional<Department> findByIdWithManager(@Param("deptId") Long deptId);
}