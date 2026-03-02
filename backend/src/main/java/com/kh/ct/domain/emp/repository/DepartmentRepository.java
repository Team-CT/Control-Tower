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

    @EntityGraph(attributePaths = {"manager"})
    @Query("""
        select d
        from Department d
        where d.departmentId = :deptId
        """)
    Optional<Department> findByIdWithManager(@Param("deptId") Long deptId);

    boolean existsByParentDepartment_DepartmentId(Long parentId);

    @Query("""
        select d
        from Department d
        where d.parentDepartment.departmentId = :parentId
        order by d.departmentId asc
    """)
    List<Department> findChildrenAll(@Param("parentId") Long parentId);

    // ✅ empCount 리셋 제거: 상태만 비활성화
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("""
        update Department d
           set d.departmentStatus = :status
         where d.departmentId in :ids
    """)
    int bulkDeactivate(
            @Param("ids") List<Long> ids,
            @Param("status") CommonEnums.CommonStatus status
    );

    /* =========================================================
     * ✅ 자식(팀) 수를 parentIds 단위로 한번에 집계 (N+1 방지)
     * ========================================================= */
    interface ChildCountView {
        Long getParentId();
        Long getCnt();
    }

    @Query("""
        select d.parentDepartment.departmentId as parentId,
               count(d) as cnt
        from Department d
        where d.departmentStatus = :status
          and d.parentDepartment.departmentId in :parentIds
        group by d.parentDepartment.departmentId
    """)
    List<ChildCountView> countChildrenByParentIds(
            @Param("parentIds") List<Long> parentIds,
            @Param("status") CommonEnums.CommonStatus status
    );
}