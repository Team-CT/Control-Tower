package com.kh.ct.domain_2.health_2.entity;

import com.kh.ct.global_2.entity.BaseTimeEntity;
import com.kh.ct.domain_2.emp_2.entity.Emp;
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
