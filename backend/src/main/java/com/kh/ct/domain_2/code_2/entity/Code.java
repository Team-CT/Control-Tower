package com.kh.ct.domain_2.code_2.entity;


import com.kh.ct.global_2.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Code extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeId;

    @Column(nullable = false, length = 100)
    private String codeName;

    @OneToMany(mappedBy = "codeId", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL, orphanRemoval = true)
    private List<com.kh.ct.domain_2.code_2.entity.CodeDetail> codeDetails = new ArrayList<>();
}