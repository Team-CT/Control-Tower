package com.kh.ct.domain.schedule.service;

import com.kh.ct.domain.emp.entity.Emp;
import com.kh.ct.domain.emp.repository.EmpRepository;
import com.kh.ct.domain.schedule.dto.FlyScheduleDto;
import com.kh.ct.domain.schedule.entity.EmpSchedule;
import com.kh.ct.domain.schedule.entity.FlySchedule;
import com.kh.ct.domain.schedule.repository.EmpScheduleRepository;
import com.kh.ct.domain.schedule.repository.FlyScheduleRepository;
import com.kh.ct.global.common.CommonEnums;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FlyScheduleServiceImpl implements FlyScheduleService {
    
    private final FlyScheduleRepository flyScheduleRepository;
    private final EmpScheduleRepository empScheduleRepository;
    private final EmpRepository empRepository;
    
    @Override
    public List<FlyScheduleDto.ListResponse> getFlightSchedules(
            Long airlineId,
            String empId,
            LocalDateTime startDate,
            LocalDateTime endDate,
            String departure,
            String destination
    ) {
        List<FlySchedule> schedules;
        
        // 직원인 경우 본인이 배정된 비행편만 조회
        if (empId != null) {
            schedules = flyScheduleRepository.findByEmpId(empId);
        } else {
            // 관리자인 경우 필터 조건에 따라 조회
            if (startDate != null && endDate != null) {
                schedules = flyScheduleRepository.findByDateRange(airlineId, startDate, endDate);
            } else if (departure != null || destination != null) {
                schedules = flyScheduleRepository.findByDepartureAndDestination(airlineId, departure, destination);
            } else {
                schedules = flyScheduleRepository.findByAirlineId(airlineId);
            }
        }
        
        // 직원이 배정된 스케줄 ID 목록 (isAssignedToMe 판단용)
        Set<Long> assignedScheduleIds = null;
        if (empId != null) {
            assignedScheduleIds = empScheduleRepository.findByEmpId(empId).stream()
                    .map(es -> es.getScheduleId().getScheduleId())
                    .collect(Collectors.toSet());
        }
        
        final Set<Long> finalAssignedScheduleIds = assignedScheduleIds;
        
        return schedules.stream()
                .map(fs -> convertToListResponse(fs, finalAssignedScheduleIds))
                .collect(Collectors.toList());
    }
    
    @Override
    public FlyScheduleDto getFlightScheduleDetail(Long flyScheduleId, String empId) {
        FlySchedule flySchedule = flyScheduleRepository.findByFlyScheduleId(flyScheduleId)
                .orElseThrow(() -> new IllegalArgumentException("비행편을 찾을 수 없습니다. (flyScheduleId: " + flyScheduleId + ")"));
        
        // 크루 멤버 조회
        List<EmpSchedule> empSchedules = empScheduleRepository.findByScheduleId(flySchedule.getScheduleId().getScheduleId());
        List<FlyScheduleDto.CrewMemberDto> crewMembers = empSchedules.stream()
                .map(es -> {
                    Emp emp = es.getEmpId();
                    return FlyScheduleDto.CrewMemberDto.builder()
                            .empId(emp.getEmpId())
                            .empName(emp.getEmpName())
                            .role(emp.getRole().name())
                            .job(emp.getJob())
                            .build();
                })
                .collect(Collectors.toList());
        
        // 항공사 정보 (첫 번째 크루 멤버의 항공사 사용)
        Long airlineId = null;
        String airlineName = null;
        if (!empSchedules.isEmpty() && empSchedules.get(0).getEmpId().getAirlineId() != null) {
            airlineId = empSchedules.get(0).getEmpId().getAirlineId().getAirlineId();
            airlineName = empSchedules.get(0).getEmpId().getAirlineId().getAirlineName();
        }
        
        // 시간 포맷팅
        String departureTime = formatTime(flySchedule.getFlyStartTime());
        String arrivalTime = formatTime(flySchedule.getFlyEndTime());
        String duration = calculateDuration(flySchedule.getFlyStartTime(), flySchedule.getFlyEndTime());
        
        return FlyScheduleDto.builder()
                .flyScheduleId(flySchedule.getFlyScheduleId())
                .flightNumber(flySchedule.getFlightNumber())
                .airplaneType(flySchedule.getAirplaneType())
                .departure(flySchedule.getDeparture())
                .flyStartTime(flySchedule.getFlyStartTime())
                .destination(flySchedule.getDestination())
                .flyEndTime(flySchedule.getFlyEndTime())
                .gate(flySchedule.getGate())
                .crewCount(flySchedule.getCrewCount())
                .flightStatus(flySchedule.getFlightStatus())
                .seatCount(flySchedule.getSeatCount())
                .crewMembers(crewMembers)
                .airlineId(airlineId)
                .airlineName(airlineName)
                .departureTime(departureTime)
                .arrivalTime(arrivalTime)
                .duration(duration)
                .build();
    }
    
    private FlyScheduleDto.ListResponse convertToListResponse(FlySchedule fs, Set<Long> assignedScheduleIds) {
        // 시간 포맷팅
        String departureTime = formatTime(fs.getFlyStartTime());
        String arrivalTime = formatTime(fs.getFlyEndTime());
        String duration = calculateDuration(fs.getFlyStartTime(), fs.getFlyEndTime());
        
        // 크루 배정 여부
        boolean crewAssigned = fs.getCrewCount() != null && fs.getCrewCount() > 0;
        
        // 본인 배정 여부
        boolean isAssignedToMe = assignedScheduleIds != null 
                && assignedScheduleIds.contains(fs.getScheduleId().getScheduleId());
        
        // 항공사 정보 (EmpSchedule을 통해 가져오기 - 첫 번째 크루 멤버의 항공사)
        Long airlineId = null;
        String airlineName = null;
        List<EmpSchedule> empSchedules = empScheduleRepository.findByScheduleId(fs.getScheduleId().getScheduleId());
        if (!empSchedules.isEmpty() && empSchedules.get(0).getEmpId().getAirlineId() != null) {
            airlineId = empSchedules.get(0).getEmpId().getAirlineId().getAirlineId();
            airlineName = empSchedules.get(0).getEmpId().getAirlineId().getAirlineName();
        }
        
        return FlyScheduleDto.ListResponse.builder()
                .flyScheduleId(fs.getFlyScheduleId())
                .flightNumber(fs.getFlightNumber())
                .departure(fs.getDeparture())
                .destination(fs.getDestination())
                .flyStartTime(fs.getFlyStartTime())
                .flyEndTime(fs.getFlyEndTime())
                .flightStatus(fs.getFlightStatus())
                .crewCount(fs.getCrewCount())
                .crewAssigned(crewAssigned)
                .isAssignedToMe(isAssignedToMe)
                .departureTime(departureTime)
                .arrivalTime(arrivalTime)
                .duration(duration)
                .airlineId(airlineId)
                .airlineName(airlineName)
                .build();
    }
    
    private String formatTime(LocalDateTime dateTime) {
        if (dateTime == null) return "";
        return dateTime.format(DateTimeFormatter.ofPattern("HH:mm"));
    }
    
    private String calculateDuration(LocalDateTime start, LocalDateTime end) {
        if (start == null || end == null) return "";
        
        Duration duration = Duration.between(start, end);
        long hours = duration.toHours();
        long minutes = duration.toMinutes() % 60;
        
        if (hours > 0 && minutes > 0) {
            return hours + "시간 " + minutes + "분";
        } else if (hours > 0) {
            return hours + "시간";
        } else {
            return minutes + "분";
        }
    }
}
