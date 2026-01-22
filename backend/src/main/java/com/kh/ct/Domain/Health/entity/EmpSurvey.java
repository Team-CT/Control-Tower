package com.kh.ct.Domain.Health.entity;

import com.kh.ct.Global.entity.BaseTimeEntity;
import com.kh.ct.Domain.Member.entity.Emp;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EmpSurvey extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long empSurveyId;

    @JoinColumn(name = "survey_id2")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Survey surveyId2;

    @JoinColumn(name = "emp_id")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Emp empId;

    private Integer flyStressPoint;

    private Integer timeDifferencePoint;

    private Integer workPatternPoint;
}