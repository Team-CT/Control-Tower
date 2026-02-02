package com.kh.ct.domain.emp.service;

import com.kh.ct.domain.emp.dto.AccountActivationDto;
import com.kh.ct.domain.emp.entity.ActivationToken;
import com.kh.ct.domain.emp.entity.Airline;
import com.kh.ct.domain.emp.entity.AirlineApply;
import com.kh.ct.domain.emp.entity.AirlineStatus;
import com.kh.ct.domain.emp.entity.Emp;
import com.kh.ct.domain.emp.repository.ActivationTokenRepository;
import com.kh.ct.domain.emp.repository.AirlineApplyRepository;
import com.kh.ct.domain.emp.repository.AirlineRepository;
import com.kh.ct.domain.emp.repository.EmpRepository;
import com.kh.ct.global.common.CommonEnums;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AccountActivationServiceImpl implements AccountActivationService {

    private final ActivationTokenRepository activationTokenRepository;
    private final EmpRepository empRepository;
    private final PasswordEncoder passwordEncoder;
    private final AirlineApplyRepository airlineApplyRepository;
    private final AirlineRepository airlineRepository;

    @Override
    public AccountActivationDto.ActivationInfoResponse getActivationInfo(String token) {
        ActivationToken activationToken = activationTokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 토큰입니다."));

        if (!activationToken.isValid()) {
            throw new IllegalArgumentException("만료되었거나 이미 사용된 토큰입니다.");
        }

        Emp emp = activationToken.getEmpId();
        Airline airline = emp.getAirlineId();

        return AccountActivationDto.ActivationInfoResponse.builder()
                .email(emp.getEmail())
                .airlineName(airline != null ? airline.getAirlineName() : "정보 없음")
                .country(airline != null ? airline.getCountry() : "정보 없음")
                .activationDate(activationToken.getCreateDate())
                .isValid(true)
                .build();
    }

    @Override
    @Transactional
    public AccountActivationDto.ActivationResponse activateAccount(
            String token,
            AccountActivationDto.ActivationRequest request
    ) {
        // 1. 비밀번호 확인 일치 검증
        if (!request.getPassword().equals(request.getPasswordConfirm())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 2. 토큰 검증
        ActivationToken activationToken = activationTokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 토큰입니다."));

        if (!activationToken.isValid()) {
            throw new IllegalArgumentException("만료되었거나 이미 사용된 토큰입니다.");
        }

        // 3. 비밀번호 업데이트 및 계정 상태 활성화
        Emp emp = activationToken.getEmpId();
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        emp.updatePassword(encodedPassword);
        // 계정 상태를 Y(활성)로 변경
        emp.updateEmpStatus(CommonEnums.EmpStatus.Y);
        empRepository.save(emp);

        // 4. 토큰 사용 처리
        activationToken.markAsUsed();
        activationTokenRepository.save(activationToken);

        return AccountActivationDto.ActivationResponse.builder()
                .message("계정 활성화가 완료되었습니다.")
                .success(true)
                .build();
    }

    @Override
    @Transactional
    public AccountActivationDto.RegenerateLinkResponse regenerateActivationLink(Long airlineApplyId) {
        // 1. 신청 정보 조회
        AirlineApply application = airlineApplyRepository.findById(airlineApplyId)
                .orElseThrow(() -> new IllegalArgumentException("해당 신청을 찾을 수 없습니다. ID: " + airlineApplyId));

        // 2. 승인된 신청인지 확인
        if (application.getAirlineApplyStatus() != CommonEnums.ApplyStatus.APPROVED) {
            throw new IllegalArgumentException("승인된 신청에 대해서만 링크를 재발급할 수 있습니다.");
        }

        // 3. Airline 조회
        Airline airline = airlineRepository.findByAirlineApplyId(application.getAirlineApplyId())
                .orElseThrow(() -> new IllegalArgumentException("항공사 정보를 찾을 수 없습니다."));

        // 4. 관리자 계정 조회
        Emp adminAccount = empRepository.findByAirlineIdAndRole(airline, CommonEnums.Role.AIRLINE_ADMIN)
                .orElseThrow(() -> new IllegalArgumentException("관리자 계정을 찾을 수 없습니다."));

        // 5. 기존 토큰 무효화 (사용되지 않은 토큰만)
        List<ActivationToken> existingTokens = activationTokenRepository
                .findByEmpIdAndUsedFalseOrderByCreateDateDesc(adminAccount);
        for (ActivationToken token : existingTokens) {
            if (token.getExpiresAt().isAfter(LocalDateTime.now())) {
                token.markAsUsed();
                activationTokenRepository.save(token);
            }
        }

        // 6. 새 토큰 생성
        String newToken = ActivationToken.generateToken();
        ActivationToken activationToken = ActivationToken.builder()
                .empId(adminAccount)
                .token(newToken)
                .expiresAt(LocalDateTime.now().plusDays(7)) // 7일 유효
                .used(false)
                .build();
        activationTokenRepository.save(activationToken);

        // 7. 새 활성화 링크 생성
        String activationLink = "http://localhost:5173/account-activation?token=" + newToken;

        return AccountActivationDto.RegenerateLinkResponse.builder()
                .activationLink(activationLink)
                .message("활성화 링크가 재발급되었습니다.")
                .build();
    }

    @Override
    @Transactional
    public AccountActivationDto.InitialSetupResponse completeInitialSetup(
            String token,
            AccountActivationDto.InitialSetupRequest request,
            String logoFilePath
    ) {
        // 1. 토큰으로 Emp 찾기 (사용된 토큰도 조회 가능하도록)
        ActivationToken activationToken = activationTokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 토큰입니다."));

        Emp emp = activationToken.getEmpId();

        // 2. Emp의 email로 AirlineApply 찾기
        AirlineApply application = airlineApplyRepository.findByAirlineApplyEmail(emp.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("해당 신청 정보를 찾을 수 없습니다."));

        // 3. 이미 Airline이 생성되었는지 확인
        if (airlineRepository.existsByAirlineApplyId(application.getAirlineApplyId())) {
            throw new IllegalArgumentException("이미 초기 설정이 완료되었습니다.");
        }

        // 4. AirlineApply 정보 + InitialSetup 정보로 Airline 생성
        Airline airline = Airline.builder()
                .airlineName(application.getAirlineName())
                .theme("gray") // 기본 테마
                .mainNumber("") // 기본값
                .airlineAddress("") // 기본값
                .airlineDesc("") // 기본값
                .email(application.getAirlineApplyEmail())
                .phone(application.getManagerPhone())
                .plan("Professional") // 기본 플랜
                .status(AirlineStatus.ACTIVE)
                .icon("✈️") // 기본 아이콘
                .country("대한민국") // 국내 서비스
                .joinDate(LocalDate.now())
                .storageUsage(0.0)
                .lastLoginDate(LocalDateTime.now())
                .airlineApplyId(application)
                .build();
        airline = airlineRepository.save(airline);

        // 5. Emp의 airlineId 업데이트
        emp.updateAirlineId(airline);
        empRepository.save(emp);

        return AccountActivationDto.InitialSetupResponse.builder()
                .message("초기 설정이 완료되었습니다.")
                .success(true)
                .airlineId(airline.getAirlineId())
                .build();
    }
}

