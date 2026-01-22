package com.kh.ct.Domain.Schedule.entity;

import com.kh.ct.Global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AllSchedule extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;

    @Column(length = 20)
    private String scheduleCode; // FLIGHT, COUNSEL, EXERCISE, REST 같은 형태 추천
}