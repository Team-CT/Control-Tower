package com.kh.ct.Member.entity;


import com.kh.ct.Common.entity.BaseTimeEntity;
import com.kh.ct.Common.entity.CommonEnums;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
