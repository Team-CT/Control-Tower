package com.kh.ct.domain.chatbot.service;


import org.springframework.ai.chat.client.ChatClient; // 이 경로가 정확해야 함
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatClient chatClient;

    // 생성자 주입 방식
    public ChatService(ChatClient.Builder builder) {
        this.chatClient = builder
                .defaultSystem("너는 항공 시스템 지원 센터의 상담원이야.")
                .build();
    }

    public String getChatReply(String userMessage) {
        return chatClient.prompt()
                .user(userMessage)
                .call()
                .content();
    }
}