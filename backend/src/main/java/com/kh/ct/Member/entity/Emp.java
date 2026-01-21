package com.kh.ct.Member.entity;

import com.kh.ct.Common.entity.BaseTimeEntity;
import com.kh.ct.Common.entity.CommonEnums;
import com.kh.ct.Common.entity.File;
import com.kh.ct.Health.entity.EmpHealth;
import com.kh.ct.Health.entity.EmpPhysicalTest;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.context.support.BeanDefinitionDsl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Emp extends BaseTimeEntity {

    @Id
    @Column(length = 50)
    private String empId;

    @JoinColumn(name = "airline_id")
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    private Airline airlineId;

    @JoinColumn(name = "department_id")
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    private Department departmentId;

    @Column(nullable = false, length = 100)
    private String empName;

    @Column(nullable = false, length = 255)
    private String empPwd;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false, length = 50) // 승무원/조종사/정비사 등
    private BeanDefinitionDsl.Role role;

    @Column(length = 30)
    private String phone;

    @Column(nullable = false, length = 50)
    private String job;

    @Column(length = 150)
    private String email;

    @Column(length = 255)
    private String address;

    @Column(nullable = false, length = 1)
    @Enumerated(EnumType.STRING)
    private CommonEnums.EmpStatus empStatus;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private Float leaveCount;

    @Column(nullable = false, length = 50)
    private String empNo;

    @JoinColumn(name = "profile_Image")
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    private File profileImage;

    @OneToMany(mappedBy = "empId", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EmpHealth> empHealthList = new ArrayList<>();

    @OneToMany(
            mappedBy = "empId", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EmpPhysicalTest> physicalTests = new ArrayList<>();
}
