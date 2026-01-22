package com.kh.ct.Domain.Health.entity;

import com.kh.ct.Global.entity.BaseTimeEntity;
import com.kh.ct.Global.entity.File;
import com.kh.ct.Domain.Member.entity.Emp;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EmpPhysicalTest extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long physicalTestId;

    @JoinColumn(name = "emp_id")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Emp empId;

    @Column(nullable = false)
    private LocalDateTime testDate;

    private Integer length;

    private Integer height;

    private Integer bloodSugar;

    private Integer systolicBloodPressure;

    private Integer cholesterol;

    private Integer diastolicBloodPressure;

    private Integer heartRate;

    private Integer bmi;

    private Integer bodyFat;

    @OneToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "flie_id")
    private File fileId;
}
