package com.kh.ct.Domain.Health.entity;

import com.kh.ct.Global.entity.BaseTimeEntity;
import com.kh.ct.Domain.Member.entity.Emp;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
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
