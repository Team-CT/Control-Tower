package com.kh.ct.domain.auth.service;

import com.kh.ct.domain.auth.dto.AuthDto;
import com.kh.ct.domain.emp.entity.Emp;
import com.kh.ct.domain.emp.repository.empRepository;
import com.kh.ct.global.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final empRepository empRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional(readOnly = true)
    public AuthDto.LoginResponse login(AuthDto.LoginRequest request) {

        // 1) 회원 조회 (empId 기준 조회가 안전)
        Emp emp = empRepository.findById(request.getEmpId())
                .orElseThrow(() -> new IllegalArgumentException("아이디가 일치하지 않습니다."));

        // 2) 비밀번호 검증
        if (!passwordEncoder.matches(request.getEmpPwd(), emp.getEmpPwd())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 3) 토큰 발급
        String empId = emp.getEmpId();
        String role = emp.getRole().name();
        String token = jwtTokenProvider.generateToken(empId, role);

        // 4) 분리형: 토큰만 반환
        return AuthDto.LoginResponse.builder()
                .token(token)
                .build();
    }
}
