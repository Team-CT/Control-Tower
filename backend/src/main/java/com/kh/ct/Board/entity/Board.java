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
public class Board extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @Column(nullable = false)
    private String boardType;

    @Column(nullable = false, length = 100)
    private String boardTitle;

    @Lob
    private String boardContent;

    @JoinColumn(nullable = false, name = "board_writer")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Emp boardWriter;

    private Integer boardCount;
}