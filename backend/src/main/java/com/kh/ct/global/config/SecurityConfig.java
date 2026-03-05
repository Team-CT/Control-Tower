package com.kh.ct.global.config;

import com.kh.ct.global.security.JwtAuthenticationFilter;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * ✅ 배포에서 이 로그가 안 뜨면:
     * - 이 SecurityConfig가 로딩/적용되지 않은 상태(스캔/배포/JAR 반영/빈 생성 실패 등)
     */
    @PostConstruct
    public void loaded() {
        log.info("✅ SecurityConfig LOADED");
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // ✅ API 서버 기본 권장: CSRF 비활성화
                .csrf(AbstractHttpConfigurer::disable)

                // ✅ CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // ✅ 세션 미사용 (JWT)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // ✅ 기본 인증/폼 로그인/로그아웃 비활성화
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .logout(AbstractHttpConfigurer::disable)

                // ✅ 권한 규칙
                .authorizeHttpRequests(auth -> auth

                        // =========================
                        // 0) CORS 프리플라이트(OPTIONS) 전부 허용 (매우 중요)
                        // =========================
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // =========================
                        // 1) 정적/루트 (같은 서버에서 SPA 서빙 시)
                        // =========================
                        .requestMatchers("/", "/index.html", "/favicon.ico", "/static/**", "/assets/**").permitAll()
                        // 활성화 링크로 접속 시 프론트 라우트(/account-activation) 허용 (같은 호스트에서 SPA 제공 시)
                        .requestMatchers("/account-activation", "/account-activation/**").permitAll()

                        // =========================
                        // 2) 인증 없이 허용 (Auth / 가입 / 공개 기능)
                        // =========================
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/refresh").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/ocr-business-card").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/signup").permitAll()

                        .requestMatchers(HttpMethod.POST, "/api/auth/password/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/passwordCode/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/passwordCode/**").permitAll()
                        .requestMatchers("/api/account-activation/**").permitAll()

                        // emp 공개 API (가입 전/조회성)
                        .requestMatchers(HttpMethod.POST, "/api/emps").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/emps/findId").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/emps/checkId").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/emps/empNo/preview").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/emps/*/airline").permitAll()

                        // 테마용: 인증 없어도 airline 반환 (의도적으로 공개)
                        .requestMatchers(HttpMethod.GET, "/api/emps/me/airline").permitAll()

                        // 공통/기초 데이터 (조회성)
                        .requestMatchers("/api/common/codes/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/airlines").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/airports").permitAll()

                        // 기타 공개 API
                        .requestMatchers("/api/chat").permitAll()
                        .requestMatchers("/api/questions/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/airline-applications").permitAll()

                        // health
                        .requestMatchers(HttpMethod.POST, "/api/health/preview").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/health/save").permitAll()

                        .requestMatchers(HttpMethod.POST, "/api/airline-applications").permitAll()
                        .requestMatchers("/api/questions/**").permitAll()
                        .requestMatchers("/api/dashboard/**").permitAll()
                        .requestMatchers("/api/dashboard/admin/**").hasRole("AIRLINE_ADMIN")
                        .requestMatchers("/api/board/**").permitAll()
                        .requestMatchers("/api/common/codes/**").permitAll()
                        .requestMatchers("/api/airlines").permitAll()
                        .requestMatchers("/api/airports").permitAll()


                        // flight schedules 조회/싱크 공개
                        // 파일 및 항공편
                        .requestMatchers("/api/file/**").permitAll()
                        .requestMatchers("/api/file/download/**").permitAll()

                        // 항공편 API
                        .requestMatchers(HttpMethod.GET, "/api/flight-schedules/sync").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/flight-schedules").permitAll()

                        // WebSocket / 설정 / SSE
                        .requestMatchers("/ws/**").permitAll()
                        .requestMatchers("/api/settings/**").permitAll()
                        .requestMatchers("/api/notifications/stream").permitAll()

                        // =========================
                        // (주의) 운영에서 공개 금지 권장: Valkey 관련
                        // =========================
                        .requestMatchers("/api/valkey/**").hasRole("SUPER_ADMIN")

                        // =========================
                        // 3) 파일: 다운로드만 공개, 나머지는 인증
                        //    (중요) 더 구체적인 다운로드 패턴을 먼저 둬야 함
                        // =========================
                        .requestMatchers("/api/file/download/**").permitAll()
                        .requestMatchers("/api/file/**").authenticated()

                        // =========================
                        // 4) 인증 필요(민감/개인/업무)
                        // =========================
                        // 내 정보 (와일드카드보다 우선순위 높게)
                        .requestMatchers("/api/emps/me/**").authenticated()

                        // ✅ 직원 출/퇴근: 인증 필요
                        .requestMatchers("/api/attendance/**").authenticated()

                        // 알림: SSE는 permitAll, 나머지는 인증 필요
                        .requestMatchers("/api/notifications/stream").permitAll()
                        .requestMatchers("/api/notifications/**").authenticated()

                        // 이메일 문의
                        .requestMatchers("/api/support/**").authenticated()
                        .requestMatchers("/api/emp/**").authenticated()

                        // =========================
                        // 5) Role 기반
                        // =========================
                        .requestMatchers("/api/super-admin/**").hasRole("SUPER_ADMIN")

                        // 항공편 "쓰기"는 관리자 권한
                        .requestMatchers(HttpMethod.POST, "/api/flight-schedules/**")
                        .hasAnyRole("AIRLINE_ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/flight-schedules/**")
                        .hasAnyRole("AIRLINE_ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/flight-schedules/**")
                        .hasAnyRole("AIRLINE_ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/flight-schedules/**")
                        .hasAnyRole("AIRLINE_ADMIN", "SUPER_ADMIN")


                        // 기타 인증 필요 경로
                        .requestMatchers("/api/emp/**").authenticated()



                        // (기존 유지) 관리자 멤버 관리
                        .requestMatchers(HttpMethod.GET, "/api/members").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/members/search").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/members/**").hasRole("ADMIN")
                        .requestMatchers("/api/dashboard/admin/**").permitAll()
                        .requestMatchers("/api/admin/attendance/**").permitAll()
                        .requestMatchers("/api/health/admin/**").permitAll()
                        // =========================
                        // 6) 그 외 전부 인증
                        // =========================
                        .anyRequest().authenticated()
                )

                // ✅ JWT 필터
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * ✅ CORS 설정
     * - 운영 프론트: https://yoojh.store, https://www.yoojh.store (혹은 실제 운영 도메인)
     * - 개발 프론트: http://localhost:5173, http://localhost:5174
     *
     * ⚠️ allowCredentials(true)이므로 allowedOrigins에 "*" 사용 불가
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        //CorsConfiguration corsConfiguration = new CorsConfiguration();
        // ✅ 운영 서버 도메인 추가

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList(
                "http://localhost:5173",
                "http://localhost:5174",
                "https://ct1.shop",
                "http://ct1.shop"
                //  "https://api.wkdwlsdn.shop",
                // "http://api.wkdwlsdn.shop"
        ));

        // ✅ “프론트” 오리진만 넣어야 함 (api 도메인 넣는 게 아님)

        // ✅ preflight 포함
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));

        // ✅ 운영에서 너무 빡빡하면 프론트에서 헤더 추가될 때 CORS 에러가 나므로
        //    일단 "*"로 열고, 안정화 후 필요한 헤더만 화이트리스트로 좁히는 전략도 가능
        config.addAllowedHeader("*");

        // ✅ 브라우저에서 접근 가능하게 노출할 헤더(다운로드/인증에 유용)
        config.setExposedHeaders(List.of(
                "Authorization",
                "Set-Cookie",
                "Content-Disposition"
        ));

        // ✅ 쿠키/인증정보 허용
        config.setAllowCredentials(true);

        // ✅ preflight 캐시
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}