package com.kh.ct.domain.health.repository;

import com.kh.ct.domain.health.entity.EmpPhysicalTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthRepository extends JpaRepository<EmpPhysicalTest,Long> {

    Page<EmpPhysicalTest> findByEmpId_EmpId(String empId, Pageable pageable);
}
