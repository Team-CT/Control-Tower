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

import java.util.List;

@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

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

                .authorizeHttpRequests(auth -> auth

                        // =========================
                        // 0) CORS 프리플라이트(OPTIONS) 전부 허용 (매우 중요)
                        // =========================
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // =========================
                        // 1) 정적/루트 (같은 서버에서 SPA 서빙 시)
                        // =========================
                        .requestMatchers("/", "/index.html", "/favicon.ico", "/static/**", "/assets/**").permitAll()
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

                        // flight schedules 조회/싱크 공개
                        .requestMatchers(HttpMethod.GET, "/api/flight-schedules").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/flight-schedules/sync").permitAll()

                        // WebSocket / 설정 / SSE
                        .requestMatchers("/ws/**").permitAll()
                        .requestMatchers("/api/settings/**").permitAll()
                        .requestMatchers("/api/notifications/stream").permitAll()

                        // =========================
                        // 3) 파일: 다운로드만 공개, 나머지는 인증
                        //    (중요) 더 구체적인 다운로드 패턴을 먼저 둬야 함
                        // =========================
                        .requestMatchers("/api/file/download/**").permitAll()
                        .requestMatchers("/api/file/**").authenticated()

                        // =========================
                        // 4) 대시보드/보드 등 (머지 충돌 구간 정리)
                        //    ⚠️ "구체 경로"가 "와일드카드"보다 위로
                        // =========================
                        .requestMatchers("/api/dashboard/admin/**").hasRole("AIRLINE_ADMIN")
                        .requestMatchers("/api/dashboard/**").authenticated()

                        // 보드: 공개로 둘 거면 permitAll, 아니면 authenticated로 바꾸세요.
                        .requestMatchers("/api/board/**").permitAll()

                        // =========================
                        // 5) Valkey 관련 (운영 공개 금지 권장)
                        // =========================
                        .requestMatchers("/api/valkey/**").hasRole("SUPER_ADMIN")

                        // =========================
                        // 6) 인증 필요(민감/개인/업무)
                        // =========================
                        .requestMatchers("/api/emps/me/**").authenticated()
                        .requestMatchers("/api/attendance/**").authenticated()
                        .requestMatchers("/api/notifications/**").authenticated()
                        .requestMatchers("/api/support/**").authenticated()
                        .requestMatchers("/api/emp/**").authenticated()

                        // =========================
                        // 7) Role 기반
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

                        // (기존 유지) 관리자 멤버 관리
                        .requestMatchers(HttpMethod.GET, "/api/members").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/members/search").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/members/**").hasRole("ADMIN")

                        // =========================
                        // 8) 그 외 전부 인증
                        // =========================
                        .anyRequest().authenticated()
                )

                // ✅ JWT 필터
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * ✅ CORS 설정
     * - 운영 프론트: https://yoojh.store, https://www.yoojh.store (또는 실제 운영 도메인)
     * - 개발 프론트: http://localhost:5173, http://localhost:5174
     *
     * ⚠️ allowCredentials(true)이므로 allowedOrigins에 "*" 사용 불가
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // ✅ “프론트” 오리진만 넣어야 함 (api 도메인 넣는 게 아님)
        config.setAllowedOrigins(List.of(
                "https://yoojh.store",
                "https://www.yoojh.store",
                "https://khair-controlltower.site",
                "http://khair-controlltower.site",
                "http://localhost:5173",
                "http://localhost:5174"
                // 필요하면 여기에 프론트 도메인 추가
        ));

        // ✅ preflight 포함
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));

        // ✅ 헤더 허용
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