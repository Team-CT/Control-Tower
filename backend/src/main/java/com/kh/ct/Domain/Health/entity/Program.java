package com.kh.ct.Domain.Health.entity;

import com.kh.ct.Global.entity.BaseTimeEntity;
import com.kh.ct.Domain.Schedule.entity.AllSchedule;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Program extends BaseTimeEntity {

    @Id
    @Column(name = "program_apply_id")
    private String programApplyId;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "program_apply_id")
    private ProgramApply programApply;

    @JoinColumn(name = "schedule_id")
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    private AllSchedule scheduleId;

    @Lob
    private String programContent;

    @Column(length = 30)
    private String programStatus;

    @Lob
    private String programCancelReason;
}