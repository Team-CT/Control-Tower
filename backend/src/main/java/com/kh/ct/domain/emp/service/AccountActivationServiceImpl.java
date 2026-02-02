package com.kh.ct.domain.emp.service;

import com.kh.ct.domain.emp.dto.AccountActivationDto;
import com.kh.ct.domain.emp.entity.ActivationToken;
import com.kh.ct.domain.emp.entity.Airline;
import com.kh.ct.domain.emp.entity.Emp;
import com.kh.ct.domain.emp.repository.ActivationTokenRepository;
import com.kh.ct.domain.emp.repository.EmpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AccountActivationServiceImpl implements AccountActivationService {

    private final ActivationTokenRepository activationTokenRepository;
    private final EmpRepository empRepository;
    private final PasswordEncoder passwordEncoder;

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
}

