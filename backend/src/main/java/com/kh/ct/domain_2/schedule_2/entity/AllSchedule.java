package com.kh.ct.domain_2.schedule_2.entity;

import com.kh.ct.global_2.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class AllSchedule extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;

    @Column(length = 20)
    private String scheduleCode; // FLIGHT, COUNSEL, EXERCISE, REST 같은 형태 추천
}