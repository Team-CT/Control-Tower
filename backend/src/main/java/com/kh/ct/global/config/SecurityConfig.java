package com.kh.ct.global.config;

import com.kh.ct.global.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
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

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // ✅ API 서버 기본 권장: CSRF 비활성화
                .csrf(AbstractHttpConfigurer::disable)

                // ✅ CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // ✅ 세션 미사용 (JWT)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // ✅ 기본 인증/폼 로그인 비활성화 (API 서버에서 흔히 같이 끔)
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
                        .requestMatchers("/account-activation", "/account-activation/**").permitAll()

                        // =========================
                        // 2) 인증 없이 허용 (Auth / 가입 / 공개 기능)
                        // =========================
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/refresh").permitAll()

                        // ⚠️ (주의) valkey 관련 API를 외부에 공개하는 것은 보안 위험 가능
                        // - 개발/테스트용이면 dev 프로필에서만 열거나
                        // - 최소 ADMIN 이상 권한으로 제한 권장
                        .requestMatchers(HttpMethod.POST, "/api/valkey/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/valkey/**").permitAll()

                        // 회원가입/사전 단계
                        .requestMatchers(HttpMethod.POST, "/api/auth/ocr-business-card").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/signup").permitAll()

                        // 비밀번호/계정 관련
                        .requestMatchers(HttpMethod.POST, "/api/auth/password/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/passwordCode/**").permitAll()
                        .requestMatchers("/api/account-activation/**").permitAll()

                        // emp 공개 API (가입 전/조회성)
                        .requestMatchers(HttpMethod.POST, "/api/emps").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/emps/findId").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/emps/checkId").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/emps/empNo/preview").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/emps/*/airline").permitAll()
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

                        // flight schedules 조회는 공개
                        .requestMatchers(HttpMethod.GET, "/api/flight-schedules").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/flight-schedules/sync").permitAll()

                        // WebSocket / 설정 / SSE
                        .requestMatchers("/ws/**").permitAll()
                        .requestMatchers("/api/settings/**").permitAll()
                        .requestMatchers("/api/notifications/stream").permitAll()

                        // (주의) “관리자” 성격인데 공개로 열려있음 → 의도 맞을 때만 유지
                        .requestMatchers("/api/dashboard/admin/**").permitAll()
                        .requestMatchers("/api/admin/attendance/**").permitAll()
                        .requestMatchers("/api/health/admin/**").permitAll()

                        // =========================
                        // 3) 파일: 다운로드만 공개, 나머지는 인증
                        //    (중요) 더 구체적인 다운로드 패턴을 먼저 둬야 함
                        // =========================
                        .requestMatchers("/api/file/download/**").permitAll()
                        .requestMatchers("/api/file/**").authenticated()

                        // =========================
                        // 4) 인증 필요(민감/개인/업무)
                        // =========================
                        .requestMatchers("/api/emps/me/**").authenticated()
                        .requestMatchers("/api/attendance/**").authenticated()
                        .requestMatchers("/api/notifications/**").authenticated()
                        .requestMatchers("/api/support/**").authenticated()
                        .requestMatchers("/api/emp/**").authenticated()

                        // =========================
                        // 5) Role 기반
                        // =========================
                        .requestMatchers("/api/super-admin/**").hasRole("SUPER_ADMIN")

                        // 항공편 "쓰기"는 관리자 권한
                        .requestMatchers(HttpMethod.POST, "/api/flight-schedules/**").hasAnyRole("AIRLINE_ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/flight-schedules/**").hasAnyRole("AIRLINE_ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/flight-schedules/**").hasAnyRole("AIRLINE_ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/flight-schedules/**").hasAnyRole("AIRLINE_ADMIN", "SUPER_ADMIN")

                        // (기존 유지) 관리자 멤버 관리
                        .requestMatchers(HttpMethod.GET, "/api/members").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/members/search").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/members/**").hasRole("ADMIN")

                        // =========================
                        // 6) 그 외 전부 인증
                        // =========================
                        .anyRequest().authenticated()
                )

                // ✅ JWT 필터
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.setAllowedOrigins(Arrays.asList(
                "http://localhost:5173",
                "http://localhost:5174",
                "https://khair-controlltower.site",
                "http://khair-controlltower.site"
        ));

        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}