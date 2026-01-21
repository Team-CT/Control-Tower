package com.kh.ct.Schedule.entity;

import com.kh.ct.Common.entity.BaseTimeEntity;
import com.kh.ct.Member.entity.Emp;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EmpSchedule extends BaseTimeEntity {

    @Id
    @Column(name = "emp_schedule_id")
    private Long empScheduleId;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "emp_schedule_id")
    private AllSchedule scheduleId;

    @JoinColumn(name = "emp_id")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Emp empId;
}