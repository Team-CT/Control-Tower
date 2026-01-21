package com.kh.ct.Health.entity;

import com.kh.ct.Common.entity.BaseTimeEntity;
import com.kh.ct.Member.entity.Emp;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EmpHealth extends BaseTimeEntity {

    @Id
    private String empHealthId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "emp_id", nullable = false)
    private Emp empId;

    private Integer healthPoint;

    private Integer stressPoint;

    private Integer fatiguePoint;

    private Integer physicalPoint;
}
