package com.kh.ct.domain.emp.service;

import com.kh.ct.domain.emp.dto.AirlineApplyDto;

import java.util.List;

public interface AirlineApplyService {

    /**
     * 전체 목록 조회
     */
    List<AirlineApplyDto.ListResponse> getAllApplications();

    /**
     * 검색
     */
    List<AirlineApplyDto.ListResponse> searchApplications(String keyword);

    /**
     * 상세 조회
     */
    AirlineApplyDto.DetailResponse getApplicationDetail(Long id);

    /**
     * 승인
     */
    void approveApplication(Long id);

    /**
     * 반려
     */
    void rejectApplication(Long id, String reason);
}

