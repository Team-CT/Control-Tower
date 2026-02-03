package com.kh.ct.domain.board.dto;



import lombok.*;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDetailResponse {
    private Long questionId;
    private String questionTitle;
    private String questionContent;

    // 질문자 정보
    private String questionerName;
    private String questionerId; // 본인 확인용 (사번)
    private LocalDateTime createDate;

    // 답변 정보
    private boolean answered;
    private String answerContent;
    private String answererName;
    private LocalDateTime answerDate; // Entity의 updateDate를 여기에 매핑
}
