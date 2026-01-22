package com.kh.ct.Domain.Attendance.entity;

import com.kh.ct.Global.entity.BaseTimeEntity;
import com.kh.ct.Global.common.CommonEnums;
import com.kh.ct.Domain.Member.entity.Emp;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LeaveApply extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leaveApplyId;

    @Column(nullable = false, length = 50)
    private String leaveApplyCode;

    @JoinColumn(nullable = false, name = "leave_apply_applicant")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Emp leaveApplyApplicant;

    @Column(nullable = false)
    private LocalDateTime leaveStartDate;

    @Lob
    private String leaveApplyReason;

    private LocalDateTime leaveEndDate;

    @JoinColumn(name = "leave_apply_approver")
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    private Emp leaveApplyApprover;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.ApplyStatus leaveApplyStatus;

    @Lob
    private String leaveApplyCancelReason;


}