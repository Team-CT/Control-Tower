package com.kh.ct.domain.board.dto;


import com.kh.ct.domain.board.entity.Question;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class QuestionListResponse {
    private Long questionId;
    private String questionTitle;
    private String questionerName;
    private LocalDateTime createDate; // 필드명 통일
    private boolean isAnswered;

    public static QuestionListResponse from(Question entity) {
        return QuestionListResponse.builder()
                .questionId(entity.getQuestionId())
                .questionTitle(entity.getQuestionTitle())
                .questionerName(entity.getQuestioner().getEmpName())
                .createDate(entity.getCreateDate()) // entity의 getter 명칭에 맞춤
                .isAnswered(entity.getAnswerContent() != null)
                .build();
    }
}