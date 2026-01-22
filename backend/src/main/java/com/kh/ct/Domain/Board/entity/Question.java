package com.kh.ct.Domain.Board.entity;


import com.kh.ct.Global.entity.BaseTimeEntity;
import com.kh.ct.Domain.Member.entity.Emp;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
