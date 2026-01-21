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

    @JoinColumn(name = "board_id")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Board boardId;

    @JoinColumn(name = "file_id")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private File fileId;
}
