package com.kh.ct.domain_2.attendance_2.entity;

import com.kh.ct.global_2.entity.BaseTimeEntity;
import com.kh.ct.global_2.common.CommonEnums;
import com.kh.ct.domain_2.emp_2.entity.Emp;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ProtestApply extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long protestApplyId;

    @Column(nullable = false)
    private LocalDateTime protestApplyDate;

    @JoinColumn(nullable = false, name = "protest_apply_applicant")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Emp protestApplyApplicant;

    @JoinColumn(name = "protest_apply_approver")
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    private Emp protestApplyApprover;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.ApplyStatus protestApplyStatus;

    @Lob
    private String protestApplyCancelReason;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.AttendanceStatus protestAttendanceStatus;

    @OneToMany(mappedBy = "protestApplyId", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProtestApplyFile> files = new ArrayList<>();
}
