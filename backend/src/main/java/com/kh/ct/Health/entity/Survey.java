package com.kh.ct.Health.entity;

import com.kh.ct.Common.entity.BaseTimeEntity;
import com.kh.ct.Common.entity.CommonEnums;
import com.kh.ct.Member.entity.Emp;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Survey extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long surveyId;

    private LocalDateTime surveyFrom;

    private LocalDateTime surveyTo;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.CommonStatus surveyState;

    @JoinColumn(nullable = false, name = "survey_writer")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Emp surveyWriter;

    @OneToMany(mappedBy = "surveyId2", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EmpSurvey> empSurveys = new ArrayList<>();
}