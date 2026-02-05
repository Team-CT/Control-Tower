package com.kh.ct.domain.emp.service;

import com.kh.ct.domain.emp.dto.EmpDto;
import com.kh.ct.domain.emp.entity.Emp;

public interface EmpService {
    boolean isEmpIdAvailable(String empId);
    Emp register(EmpDto.RegisterRequest request);
    EmpDto getEmpDetail(String empId);
    
    /**
     * 관리자(담당자) 후보 리스트 조회
     */
    java.util.List<EmpDto> getManagerCandidates();
}
