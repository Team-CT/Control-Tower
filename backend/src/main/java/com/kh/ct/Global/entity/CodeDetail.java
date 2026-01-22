package com.kh.ct.Global.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CodeDetail extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeDetailId;

    @JoinColumn(name = "code_id")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Code codeId;

    @Column(nullable = false)
    private String codeDetailName;

    @Lob
    private String codeDesc;
}