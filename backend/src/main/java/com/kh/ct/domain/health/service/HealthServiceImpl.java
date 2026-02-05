package com.kh.ct.domain.health.service;

import com.kh.ct.domain.emp.entity.Emp;
import com.kh.ct.domain.emp.repository.EmpRepository;
import com.kh.ct.domain.health.dto.HealthDto;
import com.kh.ct.domain.health.entity.EmpHealth;
import com.kh.ct.domain.health.entity.EmpPhysicalTest;
import com.kh.ct.domain.health.entity.ProgramApply;
import com.kh.ct.domain.health.repository.EmpHealthRepository;
import com.kh.ct.domain.health.repository.HealthRepository;
import com.kh.ct.domain.health.repository.ProgramApplyRepository;
import com.kh.ct.domain.health.service.parser.HealthLabelParser;
import com.kh.ct.domain.health.service.parser.PdfTextExtractor;
import com.kh.ct.global.entity.File;
import com.kh.ct.global.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class HealthServiceImpl implements HealthService {

    private final HealthRepository healthRepository;
    private final HealthLabelParser healthLabelParser;
    private final PdfTextExtractor pdfTextExtractor;
    private final EmpRepository empRepository;
    private final FileRepository fileRepository;
    private final EmpHealthRepository empHealthRepository;
    private final ProgramApplyRepository programApplyRepository; // DDD - Repository 주입
    private final com.kh.ct.domain.schedule.repository.AllScheduleRepository allScheduleRepository;
    private final com.kh.ct.domain.health.repository.ProgramRepository programRepository;

    private final Path baseDir = Paths.get("uploads", "pdf").toAbsolutePath().normalize();

    @Transactional(readOnly = true)
    @Override
    public HealthDto.PhysicalTestResponse preview(MultipartFile pdfFile) {

        if (pdfFile == null || pdfFile.isEmpty()) {
            throw new IllegalArgumentException("파일이 비어있습니다.");
        }

        String text = pdfTextExtractor.extract(pdfFile);
        System.out.println("TEST" + text);
        HealthDto.PhysicalTestRequest parsed = healthLabelParser.parse(text);
        System.out.println("TEST" + parsed);
        System.out.println("TEST" + parsed.getWeight());

        return HealthDto.PhysicalTestResponse.from(parsed);
    }

    @Transactional
    @Override
    public Long save(MultipartFile pdfFile, String empId, HealthDto.PhysicalTestRequest body) {
        if (pdfFile == null || pdfFile.isEmpty()) {
            throw new IllegalArgumentException("파일이 비어있습니다.");
        }

        Emp emp = empRepository.findById(empId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 empId: " + empId));
        System.out.println("TEST!!!!" + body);
        System.out.println("TEST!!!!" + body.getBmi());
        System.out.println("TEST!!!!" + body.getBloodSugar());
        // 1) 파일 디스크 저장 + File row 저장
        String originalName = Optional.ofNullable(pdfFile.getOriginalFilename()).orElse("unknown.pdf");
        long size = pdfFile.getSize();
        String ext = getExt(originalName);
        String storedName = UUID.randomUUID().toString().replace("-", "") + ext;

        Path dir = baseDir;
        Path target = dir.resolve(storedName);

        try {
            Files.createDirectories(dir);
            try (InputStream is = pdfFile.getInputStream()) {
                Files.copy(is, target);
            }
        } catch (IOException e) {
            throw new RuntimeException("파일 저장 실패", e);
        }

        File savedFile = fileRepository.save(
                File.builder()
                        .fileOriName(originalName)
                        .fileName(storedName)
                        .path(target.toString())
                        .size(size)
                        .build());

        HealthDto.PhysicalTestRequest req = HealthDto.PhysicalTestRequest.builder()
                .empId(emp)
                .fileId(savedFile)
                .testDate(body.getTestDate())
                .weight(body.getWeight())
                .height(body.getHeight())
                .bloodSugar(body.getBloodSugar())
                .systolicBloodPressure(body.getSystolicBloodPressure())
                .diastolicBloodPressure(body.getDiastolicBloodPressure())
                .cholesterol(body.getCholesterol())
                .heartRate(body.getHeartRate())
                .bmi(body.getBmi())
                .bodyFat(body.getBodyFat())
                .build();

        EmpPhysicalTest saved = healthRepository.save(req.toEntity());
        return saved.getPhysicalTestId();

    }

    @Override
    public HealthDto.PhysicalTestDetailResponse getEmpPhysicalTestById(String empId) {

        Emp emp = empRepository.findById(empId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 empId: " + empId));

        EmpPhysicalTest test = healthRepository
                .findTopByEmpId_EmpIdOrderByTestDateDesc(empId)
                .orElse(null);

        EmpHealth empHealth = empHealthRepository.findTopByEmpId_EmpIdOrderByEmpHealthIdDesc(empId)
                .orElse(null);

        if (test != null && (test.getEmpId() == null || !empId.equals(test.getEmpId().getEmpId()))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "해당 사원의 검진 데이터가 아닙니다.");
        }

        return HealthDto.PhysicalTestDetailResponse.builder()
                .empId(empId)
                .empName(emp.getEmpName())
                .startDate(emp.getStartDate())
                .departmentName(emp.getDepartmentId() == null ? null : emp.getDepartmentId().getDepartmentName())
                .job(emp.getJob())
                .email(emp.getEmail())
                .phone(emp.getPhone())
                .address(emp.getAddress())

                .testDate(test == null ? null : test.getTestDate())
                .height(test == null ? null : test.getHeight())
                .weight(test == null ? null : test.getWeight())
                .bloodSugar(test == null ? null : test.getBloodSugar())
                .systolicBloodPressure(test == null ? null : test.getSystolicBloodPressure())
                .diastolicBloodPressure(test == null ? null : test.getDiastolicBloodPressure())
                .cholesterol(test == null ? null : test.getCholesterol())
                .heartRate(test == null ? null : test.getHeartRate())
                .bmi(test == null ? null : test.getBmi())
                .bodyFat(test == null ? null : test.getBodyFat())
                .healthPoint(empHealth == null ? null : empHealth.getHealthPoint())
                .build();
    }

    @Override
    public Page<HealthDto.PhysicalTestResponse> getPhysicalTestByEmpId(String empId, Pageable pageable) {
        Page<EmpPhysicalTest> posts;

        posts = healthRepository.findByEmpId_EmpId(empId, pageable);
        return posts.map(HealthDto.PhysicalTestResponse::from);
    }

    @Override
    public Page<HealthDto.AdminEmpHealthRow> getAllPhysicalTest(String empName, Pageable pageable) {
        System.out.println("pageable = " + pageable);

        return empRepository.findAdminEmpHealthRows(empName.trim(), pageable);
    }

    /**
     * 건강 프로그램 신청 내역 조회
     * DDD 아키텍처 - Application Service 구현
     * 
     * @param empNo 사원번호
     * @return 프로그램 신청 내역 리스트 (최신순)
     */
    @Override
    @Transactional(readOnly = true)
    public List<HealthDto.ProgramHistoryResponse> getProgramHistory(String empNo) {
        // 1. Repository를 통해 엔티티 조회 (Infrastructure Layer)
        List<ProgramApply> programApplies = programApplyRepository.findByApplicantEmpNoWithDetails(empNo);

        // 2. Domain Entity를 Application DTO로 변환 (Application Layer)
        return programApplies.stream()
                .map(HealthDto.ProgramHistoryResponse::from)
                .collect(Collectors.toList());
    }

    /**
     * 건강 프로그램 신청
     * DDD 아키텍처 - Domain Service 구현
     * 
     * @param request 신청 요청 DTO
     * @param empId   신청자 사원 ID
     */
    @Override
    @Transactional
    public void applyProgram(HealthDto.ApplyRequest request, String empId) {
        try {
            System.out.println("[DEBUG] applyProgram started. EmpId: " + empId + ", Request: " + request);

            // [VALIDATION] 시작일 기준 최소 3일 전 예약 필수
            java.time.LocalDate startDate = request.getStartDate().toLocalDate();
            java.time.LocalDate minDate = java.time.LocalDate.now().plusDays(3);

            if (startDate.isBefore(minDate)) {
                throw new IllegalArgumentException("프로그램은 시작일 기준 최소 3일 전에만 신청 가능합니다.");
            }

            // 1. 신청자 조회
            Emp applicant = empRepository.findById(empId)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
            System.out.println("[DEBUG] Applicant found: " + applicant.getEmpName());

            // 2. 이미 신청한 내역이 있는지 확인 (PENDING 상태인 경우 중복 신청 방지 등)
            // 비즈니스 규칙: 동일 기간 중복 신청 불가? 혹은 그냥 허용? 일단 구현 생략 or Simple Validation
            // 여기서는 간단히 진행.

            // 3. ProgramApply 생성 (신청 내역)
            String applyId = UUID.randomUUID().toString();
            ProgramApply apply = ProgramApply.builder()
                    .programApplyId(applyId)
                    .programCode(request.getProgramCode()) // counseling, exercise, rest
                    .programApplyApplicant(applicant)
                    .programApplyDate(java.time.LocalDateTime.now())
                    .programApplyStatus(com.kh.ct.global.common.CommonEnums.ApplyStatus.PENDING)
                    .programApplyReason(request.getReason())
                    .build();
            System.out.println("[DEBUG] ProgramApply entity built.");

            // [FIX] 먼저 저장하여 Managed 상태로 전환 (Program 생성 시 사용하기 위함)
            apply = programApplyRepository.save(apply);
            System.out.println("[DEBUG] ProgramApply saved. ID: " + apply.getProgramApplyId());

            // 4. AllSchedule 생성 (일정)
            // request.getStartDate()가 null인지 확인
            if (request.getStartDate() == null || request.getEndDate() == null) {
                throw new IllegalArgumentException("Start date or End date cannot be null");
            }

            com.kh.ct.domain.schedule.entity.AllSchedule schedule = com.kh.ct.domain.schedule.entity.AllSchedule
                    .builder()
                    .scheduleCode("HEALTH_" + request.getProgramCode().toUpperCase())
                    .startDate(request.getStartDate())
                    .endDate(request.getEndDate())
                    .build();
            schedule = allScheduleRepository.save(schedule); // [FIX] Managed Instance 반환값 사용
            System.out.println("[DEBUG] AllSchedule saved. ID: " + schedule.getScheduleId());

            // 5. Program 생성 (세부 프로그램 정보)
            // Program은 ProgramApply와 OneToOne (MapsId)
            com.kh.ct.domain.health.entity.Program program = com.kh.ct.domain.health.entity.Program.builder()
                    .programApply(apply) // [FIX] Managed 'apply' 사용
                    .scheduleId(schedule)
                    .programContent(parseProgramContent(request.getProgramCode()))
                    .programStatus("APPLIED")
                    .build();
            System.out.println("[DEBUG] Program entity built.");

            // apply = programApplyRepository.save(apply); // [REMOVED] 위에서 이미 저장함

            programRepository.save(program); // Child 저장
            System.out.println("[DEBUG] Program saved. ApplyProgram Completed.");

        } catch (Exception e) {
            System.err.println("[ERROR] applyProgram failed: " + e.getMessage());
            e.printStackTrace();
            throw e; // Rethrow to ensure transaction rollback
        }
    }

    private String parseProgramContent(String code) {
        if ("counseling".equals(code))
            return "건강 심리 상담";
        if ("exercise".equals(code))
            return "체력 증진 운동";
        if ("rest".equals(code))
            return "휴식 및 힐링";
        return "건강 프로그램";
    }

    /**
     * 나의 신청 내역 조회
     */
    @Override
    @Transactional(readOnly = true)
    public List<HealthDto.ProgramHistoryResponse> getMyProgramHistory(String empId) {
        List<ProgramApply> list = programApplyRepository.findByApplicantIdWithDetails(empId);
        return list.stream()
                .map(HealthDto.ProgramHistoryResponse::from)
                .collect(Collectors.toList());
    }

    private String getExt(String filename) {
        int idx = filename.lastIndexOf('.');
        if (idx < 0)
            return "";
        return filename.substring(idx);
    }

    @Override
    @Transactional
    public void cancelProgram(String programApplyId) {
        ProgramApply apply = programApplyRepository.findById(programApplyId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 신청 내역입니다."));

        // 상태 확인 (PENDING일 때만 취소 가능)
        if (apply.getProgramApplyStatus() != com.kh.ct.global.common.CommonEnums.ApplyStatus.PENDING) {
            throw new IllegalStateException("이미 처리되었거나 취소할 수 없는 상태입니다.");
        }

        // 관련 데이터 삭제 순서: Program -> AllSchedule -> ProgramApply
        // 1. Program 조회
        programRepository.findById(programApplyId).ifPresent(program -> {
            // 2. Schedule 삭제를 위해 조회 (Program이 Schedule을 참조함)
            com.kh.ct.domain.schedule.entity.AllSchedule schedule = program.getScheduleId();

            // Program 삭제
            programRepository.delete(program);

            // Schedule 삭제 (Program 삭제 후)
            if (schedule != null) {
                allScheduleRepository.delete(schedule);
            }
        });

        // 3. ProgramApply 삭제
        programApplyRepository.delete(apply);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HealthDto.ApplyDetailResponse> getAdminApplyList(com.kh.ct.global.common.CommonEnums.ApplyStatus status,
            String programName) {
        return programApplyRepository.findAllByFilters(status, programName).stream()
                .map(apply -> {
                    com.kh.ct.domain.health.entity.Program program = apply.getProgram();
                    com.kh.ct.domain.schedule.entity.AllSchedule schedule = (program != null) ? program.getScheduleId()
                            : null;
                    Emp applicant = apply.getProgramApplyApplicant();
                    String managerName = (apply.getProgramApplyManager() != null)
                            ? apply.getProgramApplyManager().getEmpName()
                            : null;

                    return HealthDto.ApplyDetailResponse.builder()
                            .programApplyId(apply.getProgramApplyId())
                            .empName(applicant.getEmpName())
                            .empNo(applicant.getEmpNo())
                            .departmentName(
                                    applicant.getDepartmentId() != null
                                            ? applicant.getDepartmentId().getDepartmentName()
                                            : "")
                            .programName(program != null ? program.getProgramContent() : "")
                            .applyReason(apply.getProgramApplyReason())
                            .applyDate(apply.getProgramApplyDate())
                            .status(apply.getProgramApplyStatus().name())
                            .startDate(schedule != null ? schedule.getStartDate() : null)
                            .endDate(schedule != null ? schedule.getEndDate() : null)
                            .managerName(managerName)
                            .rejectReason(apply.getProgramApplyCancelReason())
                            .build();
                })
                .collect(java.util.stream.Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public HealthDto.ApplyDetailResponse getApplyDetail(String programApplyId) {
        ProgramApply apply = programApplyRepository.findById(programApplyId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 신청 내역입니다."));

        com.kh.ct.domain.health.entity.Program program = apply.getProgram();
        com.kh.ct.domain.schedule.entity.AllSchedule schedule = (program != null) ? program.getScheduleId() : null;
        Emp applicant = apply.getProgramApplyApplicant();

        String managerName = (apply.getProgramApplyManager() != null) ? apply.getProgramApplyManager().getEmpName()
                : null;

        return HealthDto.ApplyDetailResponse.builder()
                .programApplyId(apply.getProgramApplyId())
                .empName(applicant.getEmpName())
                .empNo(applicant.getEmpNo())
                .departmentName(
                        applicant.getDepartmentId() != null ? applicant.getDepartmentId().getDepartmentName() : "") // Department
                // Entity
                // 가정
                .programName(program != null ? program.getProgramContent() : "")
                .applyReason(apply.getProgramApplyReason())
                .applyDate(apply.getProgramApplyDate())
                .status(apply.getProgramApplyStatus().name())
                .startDate(schedule != null ? schedule.getStartDate() : null)
                .endDate(schedule != null ? schedule.getEndDate() : null)
                .managerName(managerName)
                .rejectReason(apply.getProgramApplyCancelReason())
                .build();
    }

    @Override
    @Transactional
    public void approveApply(HealthDto.ApproveRequest request) {
        ProgramApply apply = programApplyRepository.findById(request.getProgramApplyId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 신청 내역입니다."));

        Emp manager = empRepository.findById(request.getManagerId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 담당자입니다."));

        // Entity에 비즈니스 메서드가 없으므로 Setter가 없다면 추가 필요.
        // 현재는 Setter가 없으므로 update 메서드를 Entity에 추가하는 것이 좋음.
        // 하지만 여기서는 간편하게 리플렉션이나 빌더 패턴을 다시 쓸 수 없음 (JPA Managed 상태 유지).
        // 따라서 ProgramApply Entity에 `approve` 메서드를 추가했다고 가정하고 호출하거나,
        // @Setter가 없으므로 여기서는 Compile Error가 날 것임.
        // [IMPORTANT] ProgramApply.java에 updateStatus 메서드를 추가해야 함.
        // 일단 이 코드 블록 전/후로 ProgramApply.java를 수정하겠음.

        apply.approve(manager);
    }

    @Override
    @Transactional
    public void rejectApply(HealthDto.RejectRequest request) {
        ProgramApply apply = programApplyRepository.findById(request.getProgramApplyId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 신청 내역입니다."));

        apply.reject(request.getReason());
    }
}
