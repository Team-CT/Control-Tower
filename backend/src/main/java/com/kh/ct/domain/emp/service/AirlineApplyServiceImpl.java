package com.kh.ct.domain.emp.service;

import com.kh.ct.domain.emp.dto.AirlineApplyDto;
import com.kh.ct.domain.emp.entity.AirlineApply;
import com.kh.ct.domain.emp.repository.AirlineApplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AirlineApplyServiceImpl implements AirlineApplyService {

    private final AirlineApplyRepository airlineApplyRepository;

    @Override
    public List<AirlineApplyDto.ListResponse> getAllApplications() {
        List<AirlineApply> applications = airlineApplyRepository.findAllByOrderByCreateDateDesc();
        return applications.stream()
                .map(this::convertToListResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<AirlineApplyDto.ListResponse> searchApplications(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllApplications();
        }
        List<AirlineApply> applications = airlineApplyRepository.searchByKeyword(keyword);
        return applications.stream()
                .map(this::convertToListResponse)
                .collect(Collectors.toList());
    }

    @Override
    public AirlineApplyDto.DetailResponse getApplicationDetail(Long id) {
        AirlineApply application = airlineApplyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 신청을 찾을 수 없습니다. ID: " + id));
        return convertToDetailResponse(application);
    }

    @Override
    @Transactional
    public void approveApplication(Long id) {
        AirlineApply application = airlineApplyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 신청을 찾을 수 없습니다. ID: " + id));
        application.approve();
    }

    @Override
    @Transactional
    public void rejectApplication(Long id, String reason) {
        AirlineApply application = airlineApplyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 신청을 찾을 수 없습니다. ID: " + id));
        application.reject(reason);
    }

    // Entity -> DTO 변환 메서드
    private AirlineApplyDto.ListResponse convertToListResponse(AirlineApply entity) {
        return AirlineApplyDto.ListResponse.builder()
                .id(entity.getAirlineApplyId())
                .date(entity.getCreateDate())
                .airlineName(entity.getAirlineName())
                .email(entity.getAirlineApplyEmail())
                .verificationStatus(entity.getEmailDomainVerified())
                .documentStatus(entity.getAirlineApplyStatus().name())
                .status(entity.getAirlineApplyStatus().name().toLowerCase())
                .build();
    }

    private AirlineApplyDto.DetailResponse convertToDetailResponse(AirlineApply entity) {
        // 첨부 서류 목록 생성
        List<AirlineApplyDto.DocumentInfo> documents = new ArrayList<>();
        
        if (entity.getBusinessLicensePath() != null && !entity.getBusinessLicensePath().isEmpty()) {
            documents.add(AirlineApplyDto.DocumentInfo.builder()
                    .fileName("사업자등록증.pdf")
                    .filePath(entity.getBusinessLicensePath())
                    .build());
        }
        
        if (entity.getEmploymentCertPath() != null && !entity.getEmploymentCertPath().isEmpty()) {
            documents.add(AirlineApplyDto.DocumentInfo.builder()
                    .fileName("재직증명서.pdf")
                    .filePath(entity.getEmploymentCertPath())
                    .build());
        }

        return AirlineApplyDto.DetailResponse.builder()
                .id(entity.getAirlineApplyId())
                .date(entity.getCreateDate())
                .airlineName(entity.getAirlineName())
                .email(entity.getAirlineApplyEmail())
                .theme(entity.getTheme())
                .mainNumber(entity.getMainNumber())
                .airlineAddress(entity.getAirlineAddress())
                .airlineDesc(entity.getAirlineDesc())
                .emailDomainVerified(entity.getEmailDomainVerified())
                .status(entity.getAirlineApplyStatus().name())
                .cancelReason(entity.getAirlineApplyCancelReason())
                .documents(documents)
                .build();
    }
}

