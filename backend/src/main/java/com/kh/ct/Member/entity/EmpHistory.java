package com.kh.ct.Member.entity;

import com.kh.ct.Common.entity.BaseTimeEntity;
import com.kh.ct.Common.entity.File;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EmpHistory extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long empHistoryId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Emp empId;

    @Column(nullable = false, length = 50)
    private String job;

    @Column(nullable = false, length = 50)
    private String historyDepartment;
}
