package com.kh.ct;

import org.springframework.boot.CommandLineRunner; // 추가됨
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean; // 추가됨
import org.springframework.security.crypto.password.PasswordEncoder; // 추가됨

@SpringBootApplication
public class CtApplication {

	public static void main(String[] args) {
		SpringApplication.run(CtApplication.class, args);
	}

	// 👇 여기에 추가하시면 됩니다 (class 괄호 안쪽)
	@Bean
	public CommandLineRunner passwordEncodeRunner(PasswordEncoder passwordEncoder) {
		return args -> {
			String rawPassword = "1234"; // 👉 변경할 비밀번호
			String encodedPassword = passwordEncoder.encode(rawPassword);

			System.out.println("=================================");
			System.out.println("🔐 RAW PASSWORD     : " + rawPassword);
			System.out.println("🔐 ENCODED PASSWORD : " + encodedPassword);
			System.out.println("=================================");
		};
	}
}