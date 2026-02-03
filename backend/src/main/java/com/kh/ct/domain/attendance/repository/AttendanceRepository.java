package com.kh.ct.domain.attendance.repository;

import com.kh.ct.domain.attendance.entity.Attendance;
import com.kh.ct.global.common.CommonEnums;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * 근태 Repository
 */
@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    /**
     * 특정 직원의 특정 기간 근태 기록 조회
     */
    List<Attendance> findByEmpId_EmpIdAndAttendanceDateBetween(
            String empId,
            LocalDate startDate,
            LocalDate endDate);

    /**
     * 특정 직원의 오늘 근태 기록 조회
     */
    @Query("SELECT a FROM Attendance a WHERE a.empId.empId = :empId AND a.attendanceDate = :today")
    Optional<Attendance> findTodayAttendance(
            @Param("empId") String empId,
            @Param("today") LocalDate today);

    /**
     * 특정 직원의 월별 특정 상태 카운트
     */
    @Query("SELECT COUNT(a) FROM Attendance a " +
            "WHERE a.empId.empId = :empId " +
            "AND a.attendanceDate BETWEEN :startDate AND :endDate " +
            "AND a.attendanceStatus = :status")
    long countByStatusInMonth(
            @Param("empId") String empId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("status") CommonEnums.AttendanceStatus status);

    /**
     * 특정 직원의 월별 총 근무시간 계산 (분 단위)
     * inTime과 outTime이 모두 있는 경우만 계산
     */
    @Query("SELECT SUM(FUNCTION('TIMESTAMPDIFF', MINUTE, a.inTime, a.outTime)) " +
            "FROM Attendance a " +
            "WHERE a.empId.empId = :empId " +
            "AND a.attendanceDate BETWEEN :startDate AND :endDate " +
            "AND a.inTime IS NOT NULL " +
            "AND a.outTime IS NOT NULL")
    Long calculateTotalWorkMinutes(
            @Param("empId") String empId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /**
     * 특정 직원의 특정 날짜 근태 기록 조회
     */
    Optional<Attendance> findByEmpId_EmpIdAndAttendanceDate(String empId, LocalDate date);

    /**
     * 특정 직원의 날짜 범위 내 근태 기록 삭제 (휴가 반려 시)
     */
    void deleteByEmpId_EmpIdAndAttendanceDateBetween(String empId, LocalDate startDate, LocalDate endDate);
}
