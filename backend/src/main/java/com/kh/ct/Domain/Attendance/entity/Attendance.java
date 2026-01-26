package com.kh.ct.domain.attendance.entity;

import com.kh.ct.global.entity.BaseTimeEntity;
import com.kh.ct.global.common.CommonEnums;
import com.kh.ct.domain.member.entity.Emp;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Attendance extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attendanceId;

    @Column(nullable = false)
    private LocalDate attendanceDate;

    private LocalTime inTime;

    private LocalTime outTime;


    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.AttendanceStatus attendanceStatus;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "emp_id")
    private Emp empId;

}