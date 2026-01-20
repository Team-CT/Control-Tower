package com.kh.ct.Board.entity;

import com.kh.ct.Common.entity.File;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardFileId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private File file;
}
