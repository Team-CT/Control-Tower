package com.kh.ct.Attendance.entity;

import com.kh.ct.Common.entity.BaseTimeEntity;
import com.kh.ct.Member.entity.Emp;
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

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Emp leaveApplyApplicant;

    @Column(nullable = false)
    private LocalDateTime leaveStartDate;

    @Lob
    private String leaveApplyReason;

    private LocalDateTime leaveEndDate;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Emp leaveApplyApprover;

    @Column(length = 30)
    private String leaveApplyStatus;

    @Lob
    private String leaveApplyCancelReason;

    public enum Status {
        PRESENT,LATE,EARLY_LEAVE,HALF_DAY,VACATION,ABSENT
    }
}