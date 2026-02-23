package com.kh.ct.domain.auth.controller;

import com.kh.ct.domain.auth.dto.AuthDto;
import com.kh.ct.domain.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * 로그인
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthDto.LoginRequest request) {
        AuthDto.LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    /**
     * 내 정보 조회 (인증 필요)
     * GET /api/auth/me
     */
    @GetMapping("/me")
    public ResponseEntity<AuthDto.MeResponse> me(Authentication authentication) {
        String empId = authentication.getName();
        AuthDto.MeResponse response = authService.me(empId);
        return ResponseEntity.ok(response);
    }

    /**
     * 명함 이미지 OCR - DB 저장 없음, 폼 자동완성 전용
     * POST /api/auth/ocr-business-card
     *
     * @param file 명함 이미지 파일 (multipart/form-data)
     * @return 추출된 명함 정보 (empName, phone, email, job, company)
     */
    @PostMapping("/ocr-business-card")
    public ResponseEntity<AuthDto.BusinessCardOcrResponse> ocrBusinessCard(
            @RequestPart("file") MultipartFile file) {
        AuthDto.BusinessCardOcrResponse response = authService.extractBusinessCard(file);
        return ResponseEntity.ok(response);
    }

    /**
     * 최종 회원가입 - Emp 엔티티 DB 저장
     * POST /api/auth/signup
     *
     * @param request 사용자가 확인/수정한 회원가입 정보
     * @return 201 Created
     */
    @PostMapping("/signup")
    public ResponseEntity<Void> signUp(@Valid @RequestBody AuthDto.SignUpRequest request) {
        authService.signUp(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
