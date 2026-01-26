package com.kh.ct.domain.schedule.entity;

import com.kh.ct.global.entity.BaseTimeEntity;
import com.kh.ct.global.common.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class FlySchedule extends BaseTimeEntity {

    @Id
    @Column(name = "fly_schedule_id")
    private Long flyScheduleId;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fly_schedule_id")
    private com.kh.ct.domain.schedule.entity.AllSchedule scheduleId;

    @Column(length = 20)
    private String flightNumber;

    @Column(length = 30)
    private String airplaneType;

    @Column(length = 50)
    private String departure;

    private LocalDateTime flyStartTime;

    @Column(length = 50)
    private String destination;

    private LocalDateTime flyEndTime;

    @Column(length = 20)
    private String gate;

    private Integer crewCount;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.flightStatus flightStatus;

    private Integer seatCount;
}