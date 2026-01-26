package com.kh.ct.global_2.entity;

import com.kh.ct.domain_2.emp_2.entity.Emp;
import com.kh.ct.global_2.common.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Alarm extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alarmId;

    @Lob
    @Column(nullable = false)
    private String alarmContent;

    @JoinColumn(name = "receiver")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Emp receiver;

    @Column(length = 1)
    @Enumerated(EnumType.STRING)
    private CommonEnums.CommonStatus alarmStatus;
}
