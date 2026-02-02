package com.kh.ct.domain.schedule.repository;

import com.kh.ct.domain.schedule.entity.FlySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface FlyScheduleRepository extends JpaRepository<FlySchedule, Long> {
    
    // 항공사별 비행편 조회 (EmpSchedule을 통해 Emp의 airlineId 확인)
    @Query("SELECT DISTINCT fs FROM FlySchedule fs " +
           "JOIN fs.scheduleId s " +
           "LEFT JOIN EmpSchedule es ON es.scheduleId.scheduleId = s.scheduleId " +
           "WHERE s.scheduleCode = 'FLIGHT' " +
           "AND (:airlineId IS NULL OR es.empId.airlineId.airlineId = :airlineId) " +
           "ORDER BY fs.flyStartTime DESC")
    List<FlySchedule> findByAirlineId(@Param("airlineId") Long airlineId);
    
    // 날짜 범위로 조회
    @Query("SELECT DISTINCT fs FROM FlySchedule fs " +
           "JOIN fs.scheduleId s " +
           "LEFT JOIN EmpSchedule es ON es.scheduleId.scheduleId = s.scheduleId " +
           "WHERE s.scheduleCode = 'FLIGHT' " +
           "AND (:airlineId IS NULL OR es.empId.airlineId.airlineId = :airlineId) " +
           "AND fs.flyStartTime >= :startDate " +
           "AND fs.flyStartTime < :endDate " +
           "ORDER BY fs.flyStartTime ASC")
    List<FlySchedule> findByDateRange(
        @Param("airlineId") Long airlineId,
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate
    );
    
    // 출발지/도착지로 조회
    @Query("SELECT DISTINCT fs FROM FlySchedule fs " +
           "JOIN fs.scheduleId s " +
           "LEFT JOIN EmpSchedule es ON es.scheduleId.scheduleId = s.scheduleId " +
           "WHERE s.scheduleCode = 'FLIGHT' " +
           "AND (:airlineId IS NULL OR es.empId.airlineId.airlineId = :airlineId) " +
           "AND (:departure IS NULL OR fs.departure LIKE %:departure%) " +
           "AND (:destination IS NULL OR fs.destination LIKE %:destination%) " +
           "ORDER BY fs.flyStartTime ASC")
    List<FlySchedule> findByDepartureAndDestination(
        @Param("airlineId") Long airlineId,
        @Param("departure") String departure,
        @Param("destination") String destination
    );
    
    // 직원이 배정된 비행편 조회
    @Query("SELECT DISTINCT fs FROM FlySchedule fs " +
           "JOIN fs.scheduleId s " +
           "JOIN EmpSchedule es ON es.scheduleId.scheduleId = s.scheduleId " +
           "WHERE s.scheduleCode = 'FLIGHT' " +
           "AND es.empId.empId = :empId " +
           "ORDER BY fs.flyStartTime DESC")
    List<FlySchedule> findByEmpId(@Param("empId") String empId);
    
    // 비행편 ID로 조회
    Optional<FlySchedule> findByFlyScheduleId(Long flyScheduleId);
}
