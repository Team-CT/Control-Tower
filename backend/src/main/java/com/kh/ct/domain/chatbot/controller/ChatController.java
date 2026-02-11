package com.kh.ct.domain.chatbot.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    private final ChatClient chatClient;

    // 생성자 주입 방식 확인
    public ChatController(ChatClient.Builder builder) {
        this.chatClient = builder
                .defaultSystem("너는 항공 시스템 지원 센터의 친절한 상담원이야.")
                .build();
    }

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody Map<String, String> request) {
        try {
            String userMessage = request.get("message");
            // API 호출
            String reply = chatClient.prompt()
                    .user(userMessage)
                    .call()
                    .content();

            return Map.of("reply", reply);
        } catch (Exception e) {
            e.printStackTrace(); // 에러 내용을 서버 콘솔에 출력
            return Map.of("reply", "서버 에러가 발생했습니다: " + e.getMessage());
        }
    }
}