package com.kh.ct.domain.board.controller;

import com.kh.ct.domain.board.dto.QuestionCreateRequest;
import com.kh.ct.domain.board.dto.QuestionDetailResponse;
import com.kh.ct.domain.board.dto.QuestionListResponse;
import com.kh.ct.domain.board.service.QuestionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;


    @PostMapping
    public ResponseEntity<Long> createQuestion(
            @RequestBody QuestionCreateRequest dto,
            @AuthenticationPrincipal String empId) { // 토큰을 파싱해서 나온 사번

        Long questionId = questionService.createQuestion(dto, empId);
        return ResponseEntity.ok(questionId);
    }

    @GetMapping
    public ResponseEntity<Page<QuestionListResponse>> getQuestions(
            @PageableDefault(page = 0, size = 10, sort = "createDate", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(required = false) String keyword) {

        return ResponseEntity.ok(questionService.getQuestions(pageable, keyword));
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionDetailResponse> getQuestion(@PathVariable(name = "id") Long id) {
        // Service에서 DTO로 변환된 상세 데이터를 가져옵니다.
        return ResponseEntity.ok(questionService.getQuestionDetail(id));
    }

}
