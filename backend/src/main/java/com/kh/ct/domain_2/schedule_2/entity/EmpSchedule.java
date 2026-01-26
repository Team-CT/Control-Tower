package com.kh.ct.domain_2.schedule_2.entity;

import com.kh.ct.global_2.entity.BaseTimeEntity;
import com.kh.ct.domain_2.emp_2.entity.Emp;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
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