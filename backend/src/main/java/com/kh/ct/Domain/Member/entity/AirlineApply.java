package com.kh.ct.Domain.Member.entity;

import com.kh.ct.Global.entity.BaseTimeEntity;
import com.kh.ct.Global.common.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class AirlineApply extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long airlineApplyId;

    @Column(length = 100)
    private String airlineName;

    @Column(length = 100)
    private String theme;

    @Column(length = 50)
    private String mainNumber;

    @Column(length = 255)
    private String airlineAddress;

    @Column(length = 500)
    private String airlineDesc;

    @Column(length = 150)
    private String airlineApplyEmail;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.ApplyStatus airlineApplyStatus;

    @Lob
    private String airlineApplyCancelReason;
}