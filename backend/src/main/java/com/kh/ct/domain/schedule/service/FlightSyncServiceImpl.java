package com.kh.ct.domain.schedule.service;

import com.kh.ct.domain.schedule.dto.FlightApiResponseDto;
import com.kh.ct.domain.schedule.dto.FlyScheduleDto;
import com.kh.ct.domain.schedule.entity.AllSchedule;
import com.kh.ct.domain.schedule.entity.FlySchedule;
import com.kh.ct.domain.schedule.repository.AllScheduleRepository;
import com.kh.ct.domain.schedule.repository.FlyScheduleRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;

import java.net.URI;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FlightSyncServiceImpl implements FlightSyncService {

    private final AllScheduleRepository allScheduleRepository;
    private final FlyScheduleRepository flyScheduleRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${api.flight.service-key:}")
    private String serviceKey;

    @Value("${api.flight.base-url:}")
    private String baseUrl;
    
    // 공공데이터 포털에서 발급받은 예상 Encoding 키 (검증용)
    // application.yaml의 DATA_API.SERVICE_KEY와 동일한 값이어야 함
    @Value("${DATA_API.SERVICE_KEY:}")
    private String expectedServiceKey;

    /**
     * RestTemplate 초기화 - DefaultUriBuilderFactory를 설정하여 인코딩 문제 방지
     */
    @PostConstruct
    public void initRestTemplate() {
        log.info("=== RestTemplate 초기화 및 설정값 검증 ===");
        
        // 1. Base URL 검증 (끝에 불필요한 / 제거)
        if (baseUrl != null) {
            String originalBaseUrl = baseUrl;
            baseUrl = baseUrl.trim();
            
            // 끝에 /나 ?가 있으면 제거하고 경고
            if (baseUrl.endsWith("/") || baseUrl.endsWith("?")) {
                log.warn("⚠️ Base URL 끝에 불필요한 문자가 있습니다. 제거합니다.");
                log.warn("   원본: [{}]", originalBaseUrl);
                while (baseUrl.endsWith("/") || baseUrl.endsWith("?")) {
                    baseUrl = baseUrl.substring(0, baseUrl.length() - 1);
                }
                log.warn("   수정: [{}]", baseUrl);
            } else {
                log.info("✅ Base URL 형식 정상: [{}]", baseUrl);
            }
        } else {
            log.error("❌ Base URL이 null입니다!");
        }
        
        // 2. Service Key 검증 (공공데이터 포털 Encoding 키와 완벽 일치 확인)
        if (serviceKey != null && expectedServiceKey != null) {
            String originalServiceKey = serviceKey;
            serviceKey = serviceKey.trim();
            expectedServiceKey = expectedServiceKey.trim();
            
            log.info("Service Key 길이: {}", serviceKey.length());
            log.info("Expected Service Key 길이: {}", expectedServiceKey.length());
            
            // 서비스키 인코딩 상태 확인 (%2B가 +로 디코딩되었는지 체크)
            boolean hasPercent2B = serviceKey.contains("%2B");
            boolean hasPlus = serviceKey.contains("+");
            log.info("Service Key 인코딩 상태 - %2B 포함: {}, + 포함: {}", hasPercent2B, hasPlus);
            
            // %2B가 +로 디코딩되었다면 다시 인코딩
            if (hasPlus && !hasPercent2B) {
                log.warn("⚠️ 서비스키가 디코딩된 상태입니다. 다시 인코딩합니다.");
                serviceKey = serviceKey.replace("+", "%2B").replace("/", "%2F").replace("=", "%3D");
                log.info("재인코딩된 Service Key 길이: {}", serviceKey.length());
            } else if (hasPercent2B) {
                log.info("✅ 서비스키가 이미 인코딩된 상태입니다.");
            }
            
            // 3. 예상 키와 완벽 일치 여부 확인 (글자 하나하나 대조)
            boolean isExactMatch = serviceKey.equals(expectedServiceKey);
            
            if (isExactMatch) {
                log.info("✅ Service Key 검증 성공: 공공데이터 포털 Encoding 키와 완벽히 일치합니다.");
                log.info("   키 길이: {} 문자", serviceKey.length());
                
                // 키의 앞 10자와 뒤 10자만 로그에 출력 (보안을 위해)
                if (serviceKey.length() >= 20) {
                    String prefix = serviceKey.substring(0, 10);
                    String suffix = serviceKey.substring(serviceKey.length() - 10);
                    log.info("   키 앞 10자: [{}...], 뒤 10자: [...{}]", prefix, suffix);
                }
            } else {
                log.error("❌ Service Key 검증 실패: 공공데이터 포털 Encoding 키와 일치하지 않습니다!");
                log.error("   실제 키 길이: {}", serviceKey.length());
                log.error("   예상 키 길이: {}", expectedServiceKey.length());
                
                // 차이점 찾기
                int minLength = Math.min(serviceKey.length(), expectedServiceKey.length());
                int firstDiffIndex = -1;
                for (int i = 0; i < minLength; i++) {
                    if (serviceKey.charAt(i) != expectedServiceKey.charAt(i)) {
                        firstDiffIndex = i;
                        break;
                    }
                }
                
                if (firstDiffIndex >= 0) {
                    log.error("   첫 번째 차이점 위치: {}번째 문자", firstDiffIndex);
                    log.error("   실제 키의 문자: [{}] (코드: {})", 
                            serviceKey.charAt(firstDiffIndex), 
                            (int) serviceKey.charAt(firstDiffIndex));
                    log.error("   예상 키의 문자: [{}] (코드: {})", 
                            expectedServiceKey.charAt(firstDiffIndex), 
                            (int) expectedServiceKey.charAt(firstDiffIndex));
                    
                    // 차이점 주변 20자 출력
                    int start = Math.max(0, firstDiffIndex - 10);
                    int end = Math.min(serviceKey.length(), firstDiffIndex + 10);
                    log.error("   실제 키 주변: [{}]", serviceKey.substring(start, end));
                    log.error("   예상 키 주변: [{}]", expectedServiceKey.substring(start, Math.min(expectedServiceKey.length(), end)));
                } else if (serviceKey.length() != expectedServiceKey.length()) {
                    log.error("   키 길이가 다릅니다. 실제: {}, 예상: {}", 
                            serviceKey.length(), expectedServiceKey.length());
                }
                
                // 키의 앞 10자와 뒤 10자 출력 (수동 확인용)
                if (serviceKey.length() >= 20) {
                    String actualPrefix = serviceKey.substring(0, 10);
                    String actualSuffix = serviceKey.substring(serviceKey.length() - 10);
                    log.error("   실제 키 앞 10자: [{}...], 뒤 10자: [...{}]", actualPrefix, actualSuffix);
                }
                if (expectedServiceKey.length() >= 20) {
                    String expectedPrefix = expectedServiceKey.substring(0, 10);
                    String expectedSuffix = expectedServiceKey.substring(expectedServiceKey.length() - 10);
                    log.error("   예상 키 앞 10자: [{}...], 뒤 10자: [...{}]", expectedPrefix, expectedSuffix);
                }
            }
        } else {
            log.error("❌ Service Key 또는 Expected Service Key가 null입니다!");
            log.error("   Service Key: {}", serviceKey != null ? "존재 (길이: " + serviceKey.length() + ")" : "null");
            log.error("   Expected Service Key: {}", expectedServiceKey != null ? "존재 (길이: " + expectedServiceKey.length() + ")" : "null");
        }
        
        // 4. DefaultUriBuilderFactory 설정 (인코딩 완전 비활성화)
        DefaultUriBuilderFactory uriBuilderFactory = new DefaultUriBuilderFactory();
        uriBuilderFactory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.NONE); // 가장 보수적인 설정
        restTemplate.setUriTemplateHandler(uriBuilderFactory);
        
        log.info("RestTemplate 초기화 완료 - EncodingMode: NONE");
    }

    @Override
    @Transactional
    public void syncApiData() {
        log.info("=== 외부 API 데이터 동기화 시작 ===");
        
        // 설정값 검증
        if (baseUrl == null || baseUrl.trim().isEmpty()) {
            log.error("API Base URL이 설정되지 않았습니다. api.flight.base-url을 확인하세요.");
            throw new IllegalStateException("API Base URL이 설정되지 않았습니다.");
        }
        
        if (serviceKey == null || serviceKey.trim().isEmpty()) {
            log.error("API Service Key가 설정되지 않았습니다. api.flight.service-key를 확인하세요.");
            throw new IllegalStateException("API Service Key가 설정되지 않았습니다.");
        }
        
        try {
            // 외부 API 호출
            List<FlyScheduleDto.ExternalFlightData> apiDataList = fetchFlightDataFromApi();
            
            if (apiDataList == null || apiDataList.isEmpty()) {
                log.warn("API에서 조회된 데이터가 없습니다.");
                return;
            }
            
            log.info("API에서 {}건의 데이터를 조회했습니다.", apiDataList.size());
            
            int successCount = 0;
            int errorCount = 0;
            
            // 각 데이터를 DB에 저장
            for (FlyScheduleDto.ExternalFlightData data : apiDataList) {
                try {
                    // 출발 항공편만 처리 (출도착 구분이 "D"인 경우)
//                    if (!"D".equals(data.getType())) {
//                        log.debug("도착 항공편은 건너뜀 - 편명: {}, 타입: {}", data.getFlightNumber(), data.getType());
//                        continue;
//                    }
                    
                    processExternalData(data);
                    successCount++;
                    log.info("데이터 처리 성공 - 편명: {}, 출발: {} -> {}", 
                            data.getFlightNumber(), data.getDeparture(), data.getDestination());
                } catch (Exception e) {
                    errorCount++;
                    log.error("데이터 처리 실패 - 편명: {}, 오류: {}", 
                            data.getFlightNumber(), e.getMessage(), e);
                }
            }
            
            log.info("=== 외부 API 데이터 동기화 완료 ===");
            log.info("성공: {}건, 실패: {}건", successCount, errorCount);
            
        } catch (Exception e) {
            log.error("외부 API 호출 중 오류 발생", e);
            throw new RuntimeException("외부 API 데이터 동기화 실패: " + e.getMessage(), e);
        }
    }

    /**
     * 외부 API에서 항공편 데이터를 조회
     * 브라우저 주소창과 100% 동일한 URL을 생성하여 호출
     */
    private List<FlyScheduleDto.ExternalFlightData> fetchFlightDataFromApi() {
        try {
            log.info("=== 외부 API 호출 시작 ===");
            
            // 1. Base URL 정제 (끝에 /나 ?가 있으면 제거)
            String cleanedBaseUrl = baseUrl.trim();
            while (cleanedBaseUrl.endsWith("/") || cleanedBaseUrl.endsWith("?")) {
                cleanedBaseUrl = cleanedBaseUrl.substring(0, cleanedBaseUrl.length() - 1);
            }




            log.info("정제된 Base URL: [{}]", cleanedBaseUrl);
            
            // 2. Raw String으로 URL 직접 조립 (UriComponentsBuilder 사용 안 함)
            // 브라우저 주소창과 완전히 동일한 형태로 생성
            String urlString = cleanedBaseUrl + "?page=1&perPage=10&serviceKey=" + serviceKey;

            
            // 4. URI.create() 사용 - 추가 인코딩 없이 문자열을 URI로 변환
            URI uri = URI.create(urlString);
            log.info("URI 객체 생성 완료: [{}]", uri.toString().replace(serviceKey, "***[SERVICE_KEY]***"));
            
            // 5. HTTP 헤더 설정 (브라우저 요청으로 인식시키기)
            HttpHeaders headers = new HttpHeaders();
            headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
            headers.set("Accept", "application/json, text/plain, */*");
            headers.set("Accept-Language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7");
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            log.debug("HTTP 헤더 설정 완료 - User-Agent: {}", headers.getFirst("User-Agent"));
            
            // 6. API 호출 (exchange 메서드 사용, 헤더 포함)
            ResponseEntity<FlightApiResponseDto> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    entity,
                    FlightApiResponseDto.class
            );
            
            log.info("API 응답 상태 코드: {}", response.getStatusCode());
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                FlightApiResponseDto responseBody = response.getBody();
                log.info("API 호출 성공 - 전체 건수: {}, 현재 페이지 건수: {}", 
                        responseBody.getTotalCount(), 
                        responseBody.getCurrentCount() != null ? responseBody.getCurrentCount() : 0);
                
                // API 응답을 ExternalFlightData로 변환
                if (responseBody.getData() != null && !responseBody.getData().isEmpty()) {
                    return responseBody.getData().stream()
                            .map(this::convertToExternalFlightData)
                            .filter(data -> data != null) // null 필터링
                            .collect(Collectors.toList());
                } else {
                    log.warn("API 응답에 data 필드가 없거나 비어있습니다.");
                    return new ArrayList<>();
                }
            } else {
                // API 응답 본문 로깅 (에러 원인 파악용)
                String responseBody = response.getBody() != null ? response.getBody().toString() : "응답 본문 없음";
                log.error("API 호출 실패 - HTTP Status: {}, Response Body: {}", response.getStatusCode(), responseBody);
                
                if (response.getBody() == null) {
                    log.error("API 응답 본문이 null입니다. 인증키 문제일 수 있습니다.");
                }
                
                return new ArrayList<>();
            }
            
        } catch (org.springframework.web.client.HttpClientErrorException e) {
            // HTTP 4xx 에러 상세 로깅
            log.error("API 호출 중 HTTP 클라이언트 에러 발생 - Status: {}, Response Body: {}", 
                    e.getStatusCode(), e.getResponseBodyAsString());
            log.error("호출한 URL (마스킹): [{}]", 
                    (baseUrl + "?page=1&perPage=10&serviceKey=" + serviceKey).replace(serviceKey, "***[SERVICE_KEY]***"));
            throw new RuntimeException("외부 API 호출 실패: " + e.getMessage() + " - " + e.getResponseBodyAsString(), e);
        } catch (org.springframework.web.client.RestClientException e) {
            log.error("API 호출 중 RestClientException 발생", e);
            throw new RuntimeException("외부 API 호출 실패: " + e.getMessage(), e);
        } catch (Exception e) {
            log.error("API 호출 중 예외 발생", e);
            throw new RuntimeException("외부 API 호출 중 오류 발생: " + e.getMessage(), e);
        }
    }

    /**
     * API 응답 데이터를 ExternalFlightData로 변환
     */
    private FlyScheduleDto.ExternalFlightData convertToExternalFlightData(FlightApiResponseDto.FlightData apiData) {
        try {
            if (apiData == null) {
                log.warn("API 데이터가 null입니다.");
                return null;
            }
            
            // 필수 필드 검증
            if (apiData.getFlightNumber() == null || apiData.getFlightNumber().trim().isEmpty()) {
                log.warn("편명이 없어 데이터를 건너뜁니다. - 공항: {}, 날짜: {}", 
                        apiData.getAirport(), apiData.getDate());
                return null;
            }
            
            if (apiData.getDate() == null || apiData.getDate().trim().isEmpty()) {
                log.warn("날짜가 없어 데이터를 건너뜁니다. - 편명: {}", apiData.getFlightNumber());
                return null;
            }
            
            if (apiData.getPlannedTime() == null || apiData.getPlannedTime().trim().isEmpty()) {
                log.warn("계획시간이 없어 데이터를 건너뜁니다. - 편명: {}", apiData.getFlightNumber());
                return null;
            }
            
            // ExternalFlightData로 변환
            FlyScheduleDto.ExternalFlightData externalData = FlyScheduleDto.ExternalFlightData.builder()
                    .flightNumber(apiData.getFlightNumber()) // 편명
                    .date(apiData.getDate()) // 날짜
                    .time(apiData.getPlannedTime()) // 계획시간 -> time
                    .departure(apiData.getAirport()) // 공항 -> departure
                    .destination(apiData.getRelativeAirport()) // 상대공항 -> destination
                    .type(apiData.getArrivalDeparture()) // 출도착(A도착D출발) -> type
                    .build();
            
            log.debug("데이터 변환 완료 - 편명: {}, 날짜: {}, 시간: {}, 출발: {}, 도착: {}", 
                    externalData.getFlightNumber(),
                    externalData.getDate(),
                    externalData.getTime(),
                    externalData.getDeparture(),
                    externalData.getDestination());
            
            return externalData;
            
        } catch (Exception e) {
            log.error("데이터 변환 실패 - 편명: {}, 오류: {}", 
                    apiData != null ? apiData.getFlightNumber() : "null", e.getMessage(), e);
            return null;
        }
    }

    @Override
    @Transactional
    public void processExternalData(FlyScheduleDto.ExternalFlightData data) {
        log.info("외부 데이터 처리 시작 - 편명: {}, 날짜: {}, 시간: {}",
                data.getFlightNumber(), data.getDate(), data.getTime());

        // 1. API 데이터 파싱 (포맷: yyyy-MM-dd HH:mm)
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime originalTime = LocalDateTime.parse(data.getDate() + " " + data.getTime(), formatter);

        // 2. 2026년 2월 1일 ~ 2월 28일 사이 무작위 날짜 생성
        // nextInt(1, 29)는 1부터 28까지의 랜덤 정수 생성 (29는 exclusive)
        LocalDateTime now = LocalDateTime.now();

        // 원본 시간의 시/분은 유지하고, 날짜만 2026년 2월의 랜덤 날짜로 변경
        LocalDateTime fixedTime = originalTime
                .withYear(now.getYear())
                .withMonth(now.getMonthValue())
                .withDayOfMonth(now.getDayOfMonth());

        log.info("날짜 변환 완료 - 원본: {}, 변환 후: {}", originalTime, fixedTime);


        // 3. 부모 테이블(AllSchedule) 저장
        AllSchedule allSchedule = AllSchedule.builder()
                .scheduleCode("FLIGHT")
                .startDate(fixedTime)
                .endDate(fixedTime.plusHours(2))
                .build();

        AllSchedule savedAllSchedule = allScheduleRepository.save(allSchedule);
        log.info("AllSchedule 저장 완료: ID={}, scheduleCode={}, startDate={}, endDate={}",
                savedAllSchedule.getScheduleId(),
                savedAllSchedule.getScheduleCode(),
                savedAllSchedule.getStartDate(),
                savedAllSchedule.getEndDate());

        // 4. 자식 테이블(FlySchedule) 저장
        // FlySchedule의 flyScheduleId는 AllSchedule의 scheduleId와 동일해야 함
        Long airlineId = extractAirlineId(data.getFlightNumber());

        FlySchedule flySchedule = FlySchedule.builder()
                .flyScheduleId(savedAllSchedule.getScheduleId()) // AllSchedule의 ID와 동일하게 설정
//                .schedule(savedAllSchedule) // AllSchedule 엔티티 참조
                .flightNumber(data.getFlightNumber())
                .departure(data.getDeparture())
                .destination(data.getDestination())
                .flyStartTime(fixedTime) // 변경된 오늘 날짜 적용!
                .flyEndTime(fixedTime.plusHours(2)) // 도착 시간
                .airlineId(airlineId)
                .flightStatus(com.kh.ct.global.common.CommonEnums.flightStatus.ASSIGNING) // 기본 상태 (스케줄 등록됨)
                .build();

        FlySchedule savedFlySchedule = flyScheduleRepository.save(flySchedule);
        log.info("FlySchedule 저장 완료: 편명={}, flyScheduleId={}, airlineId={}, departure={}, destination={}",
                savedFlySchedule.getFlightNumber(),
                savedFlySchedule.getFlyScheduleId(),
                savedFlySchedule.getAirlineId(),
                savedFlySchedule.getDeparture(),
                savedFlySchedule.getDestination());

        // 데이터 정합성 검증
        if (!savedFlySchedule.getFlyScheduleId().equals(savedAllSchedule.getScheduleId())) {
            log.error("데이터 정합성 오류: FlySchedule.flyScheduleId({}) != AllSchedule.scheduleId({})",
                    savedFlySchedule.getFlyScheduleId(), savedAllSchedule.getScheduleId());
            throw new IllegalStateException("FlySchedule과 AllSchedule의 ID가 일치하지 않습니다.");
        }

        log.info("데이터 정합성 검증 완료: flyScheduleId={} == scheduleId={}",
                savedFlySchedule.getFlyScheduleId(), savedAllSchedule.getScheduleId());
    }
    /**
     * 편명(예: KE713)에서 앞 2글자를 추출하여 항공사 ID를 매핑하는 로직
     */
    private Long extractAirlineId(String flightNumber) {
        if (flightNumber == null || flightNumber.length() < 2) {
            return 0L; // 편명이 없거나 너무 짧으면 기본값 0
        }

        // 앞 두 글자 추출 (예: "KE")
        String iataCode = flightNumber.substring(0, 2).toUpperCase();

        // 현재 DB의 AIRLINE 테이블에 등록된 ID 숫자로 매핑하세요.
        return switch (iataCode) {
            case "KE" -> 1L; // 대한항공
            case "OZ" -> 2L; // 아시아나
            case "ZE" -> 3L; // 이스타항공
            case "JL" -> 4L; // 일본항공
            case "CZ" -> 5L; // 중국남방항공
            case "NH" -> 6L; //  에이엔에이항공
            default -> 1L;   // 알 수 없는 항공사
        };
    }

}