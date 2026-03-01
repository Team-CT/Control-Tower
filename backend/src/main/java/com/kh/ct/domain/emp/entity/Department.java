package com.kh.ct.domain.emp.entity;

import com.kh.ct.global.common.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long departmentId;

    @Column(length = 100)
    private String departmentName;

    private Integer empCount;

    @JoinColumn(name = "parent_department")
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    private Department parentDepartment;


    @Column(nullable = false, length = 1)
    @Enumerated(EnumType.STRING)
    private CommonEnums.CommonStatus departmentStatus;


    // 🔹 부서 담당자 (부서장)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_emp_id")
    private Emp manager;

    // 🔹 부서 설명
    @Column(length = 1000)
    private String description;
  

    @OneToMany(mappedBy = "parentDepartment", fetch = FetchType.LAZY)
    private List<Department> children = new ArrayList<>();

    public void changeName(String name) {
        this.departmentName = name;
    }

    public void changeParent(Department parent) {
        this.parentDepartment = parent;
    }

    public void changeManager(Emp manager) {
        this.manager = manager;
    }

    public void changeDescription(String description) {
        this.description = description;
    }

    public void changeStatus(CommonEnums.CommonStatus status) {
        this.departmentStatus = status;
    }
}