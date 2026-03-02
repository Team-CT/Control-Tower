package com.kh.ct.domain.schedule.util;

import com.kh.ct.global.common.CommonEnums;
import com.kh.ct.global.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * 직군별 scheduleCode 검증 및 강제 유틸리티
 * 
 * 규칙:
 * - 운항직(PILOT, CABIN_CREW): FLIGHT, STANDBY, OFF
 * - 지상직(GROUND_STAFF, MAINTENANCE): SHIFT_D, SHIFT_E, SHIFT_N, OFF
 */
@Slf4j
public class ScheduleCodeValidator {
    
    // 운항직 허용 scheduleCode
    private static final Set<String> FLIGHT_CREW_CODES = new HashSet<>(Arrays.asList(
        "FLIGHT", "STANDBY", "OFF"
    ));
    
    // 지상직 허용 scheduleCode
    private static final Set<String> GROUND_STAFF_CODES = new HashSet<>(Arrays.asList(
        "SHIFT_D", "SHIFT_E", "SHIFT_N", "OFF"
    ));
    
    /**
     * 직군별 scheduleCode 검증 및 강제
     * 
     * @param role 직원 역할
     * @param scheduleCode 저장하려는 scheduleCode
     * @return 검증된 scheduleCode (유효하지 않으면 예외 발생)
     * @throws BusinessException scheduleCode가 직군에 맞지 않을 경우
     */
    public static String validateAndEnforce(CommonEnums.Role role, String scheduleCode) {
        if (scheduleCode == null || scheduleCode.trim().isEmpty()) {
            throw BusinessException.badRequest("scheduleCode는 필수입니다.");
        }
        
        String trimmedCode = scheduleCode.trim().toUpperCase();
        
        // 역할별 허용 코드 확인
        Set<String> allowedCodes = getAllowedCodes(role);
        
        if (!allowedCodes.contains(trimmedCode)) {
            String roleName = role != null ? role.name() : "null";
            String allowedCodesStr = String.join(", ", allowedCodes);
            log.error("❌ scheduleCode 검증 실패 - role: {}, scheduleCode: {}, 허용 코드: {}", 
                    roleName, trimmedCode, allowedCodesStr);
            throw BusinessException.badRequest(
                String.format("직군(%s)에 맞지 않는 scheduleCode입니다. 허용 코드: %s, 입력: %s", 
                    roleName, allowedCodesStr, trimmedCode));
        }
        
        log.debug("✅ scheduleCode 검증 성공 - role: {}, scheduleCode: {}", role, trimmedCode);
        return trimmedCode;
    }
    
    /**
     * 직군별 허용 scheduleCode 조회
     * 
     * @param role 직원 역할
     * @return 허용된 scheduleCode 집합
     */
    public static Set<String> getAllowedCodes(CommonEnums.Role role) {
        if (role == null) {
            // 역할이 null이면 모든 코드 허용 (기본값)
            Set<String> allCodes = new HashSet<>();
            allCodes.addAll(FLIGHT_CREW_CODES);
            allCodes.addAll(GROUND_STAFF_CODES);
            return allCodes;
        }
        
        switch (role) {
            case PILOT:
            case CABIN_CREW:
                return FLIGHT_CREW_CODES;
            case GROUND_STAFF:
            case MAINTENANCE:
                return GROUND_STAFF_CODES;
            case SUPER_ADMIN:
            case AIRLINE_ADMIN:
                // 관리자는 모든 코드 허용
                Set<String> allCodes = new HashSet<>();
                allCodes.addAll(FLIGHT_CREW_CODES);
                allCodes.addAll(GROUND_STAFF_CODES);
                return allCodes;
            default:
                // 알 수 없는 역할은 모든 코드 허용 (기본값)
                Set<String> defaultCodes = new HashSet<>();
                defaultCodes.addAll(FLIGHT_CREW_CODES);
                defaultCodes.addAll(GROUND_STAFF_CODES);
                return defaultCodes;
        }
    }
    
    /**
     * scheduleCode가 직군에 맞는지 확인 (예외 없이 boolean 반환)
     * 
     * @param role 직원 역할
     * @param scheduleCode 확인할 scheduleCode
     * @return 유효하면 true, 아니면 false
     */
    public static boolean isValid(CommonEnums.Role role, String scheduleCode) {
        if (scheduleCode == null || scheduleCode.trim().isEmpty()) {
            return false;
        }
        
        String trimmedCode = scheduleCode.trim().toUpperCase();
        Set<String> allowedCodes = getAllowedCodes(role);
        return allowedCodes.contains(trimmedCode);
    }
}
