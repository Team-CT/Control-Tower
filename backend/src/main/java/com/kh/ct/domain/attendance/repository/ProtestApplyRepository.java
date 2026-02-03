package com.kh.ct.domain.attendance.repository;

import com.kh.ct.domain.attendance.entity.ProtestApply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 근태 정정 신청 Repository
 */
@Repository
public interface ProtestApplyRepository extends JpaRepository<ProtestApply, Long> {

    /**
     * 특정 직원의 정정 신청 목록 조회 (최신순)
     */
    List<ProtestApply> findByProtestApplyApplicant_EmpIdOrderByCreateDateDesc(String empId);
}
