package com.kh.ct.domain.attendance.service;

import com.kh.ct.domain.attendance.dto.ProtestDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * 근태 정정 신청 Service 인터페이스
 */
public interface ProtestApplyService {

    /**
     * 근태 정정 신청
     */
    ProtestDto.ListResponse applyProtest(
            String empId,
            ProtestDto.ApplyRequest request,
            List<MultipartFile> files
    );

    /**
     * 내 정정 신청 목록 조회
     */
    List<ProtestDto.ListResponse> getMyProtestList(String empId);

    /**
     * 정정 신청 상세 조회
     */
    ProtestDto.DetailResponse getProtestDetail(Long protestId);

    /**
     * 정정 승인/반려
     */
    ProtestDto.ListResponse approveProtest(
            Long protestId,
            String approverId,
            ProtestDto.ApproveRequest request
    );
}
