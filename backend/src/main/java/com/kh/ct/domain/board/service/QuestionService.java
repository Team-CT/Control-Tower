package com.kh.ct.domain.board.service;


import com.kh.ct.domain.board.dto.QuestionCreateRequest;
import com.kh.ct.domain.board.dto.QuestionDetailResponse;
import com.kh.ct.domain.board.dto.QuestionListResponse;
import com.kh.ct.domain.board.entity.Question;
import com.kh.ct.domain.board.repository.QuestionRepository;
import com.kh.ct.domain.emp.entity.Emp;
import com.kh.ct.domain.emp.repository.EmpRepository;
import com.kh.ct.global.common.CommonEnums;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final EmpRepository empRepository;

    public List<QuestionListResponse> getQuestionList() {
        return questionRepository.findAllByOrderByCreateDateDesc().stream()
                .map(QuestionListResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public Long createQuestion(QuestionCreateRequest dto, String empId) {
        // 1. 현재 활동 중(ACTIVE)인 사원인지 확인하며 조회
        Emp questioner = empRepository.findByEmpIdAndEmpStatus(empId, CommonEnums.EmpStatus.Y)
                .orElseThrow(() -> new RuntimeException("활동 중인 사원 정보를 찾을 수 없습니다."));

        // 2. 질문 생성 및 저장
        Question question = Question.builder()
                .questionTitle(dto.getTitle())
                .questionContent(dto.getContent())
                .questioner(questioner)
                .build();

        return questionRepository.save(question).getQuestionId();
    }

    public Page<QuestionListResponse> getQuestions(Pageable pageable, String keyword) {
        Page<Question> questions;
        if (keyword != null && !keyword.isEmpty()) {
            questions = questionRepository.findByQuestionTitleContaining(keyword, pageable);
        } else {
            questions = questionRepository.findAll(pageable);
        }

        // 이 부분이 핵심입니다. Page 객체의 map을 사용해야 합니다.
        return questions.map(QuestionListResponse::from);
    }


    @Transactional(readOnly = true)
    public QuestionDetailResponse getQuestionDetail(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 질문입니다."));

        return QuestionDetailResponse.builder()
                .questionId(question.getQuestionId())
                .questionTitle(question.getQuestionTitle())
                .questionContent(question.getQuestionContent())
                .questionerName(question.getQuestioner().getEmpName()) // Emp 엔티티에 getName()이 있다고 가정
                .questionerId(question.getQuestioner().getEmpId())
                .createDate(question.getCreateDate())
                // 답변이 있으면 true, 없으면 false
                .answered(question.getAnswerContent() != null)
                .answerContent(question.getAnswerContent())
                // 답변이 있다면 답변자 이름을 가져옴
                .answererName(question.getAnswerer() != null ? question.getAnswerer().getEmpName() : null)
                // 답변 등록 시점 혹은 수정 시점인 updateDate를 매핑
                .answerDate(question.getUpdateDate())
                .build();
    }
}