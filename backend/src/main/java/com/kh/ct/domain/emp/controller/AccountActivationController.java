package com.kh.ct.domain.emp.controller;

import com.kh.ct.domain.emp.dto.AccountActivationDto;
import com.kh.ct.domain.emp.service.AccountActivationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account-activation")
@RequiredArgsConstructor
public class AccountActivationController {

    private final AccountActivationService accountActivationService;

    @GetMapping("/{token}")
    public ResponseEntity<AccountActivationDto.ActivationInfoResponse> getActivationInfo(
            @PathVariable String token
    ) {
        AccountActivationDto.ActivationInfoResponse response = accountActivationService.getActivationInfo(token);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{token}")
    public ResponseEntity<AccountActivationDto.ActivationResponse> activateAccount(
            @PathVariable String token,
            @Valid @RequestBody AccountActivationDto.ActivationRequest request
    ) {
        AccountActivationDto.ActivationResponse response = accountActivationService.activateAccount(token, request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/regenerate/{airlineApplyId}")
    public ResponseEntity<AccountActivationDto.RegenerateLinkResponse> regenerateLink(
            @PathVariable Long airlineApplyId
    ) {
        AccountActivationDto.RegenerateLinkResponse response = accountActivationService.regenerateActivationLink(airlineApplyId);
        return ResponseEntity.ok(response);
    }
}

