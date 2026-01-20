package com.kh.ct.Health.entity;

import com.kh.ct.Common.entity.File;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EmpPhysicalTestFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long physicalFileId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private File file;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private EmpPhysicalTest physicalTest;
}