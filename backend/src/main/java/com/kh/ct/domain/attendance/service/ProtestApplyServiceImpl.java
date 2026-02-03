package com.kh.ct.domain.attendance.service;

import com.kh.ct.domain.attendance.dto.ProtestDto;
import com.kh.ct.domain.attendance.entity.Attendance;
import com.kh.ct.domain.attendance.entity.ProtestApply;
import com.kh.ct.domain.attendance.entity.ProtestApplyFile;
import com.kh.ct.domain.attendance.repository.AttendanceRepository;
import com.kh.ct.domain.attendance.repository.ProtestApplyFileRepository;
import com.kh.ct.domain.attendance.repository.ProtestApplyRepository;
import com.kh.ct.domain.board.service.FileService;
import com.kh.ct.domain.emp.entity.Emp;
import com.kh.ct.domain.emp.repository.EmpRepository;
import com.kh.ct.global.common.CommonEnums;
import com.kh.ct.global.entity.File;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 근태 정정 신청 Service 구현체
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ProtestApplyServiceImpl implements ProtestApplyService {

    private final ProtestApplyRepository protestApplyRepository;
    private final ProtestApplyFileRepository protestApplyFileRepository;
    private final AttendanceRepository attendanceRepository;
    private final EmpRepository empRepository;
    private final FileService fileService;

    /**
     * 근태 정정 신청
     */
    @Override
    @Transactional
    public ProtestDto.ListResponse applyProtest(
            String empId,
            ProtestDto.ApplyRequest request,
            List<MultipartFile> files
    ) {
        log.info("근태 정정 신청 시작 - empId: {}, attendanceId: {}", empId, request.getAttendanceId());

        // 1. 직원 조회
        Emp applicant = empRepository.findById(empId)
                .orElseThrow(() -> new RuntimeException("직원을 찾을 수 없습니다"));

        // 2. 정정 대상 근태 조회
        Attendance targetAttendance = attendanceRepository.findById(request.getAttendanceId())
                .orElseThrow(() -> new RuntimeException("근태 기록을 찾을 수 없습니다"));

        // 3. 시간 파싱
        LocalTime requestInTime = null;
        LocalTime requestOutTime = null;
        
        if (request.getProtestRequestInTime() != null && !request.getProtestRequestInTime().isEmpty()) {
            requestInTime = LocalTime.parse(request.getProtestRequestInTime(), DateTimeFormatter.ofPattern("HH:mm"));
        }
        
        if (request.getProtestRequestOutTime() != null && !request.getProtestRequestOutTime().isEmpty()) {
            requestOutTime = LocalTime.parse(request.getProtestRequestOutTime(), DateTimeFormatter.ofPattern("HH:mm"));
        }

        // 4. 파일 업로드 처리
        List<File> uploadedFiles = new ArrayList<>();
        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                try {
                    File savedFile = fileService.saveFile(file);
                    if (savedFile != null) {
                        uploadedFiles.add(savedFile);
                    }
                } catch (Exception e) {
                    log.error("파일 업로드 실패", e);
                    throw new RuntimeException("파일 업로드에 실패했습니다: " + e.getMessage());
                }
            }
        }

        // 파일이 없으면 에러
        if (uploadedFiles.isEmpty()) {
            throw new RuntimeException("증빙 파일은 필수입니다");
        }

        // 5. ProtestApply 엔티티 생성 (원래 상태 저장)
        ProtestApply protestApply = ProtestApply.builder()
                .protestApplyDate(LocalDateTime.now())
                .protestApplyApplicant(applicant)
                .protestApplyStatus(CommonEnums.ApplyStatus.PENDING)
                .protestAttendanceStatus(CommonEnums.AttendanceStatus.PROTEST_PENDING)
                .protestRequestInTime(requestInTime)
                .protestRequestOutTime(requestOutTime)
                .protestReason(request.getProtestReason())
                .targetAttendance(targetAttendance)
                .originalAttendanceStatus(targetAttendance.getAttendanceStatus())  // 원래 상태 저장
                .build();

        protestApplyRepository.save(protestApply);

        // 6. ProtestApplyFile 생성 (파일 연결)
        for (File file : uploadedFiles) {
            ProtestApplyFile protestApplyFile = ProtestApplyFile.builder()
                    .protestApplyId(protestApply)
                    .fileId(file)
                    .build();
            protestApplyFileRepository.save(protestApplyFile);
        }

        // 7. Attendance 상태를 PROTEST_PENDING으로 변경
        Attendance updatedAttendance = Attendance.builder()
                .attendanceId(targetAttendance.getAttendanceId())
                .empId(targetAttendance.getEmpId())
                .attendanceDate(targetAttendance.getAttendanceDate())
                .inTime(targetAttendance.getInTime())
                .outTime(targetAttendance.getOutTime())
                .attendanceStatus(CommonEnums.AttendanceStatus.PROTEST_PENDING)
                .build();
        
        attendanceRepository.save(updatedAttendance);

        log.info("근태 정정 신청 완료 - protestApplyId: {}", protestApply.getProtestApplyId());

        return convertToListResponse(protestApply);
    }

    /**
     * 내 정정 신청 목록 조회
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProtestDto.ListResponse> getMyProtestList(String empId) {
        log.info("정정 신청 목록 조회 - empId: {}", empId);

        List<ProtestApply> protestList = protestApplyRepository
                .findByProtestApplyApplicant_EmpIdOrderByCreateDateDesc(empId);

        return protestList.stream()
                .map(this::convertToListResponse)
                .collect(Collectors.toList());
    }

    /**
     * 정정 신청 상세 조회
     */
    @Override
    @Transactional(readOnly = true)
    public ProtestDto.DetailResponse getProtestDetail(Long protestId) {
        log.info("정정 신청 상세 조회 - protestId: {}", protestId);

        ProtestApply protestApply = protestApplyRepository.findById(protestId)
                .orElseThrow(() -> new RuntimeException("정정 신청을 찾을 수 없습니다"));

        return convertToDetailResponse(protestApply);
    }

    /**
     * 정정 승인/반려
     */
    @Override
    @Transactional
    public ProtestDto.ListResponse approveProtest(
            Long protestId,
            String approverId,
            ProtestDto.ApproveRequest request
    ) {
        log.info("정정 승인/반려 - protestId: {}, approverId: {}, approved: {}", 
                protestId, approverId, request.getApproved());

        // 1. 정정 신청 조회
        ProtestApply protestApply = protestApplyRepository.findById(protestId)
                .orElseThrow(() -> new RuntimeException("정정 신청을 찾을 수 없습니다"));

        // 2. 승인자 조회
        Emp approver = empRepository.findById(approverId)
                .orElseThrow(() -> new RuntimeException("승인자를 찾을 수 없습니다"));

        // 3. 승인/반려 처리
        if (request.getApproved()) {
            // 승인: Attendance 실제 수정
            Attendance targetAttendance = protestApply.getTargetAttendance();
            
            Attendance updatedAttendance = Attendance.builder()
                    .attendanceId(targetAttendance.getAttendanceId())
                    .empId(targetAttendance.getEmpId())
                    .attendanceDate(targetAttendance.getAttendanceDate())
                    .inTime(protestApply.getProtestRequestInTime() != null ? 
                            protestApply.getProtestRequestInTime() : targetAttendance.getInTime())
                    .outTime(protestApply.getProtestRequestOutTime() != null ? 
                            protestApply.getProtestRequestOutTime() : targetAttendance.getOutTime())
                    .attendanceStatus(protestApply.getProtestAttendanceStatus())
                    .build();
            
            attendanceRepository.save(updatedAttendance);

            protestApply = ProtestApply.builder()
                    .protestApplyId(protestApply.getProtestApplyId())
                    .protestApplyDate(protestApply.getProtestApplyDate())
                    .protestApplyApplicant(protestApply.getProtestApplyApplicant())
                    .protestApplyApprover(approver)
                    .protestApplyStatus(CommonEnums.ApplyStatus.APPROVED)
                    .protestAttendanceStatus(protestApply.getProtestAttendanceStatus())
                    .protestRequestInTime(protestApply.getProtestRequestInTime())
                    .protestRequestOutTime(protestApply.getProtestRequestOutTime())
                    .protestReason(protestApply.getProtestReason())
                    .targetAttendance(protestApply.getTargetAttendance())
                    .originalAttendanceStatus(protestApply.getOriginalAttendanceStatus())
                    .build();

            log.info("정정 승인 완료 - protestId: {}", protestId);
        } else {
            // 반려: Attendance 상태 원복
            Attendance targetAttendance = protestApply.getTargetAttendance();
            
            // 원래 상태로 복원 (저장된 원래 상태 사용)
            Attendance updatedAttendance = Attendance.builder()
                    .attendanceId(targetAttendance.getAttendanceId())
                    .empId(targetAttendance.getEmpId())
                    .attendanceDate(targetAttendance.getAttendanceDate())
                    .inTime(targetAttendance.getInTime())
                    .outTime(targetAttendance.getOutTime())
                    .attendanceStatus(protestApply.getOriginalAttendanceStatus())  // 원래 상태로 복원
                    .build();
            
            attendanceRepository.save(updatedAttendance);

            protestApply = ProtestApply.builder()
                    .protestApplyId(protestApply.getProtestApplyId())
                    .protestApplyDate(protestApply.getProtestApplyDate())
                    .protestApplyApplicant(protestApply.getProtestApplyApplicant())
                    .protestApplyApprover(approver)
                    .protestApplyStatus(CommonEnums.ApplyStatus.REJECTED)
                    .protestApplyCancelReason(request.getCancelReason())
                    .protestAttendanceStatus(protestApply.getProtestAttendanceStatus())
                    .protestRequestInTime(protestApply.getProtestRequestInTime())
                    .protestRequestOutTime(protestApply.getProtestRequestOutTime())
                    .protestReason(protestApply.getProtestReason())
                    .targetAttendance(protestApply.getTargetAttendance())
                    .originalAttendanceStatus(protestApply.getOriginalAttendanceStatus())
                    .build();

            log.info("정정 반려 완료 - protestId: {}, reason: {}", protestId, request.getCancelReason());
        }

        protestApplyRepository.save(protestApply);

        return convertToListResponse(protestApply);
    }

    /**
     * Entity -> ListResponse 변환
     */
    private ProtestDto.ListResponse convertToListResponse(ProtestApply entity) {
        return ProtestDto.ListResponse.builder()
                .protestApplyId(entity.getProtestApplyId())
                .protestApplyDate(entity.getProtestApplyDate())
                .targetDate(entity.getTargetAttendance().getAttendanceDate())
                .currentInTime(entity.getTargetAttendance().getInTime())
                .currentOutTime(entity.getTargetAttendance().getOutTime())
                .protestRequestInTime(entity.getProtestRequestInTime())
                .protestRequestOutTime(entity.getProtestRequestOutTime())
                .protestReason(entity.getProtestReason())
                .status(entity.getProtestApplyStatus().name())
                .applicantName(entity.getProtestApplyApplicant().getEmpName())
                .approverName(entity.getProtestApplyApprover() != null ? 
                        entity.getProtestApplyApprover().getEmpName() : null)
                .createdDate(entity.getCreateDate())
                .fileCount(entity.getFiles() != null ? entity.getFiles().size() : 0)
                .build();
    }

    /**
     * Entity -> DetailResponse 변환
     */
    private ProtestDto.DetailResponse convertToDetailResponse(ProtestApply entity) {
        List<ProtestDto.FileInfo> fileInfos = entity.getFiles().stream()
                .map(protestFile -> ProtestDto.FileInfo.builder()
                        .fileId(protestFile.getFileId().getFileId())
                        .fileName(protestFile.getFileId().getFileName())
                        .fileOriName(protestFile.getFileId().getFileOriName())
                        .path(protestFile.getFileId().getPath())
                        .size(protestFile.getFileId().getSize())
                        .build())
                .collect(Collectors.toList());

        return ProtestDto.DetailResponse.builder()
                .protestApplyId(entity.getProtestApplyId())
                .protestApplyDate(entity.getProtestApplyDate())
                .targetDate(entity.getTargetAttendance().getAttendanceDate())
                .currentInTime(entity.getTargetAttendance().getInTime())
                .currentOutTime(entity.getTargetAttendance().getOutTime())
                .protestRequestInTime(entity.getProtestRequestInTime())
                .protestRequestOutTime(entity.getProtestRequestOutTime())
                .protestReason(entity.getProtestReason())
                .status(entity.getProtestApplyStatus().name())
                .applicantName(entity.getProtestApplyApplicant().getEmpName())
                .approverName(entity.getProtestApplyApprover() != null ? 
                        entity.getProtestApplyApprover().getEmpName() : null)
                .cancelReason(entity.getProtestApplyCancelReason())
                .createdDate(entity.getCreateDate())
                .files(fileInfos)
                .build();
    }
}
