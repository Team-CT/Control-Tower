package com.kh.ct.domain.board.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class QuestionCreateRequest {
    private String title;
    private String content;
}