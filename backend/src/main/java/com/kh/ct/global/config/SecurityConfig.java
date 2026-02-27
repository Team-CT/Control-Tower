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
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // =========================
                        // 1) 인증 없이 허용(permitAll) - 루트 및 정적 리소스 추가
                        // =========================
                        .requestMatchers("/", "/index.html", "/favicon.ico", "/static/**", "/assets/**").permitAll()
                        // 활성화 링크로 접속 시 프론트 라우트(/account-activation) 허용 (같은 호스트에서 SPA 제공 시)
                        .requestMatchers("/account-activation", "/account-activation/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/refresh").permitAll()

                        // 회원가입/사전 단계
                        .requestMatchers(HttpMethod.POST, "/api/auth/ocr-business-card").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/signup").permitAll()

                        // 비밀번호/계정 관련
                        .requestMatchers(HttpMethod.POST, "/api/auth/password/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/passwordCode/**").permitAll()
                        .requestMatchers("/api/account-activation/**").permitAll()

                        // emp 관련
                        .requestMatchers(HttpMethod.POST, "/api/emps").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/emps/findId").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/emps/checkId").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/emps/empNo/preview").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/emps/*/airline").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/emps/me/airline").permitAll()

                        // 기타 공개 API
                        .requestMatchers("/api/chat").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/health/preview").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/health/save").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/airline-applications").permitAll()
                        .requestMatchers("/api/questions/**").permitAll()
                        .requestMatchers("/api/common/codes/**").permitAll()
                        .requestMatchers("/api/airlines").permitAll()
                        .requestMatchers("/api/airports").permitAll()

                        // 파일 및 항공편
                        .requestMatchers("/api/file/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/flight-schedules/sync").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/flight-schedules").permitAll()

                        // WebSocket 및 설정
                        .requestMatchers("/ws/**").permitAll()
                        .requestMatchers("/api/settings/**").permitAll()
                        .requestMatchers("/api/notifications/stream").permitAll()

                        // 관리자 대시보드 일부 공개 (필요에 따라 수정)
                        .requestMatchers("/api/dashboard/admin/**").permitAll()
                        .requestMatchers("/api/admin/attendance/**").permitAll()
                        .requestMatchers("/api/health/admin/**").permitAll()

                        // =========================
                        // 2) 인증 필요(authenticated)
                        // =========================
                        .requestMatchers("/api/emps/me/**").authenticated()
                        .requestMatchers("/api/attendance/**").authenticated()
                        .requestMatchers("/api/notifications/**").authenticated()
                        .requestMatchers("/api/support/**").authenticated()
                        .requestMatchers("/api/emp/**").authenticated()

                        // =========================
                        // 3) 권한(Role) 기반
                        // =========================
                        .requestMatchers("/api/super-admin/**").hasRole("SUPER_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/flight-schedules/**").hasAnyRole("AIRLINE_ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/flight-schedules/**").hasAnyRole("AIRLINE_ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/flight-schedules/**").hasAnyRole("AIRLINE_ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/flight-schedules/**").hasAnyRole("AIRLINE_ADMIN", "SUPER_ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/members").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/members/search").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/members/**").hasRole("ADMIN")

                        // =========================
                        // 4) 나머지 모든 요청은 인증 필요
                        // =========================
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        // ✅ 운영 서버 도메인 추가
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