package com.kh.ct.Health.entity;

import com.kh.ct.Common.entity.BaseTimeEntity;
import com.kh.ct.Common.entity.CommonEnums;
import com.kh.ct.Member.entity.Emp;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProgramApply extends BaseTimeEntity {

    @Id
    @Column(length = 255)
    private String programApplyId;

    @Column(length = 50)
    private String programCode;

    @JoinColumn(name = "program_apply_applicant")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Emp programApplyApplicant;

    @JoinColumn(name = "program_apply_manager")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Emp programApplyManager;

    @JoinColumn(name = "program_apply_approver")
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    private Emp programApplyApprover;

    @Lob
    private String programApplyReason;

    private LocalDateTime programApplyDate;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.ApplyStatus programApplyStatus;

    @Lob
    private String programApplyCancelReason;

    @OneToOne(mappedBy = "programApply",
            cascade = CascadeType.ALL, orphanRemoval = true)
    private Program program;
}
