package com.kh.ct.domain.emp.service;

import com.kh.ct.domain.emp.dto.AccountActivationDto;

public interface AccountActivationService {
    /**
     * 토큰으로 활성화 정보 조회
     */
    AccountActivationDto.ActivationInfoResponse getActivationInfo(String token);

    /**
     * 계정 활성화 완료 (비밀번호 설정)
     */
    AccountActivationDto.ActivationResponse activateAccount(String token, AccountActivationDto.ActivationRequest request);
}

