package com.kh.ct.Board.entity;


import com.kh.ct.Common.entity.BaseTimeEntity;
import com.kh.ct.Member.entity.Emp;
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

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Emp questioner;

    @Column(nullable = false, length = 100)
    private String questionTitle;

    @Lob
    @Column(nullable = false)
    private String questionContent;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Emp answerer;

    @Lob
    private String answerContent;
}
