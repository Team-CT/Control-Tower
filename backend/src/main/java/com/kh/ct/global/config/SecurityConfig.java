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
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // ✅ 인증 없이 가능한 경우

                        // auth 기본
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/refresh").permitAll()

                        // 회원가입/사전단계
                        .requestMatchers(HttpMethod.POST, "/api/auth/ocr-business-card").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/signup").permitAll()

                        // emp 관련 (가입/조회 일부)
                        .requestMatchers(HttpMethod.POST, "/api/emps").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/emps/findId").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/emps/checkId").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/emps/empNo/preview").permitAll()

                        // 비밀번호 재설정
                        .requestMatchers(HttpMethod.POST, "/api/auth/password/**").permitAll()

                        // ✅ 내 정보 조회 등은 인증 필수 (와일드카드보다 우선순위 높음)
                        .requestMatchers("/api/emps/me/**").authenticated()

                        // 임시: 테스트용 (나중에 authenticated()로 변경)
                        .requestMatchers(HttpMethod.GET, "/api/emps/*/airline").permitAll()

                        .requestMatchers(HttpMethod.POST, "/api/passwordCode/**").permitAll()

                        .requestMatchers("/api/chat").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/health/preview").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/health/save").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/airline-applications").permitAll()
                        .requestMatchers("/api/account-activation/**").permitAll()
                        .requestMatchers("/api/questions/**").permitAll()

                        // 파일
                        .requestMatchers("/api/file/**").permitAll()
                        .requestMatchers("/api/file/download/**").permitAll()

                        // 슈퍼 관리자 전용
                        .requestMatchers("/api/super-admin/**").hasRole("SUPER_ADMIN")

                        // 공통/기초 데이터
                        .requestMatchers("/api/common/codes/**").permitAll()
                        .requestMatchers("/api/airlines").permitAll()
                        .requestMatchers("/api/airports").permitAll()

                        // 항공편 API
                        .requestMatchers(HttpMethod.GET, "/api/flight-schedules/sync").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/flight-schedules").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/flight-schedules/**")
                        .hasAnyRole("AIRLINE_ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/flight-schedules/**")
                        .hasAnyRole("AIRLINE_ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/flight-schedules/**")
                        .hasAnyRole("AIRLINE_ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/flight-schedules/**")
                        .hasAnyRole("AIRLINE_ADMIN", "SUPER_ADMIN")

                        .requestMatchers("/api/emp/**").authenticated()

                        // 관리자 전용
                        .requestMatchers(HttpMethod.GET, "/api/members").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/members/search").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/members/**").hasRole("ADMIN")

                        .requestMatchers("/api/dashboard/admin/**").permitAll()
                        .requestMatchers("/api/admin/attendance/**").permitAll()
                        .requestMatchers("/api/health/admin/**").permitAll()

                        // 알림 API: SSE 스트림은 EventSource 특성상 커스텀 헤더를 보낼 수 없어 permitAll 처리
                        .requestMatchers("/api/notifications/stream").permitAll() // SSE 연결 (컨트롤러에서 토큰 검증/또는 쿼리 토큰 검증)
                        .requestMatchers("/api/notifications/**").authenticated() // 나머지 알림 API는 인증 필요

                        // 나머지 경로
                        .requestMatchers("/api/settings/**").permitAll()
                        .requestMatchers("/ws/**").permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:5174"));
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