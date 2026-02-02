package com.kh.ct.domain.emp.service;

import com.kh.ct.domain.emp.dto.AccountActivationDto;
import com.kh.ct.domain.emp.entity.ActivationToken;
import com.kh.ct.domain.emp.entity.Airline;
import com.kh.ct.domain.emp.entity.AirlineApply;
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

        // 3. 비밀번호 업데이트
        Emp emp = activationToken.getEmpId();
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        emp.updatePassword(encodedPassword);
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
}

