package com.kh.ct.domain_2.board_2.entity;


import com.kh.ct.global_2.entity.BaseTimeEntity;
import com.kh.ct.domain_2.emp_2.entity.Emp;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Question extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @JoinColumn(name = "questioner",nullable = false)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Emp questioner;

    @Column(nullable = false, length = 100)
    private String questionTitle;

    @Lob
    @Column(nullable = false)
    private String questionContent;

    @JoinColumn(name = "answerer")
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    private Emp answerer;

    @Lob
    private String answerContent;
}
