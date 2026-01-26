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