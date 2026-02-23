package com.kh.ct.domain.auth.service;

import com.kh.ct.domain.auth.dto.AuthDto;
import org.springframework.web.multipart.MultipartFile;

public interface AuthService {

    /**
     * 로그인 처리 후 JWT 토큰 반환
     */
    AuthDto.LoginResponse login(AuthDto.LoginRequest request);

    /**
     * 현재 로그인된 사용자 정보 반환
     */
    AuthDto.MeResponse me(String empId);

    /**
     * 명함 이미지 OCR - DB 저장 없음, 폼 자동완성 전용
     */
    AuthDto.BusinessCardOcrResponse extractBusinessCard(MultipartFile file);

    /**
     * 최종 회원가입 - Emp 엔티티 DB 저장
     */
    void signUp(AuthDto.SignUpRequest request);
}
