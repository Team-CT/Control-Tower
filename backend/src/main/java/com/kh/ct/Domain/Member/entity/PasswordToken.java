package com.kh.ct.domain.member.entity;


import com.kh.ct.global.common.CommonEnums;
import com.kh.ct.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class PasswordToken extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long PasswordTokenId;

    @JoinColumn(nullable = false, name = "emp_id")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private com.kh.ct.domain.member.entity.Emp empId;

    @Column(length = 200)
    private String passwordToken;

    private LocalDateTime tokenExpiresDate;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.CommonStatus leaveApplyStatus;


}
