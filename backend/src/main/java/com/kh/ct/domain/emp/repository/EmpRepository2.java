package com.kh.ct.domain.emp.repository;

import com.kh.ct.domain.emp.entity.Emp;
import com.kh.ct.global.common.CommonEnums;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmpRepository2 extends JpaRepository<Emp, String> {

    List<Emp> findByEmpStatus(CommonEnums.EmpStatus status);

    List<Emp> findByEmpNameContainingAndEmpStatus(String keyword, CommonEnums.EmpStatus status);

    Optional<Emp> findByEmpIdAndEmpStatus(String empId, CommonEnums.EmpStatus status);
}

