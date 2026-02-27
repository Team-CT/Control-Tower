package com.kh.ct.global.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

  @Value("${app.frontend.base-url:https://khair-controlltower.site}")
  private String frontendBaseUrl;

  /** 리다이렉트 루프 방지: API 도메인으로 설정돼 있으면 사용하지 않고 실제 프론트 도메인 사용 */
  private static final String FALLBACK_FRONTEND_ORIGIN = "https://khair-controlltower.site";

    // ✅ 네가 던진 메시지를 그대로 내려주는 핵심
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException ex) {
        // 로그인 실패는 보통 401(인증 실패)로 주는 편이 자연스러움
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ErrorResponse.of(ex.getMessage()));
    }

    // @Valid DTO 검증 실패 (400)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(err -> {
            String fieldName = ((FieldError) err).getField();
            String errorMsg = err.getDefaultMessage();
            errors.put(fieldName, errorMsg);
        });
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.of("입력값 검증에 실패하였습니다.", errors));
    }

    // @Validated PathVariable/RequestParam 검증 실패 (400)
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolation(ConstraintViolationException ex) {
        Map<String, String> errors = ex.getConstraintViolations().stream()
                .collect(Collectors.toMap(
                        v -> v.getPropertyPath().toString(),
                        ConstraintViolation::getMessage,
                        (a, b) -> a
                ));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.of("입력값 검증에 실패하였습니다.", errors));
    }

    // BusinessException 처리 (비즈니스 로직 예외)
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException ex) {
        log.warn("BusinessException 발생 - status: {}, message: {}", ex.getStatus(), ex.getMessage());
        return ResponseEntity.status(ex.getStatus())
                .body(ErrorResponse.of(ex.getMessage()));
    }
    
    // 메일 전송 관련 예외 처리
    @ExceptionHandler(org.springframework.mail.MailException.class)
    public ResponseEntity<ErrorResponse> handleMailException(org.springframework.mail.MailException ex) {
        log.error("메일 전송 예외 발생", ex);
        String message = "이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.";
        
        // MailException의 원인 예외 확인
        Throwable cause = ex.getCause();
        if (cause instanceof jakarta.mail.AuthenticationFailedException) {
            message = "이메일 서버 인증에 실패했습니다. 관리자에게 문의해주세요.";
        } else if (cause instanceof jakarta.mail.MessagingException) {
            message = "이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.";
        }
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.of(message));
    }

    // AccessDeniedException 처리 (403)
    @ExceptionHandler(org.springframework.security.access.AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(org.springframework.security.access.AccessDeniedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ErrorResponse.of(ex.getMessage()));
    }

    // 정적 리소스 없음 (ResourceHandler가 먼저 처리해 예외 발생 시)
    // favicon.ico → 204, /account-activation → 프론트로 리다이렉트(쿼리 유지)
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<Void> handleNoResourceFound(NoResourceFoundException ex, HttpServletRequest request) {
        String path = ex.getResourcePath() != null ? ex.getResourcePath() : request.getRequestURI();
        String pathNorm = path != null && path.startsWith("/") ? path.substring(1) : (path != null ? path : "");
        if (pathNorm.equals("favicon.ico")) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        if (pathNorm.equals("account-activation") || pathNorm.startsWith("account-activation/")) {
            String qs = request.getQueryString();
            String base = resolveAccountActivationRedirectBase(request);
            String redirectUrl = base + "/account-activation" + (qs != null && !qs.isEmpty() ? "?" + qs : "");
            return ResponseEntity.status(HttpStatus.FOUND)
                    .header(HttpHeaders.LOCATION, redirectUrl)
                    .build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /** 리다이렉트 시 API 호스트로 가면 루프가 되므로, 그 경우 실제 프론트 도메인 사용 */
    private String resolveAccountActivationRedirectBase(HttpServletRequest request) {
        String requestHost = request.getServerName();
        if (requestHost == null) return frontendBaseUrl;
        String baseOrigin = toOriginHost(frontendBaseUrl);
        if (baseOrigin == null) return frontendBaseUrl;
        if (requestHost.equalsIgnoreCase(baseOrigin)) {
            log.debug("account-activation 리다이렉트: frontend base가 요청 호스트와 같아 루프 방지용 도메인 사용");
            return FALLBACK_FRONTEND_ORIGIN;
        }
        return frontendBaseUrl;
    }

    private static String toOriginHost(String url) {
        if (url == null || url.isEmpty()) return null;
        try {
            URI uri = URI.create(url.startsWith("http") ? url : "https://" + url);
            return uri.getHost();
        } catch (Exception e) {
            return null;
        }
    }

    // RuntimeException 처리 (500)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException ex) {
        ex.printStackTrace(); // 로그 출력
        String message = ex.getMessage() != null ? ex.getMessage() : "서버 오류가 발생했습니다.";
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.of(message));
    }

    // 나머지 (500)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        ex.printStackTrace(); // 로그 출력
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.of("서버 오류가 발생했습니다."));
    }


    @ExceptionHandler(EmpNoConflictException.class)
    public ResponseEntity<ErrorResponse> handleEmpNoConflict(EmpNoConflictException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("new_emp_no", ex.getNewEmpNo());

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(ErrorResponse.of(ex.getMessage(), errors));
    }

}
