import React, { useState,useEffect } from 'react';
import * as S from './EmployeeDashboard.styled';
import { getTodayString ,getYearString ,getWorkingDaysInMonth } from './Total_date';
import { fetchDashboardData } from "./dashboardApi"; 
import { ATTENDANCE_CONFIG } from './Total_working'; 
import { useNavigate } from 'react-router-dom';


const EmployeeDashboard = () => {

  const [leaveCount, setLeaveCount] = useState(0);
  const [currentTime, setCurrentTime] = useState('--:--'); 
  const [currentDate] = useState(getTodayString());
  const [statusInfo, setStatusInfo] = useState(ATTENDANCE_CONFIG.DEFAULT);
  const [currentYear] = useState(getYearString());
const [totalWorkingDays, setTotalWorkingDays] = useState(0); // 이번 달 총 평일 수
  const [actualWorkingDays, setActualWorkingDays] = useState(0);
const [flightTime, setFlightTime] = useState(0); //비행시간 
const [flightCount, setFlightCount] = useState(0); // 비행 횟수 
const [healthData, setHealthData] = useState({
    healthPoint: 0,
    stressPoint: 0,
    fatiguePoint: 0,
    physicalPoint: 0
  });
const [recentNotifications, setRecentNotifications] = useState([]);
const navigate = useNavigate();
const handleHealthDetailClick = () => {
    // 클릭 시 이동할 경로 설정
    navigate('/health-dashboard');
  };
  useEffect(() => { 
    const loadData = async () => {
      try {

        const storageData = localStorage.getItem('auth-storage');
       const parsedData = JSON.parse(storageData);
        
        // 3. 토큰 및 사원 정보 추출
        const token = parsedData.state?.token;
        const empId = parsedData.state?.emp?.empId;
        const empName = parsedData.state?.emp?.empName;
        const role = parsedData.state?.emp?.role;

        console.log("확인된 사번:", empId);
        console.log("확인된 이름:", empName);
        console.log("확인된 역할:", role);
        console.log("현재 로컬스토리에서 가져온 토큰:", token);
            if (!token) {
                navigate('/login');
                return;
            }

            // 2. 인자 없이 API 호출 (백엔드에서 토큰으로 유저 식별)
            const data = await fetchDashboardData();

        setTotalWorkingDays(getWorkingDaysInMonth());
        console.log("1. 전체 응답 데이터:", data);

        
        // 1. 연차 개수 설정
        if (data.empInfo) {
          setLeaveCount(data.empInfo.leaveCount || 0);
        }

     // [추가] 백엔드 DTO에서 넘어온 workingDays(실제 근무일) 설정
        if (data.workingDays !== undefined) {
          setActualWorkingDays(data.workingDays);
        }
        // 2. 출결 상태 및 출근 시간 설정
        if (data.attendanceList && data.attendanceList.length > 0) {
          const todayData = data.attendanceList[0];
          
          // Enum 값에 따른 설정값 가져오기
          const config = ATTENDANCE_CONFIG[todayData.attendanceStatus] || ATTENDANCE_CONFIG.DEFAULT;
          setStatusInfo(config);

          // 시간 표시 (HH:mm)
          if (todayData.inTime) {
            setCurrentTime(todayData.inTime.substring(0, 5));
          }
        }

         if (data.totalFlightHours !== undefined) {
        setFlightTime(data.totalFlightHours);
      }
      if (data.totalFlightCount !== undefined) {
        setFlightCount(data.totalFlightCount);
      }

     if (data.healthInfo) {
  setHealthData({
    healthPoint: data.healthInfo.healthPoint || 0,
    stressPoint: data.healthInfo.stressPoint || 0,
    fatiguePoint: data.healthInfo.fatiguePoint || 0,
    physicalPoint: data.healthInfo.physicalPoint || 0
  });
}

   const newNotifications = [];
// 1. 한국 시간 기준 오늘 날짜 문자열 (YYYY-MM-DD) 생성
const todayStr = new Date().toLocaleDateString('en-CA'); 

if (data.attendanceList && data.attendanceList.length > 0) {
    // 2. 리스트를 복사하여 ID 역순(최신순)으로 정렬
    const sortedList = [...data.attendanceList].sort((a, b) => b.attendanceId - a.attendanceId);

    // 3. 정렬된 리스트에서 오늘(todayStr)이 아닌 첫 번째 데이터를 찾음 (이것이 전날 근태)
    const lastWorkDay = sortedList.find(item => item.attendanceDate !== todayStr);

    if (lastWorkDay) {
        // 정의해두신 ATTENDANCE_CONFIG 활용
        const status = ATTENDANCE_CONFIG[lastWorkDay.attendanceStatus] || ATTENDANCE_CONFIG.DEFAULT;
        
        // 날짜 가독성을 위해 월-일만 추출 (선택 사항)
        const dateParts = lastWorkDay.attendanceDate.split('-');
        const formattedDate = `${dateParts[1]}월 ${dateParts[2]}일`;

        newNotifications.push({
            id: 1,
            icon: lastWorkDay.attendanceStatus === 'ABSENT' ? '❗' : '✅',
            title: '전일 근태 결과 확인',
            message: `${formattedDate} 근태가 [${status.label}]로 처리되었습니다.`,
            time: '최종 반영',
            color: status.color
        });
    } else {
        // 오늘 기록만 있거나 과거 기록이 아예 없는 경우
        newNotifications.push({
            id: 1,
            icon: 'ℹ️',
            title: '근태 알림',
            message: '이전 근무 기록이 존재하지 않습니다.',
            time: '-',
            color: '#95A5A6'
        });
    }
}




                const issueFlight = data.flightList?.find(f => f.flightStatus === 'DELAYED' || f.flightStatus === 'CANCELLED');
        if (issueFlight) {
            newNotifications.push({
                id: 2,
                icon: '⚠️',
                title: issueFlight.flightStatus === 'DELAYED' ? '비행 지연 공지' : '비행 취소 공지',
                // DTO의 flyStartTime(yyyy-MM-dd HH:mm)에서 시간만 추출
                message: `[${issueFlight.flyStartTime.substring(11)}] ${issueFlight.flightNumber}편이 ${issueFlight.flightStatus === 'DELAYED' ? '지연' : '취소'}되었습니다.`,
                time: '실시간',
                color: '#E74C3C'
            });
        } else {
            const nextFlight = data.flightList?.[0];
            newNotifications.push({
                id: 2,
                icon: '✈️',
                title: '스케줄 정상',
                message: nextFlight ? `다음 비행: ${nextFlight.flightNumber} (${nextFlight.flyStartTime.substring(11)})` : '지연/취소된 일정이 없습니다.',
                time: '현재',
                color: '#4A90E2'
            });
        }
             setRecentNotifications(newNotifications);

      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다.", error);
        console.error("에러 상세 정보:", error.response);
        if(error.response?.status === 401) navigate('/login');
      }
    };

    loadData();
  }, [navigate]);


  // 통계 데이터
  const statistics = [
   { 
      id: 'day', 
      icon: '💼', 
      label: '이번 달 근무일', 
      value: actualWorkingDays, 
      unit: `/ ${totalWorkingDays}일`,
      subInfo: '정상 근무 중',
      color: '#F39C12'
    },
   { 
    id: 'flight', 
    icon: '✈️', 
    label: '누적 비행시간', 
    value: flightTime,  // [수정] 상태값 반영
    unit: '시간',
    subInfo: `비행 수 : ${flightCount}회`, // [수정] 상태값 반영
    color: '#27AE60'
  },
     { 
      id: 'leave', 
      icon: '📅', 
      label: '남은 연차', 
      value: `${leaveCount}`, 
      unit: `일`,
      subInfo: `${currentYear}`,
      color: '#4A90E2'
    },
    { 
      id: 'stress', 
      icon: '❤️', 
      label: '건강 점수', 
      value: healthData.healthPoint, 
      unit: '점',
      subInfo: '평균 지수',
      color: '#E74C3C'
    }
  ];

  // 오늘의 일정
  const todaySchedule = [
    {
      id: 1,
      time: '08:00',
      type: 'flight',
      title: 'KE001 인천 → 뉴욕 (JFK)',
      subtitle: 'A380-800 • 탑승객 14시간 20분',
      status: '준비',
      statusColor: '#27AE60'
    },
    {
      id: 2,
      time: '10:30',
      type: 'education',
      title: '안전 교육 이수',
      subtitle: '보안 교육센터 3층',
      status: '대기',
      statusColor: '#F39C12'
    },
    {
      id: 3,
      time: '14:00',
      type: 'flight',
      title: 'KE017 인천 → 파리 (CDG)',
      subtitle: 'B777-300ER • 탑승객 12시간 30분',
      status: '1시간',
      statusColor: '#95A5A6'
    }
  ];

  // 최근 알림


  // 성과 데이터
 const performanceData = {
    attendance: { 
      label: '연차 사용', 
      // 총 연차를 15일로 가정할 때: (15 - 남은연차) = 사용한 연차
      current: Math.max(0, 15 - leaveCount), 
      total: 15, 
      percentage: Math.min(100, ((15 - leaveCount) / 15) * 100) 
    },
    leave: { 
      label: '근무일', 
      current: actualWorkingDays, 
      total: totalWorkingDays, 
      // 이번 달 근무 진행률 (실제근무일 / 이번달 총 평일)
      percentage: totalWorkingDays > 0 ? (actualWorkingDays / totalWorkingDays) * 100 : 0 
    }
  };

  return (
    <S.DashboardContainer>
      <S.MainContent>
        {/* 출퇴근 현황 배너 */}
        <S.AttendanceBanner>
          <S.BannerContent>
            <S.BannerInfo>
              <S.BannerLabel>오늘의 근무 상태</S.BannerLabel>
              <S.BannerTitle>{statusInfo.label} - {currentDate}</S.BannerTitle>
            </S.BannerInfo>
            <S.BannerTime>{currentTime}</S.BannerTime>
          </S.BannerContent>
        </S.AttendanceBanner>

        {/* 통계 카드 영역 */}
        <S.StatisticsGrid>
          {statistics.map((stat) => (
            <S.StatCard key={stat.id} color={stat.color}>
              <S.StatHeader>
                <S.StatIcon>{stat.icon}</S.StatIcon>
                <S.StatLabel>{stat.label}</S.StatLabel>
              </S.StatHeader>
              <S.StatValue>
                {stat.value} <S.StatUnit>{stat.unit}</S.StatUnit>
              </S.StatValue>
              <S.StatSubInfo $positive={stat.subInfo.includes('+')}>
                {stat.subInfo}
              </S.StatSubInfo>
            </S.StatCard>
          ))}
        </S.StatisticsGrid>

        {/* 메인 그리드 (일정 + 알림) */}
        <S.ContentGrid>
          {/* 오늘의 일정 */}
          <S.ScheduleSection>
            <S.SectionHeader>
              <S.SectionTitle>
                📅 오늘 일정
              </S.SectionTitle>
              
            </S.SectionHeader>

            <S.ScheduleList>
              {todaySchedule.map((schedule) => (
                <S.ScheduleItem key={schedule.id}>
                  <S.ScheduleTime>{schedule.time}</S.ScheduleTime>
                  <S.ScheduleContent>
                    <S.ScheduleTitle>{schedule.title}</S.ScheduleTitle>
                    <S.ScheduleSubtitle>{schedule.subtitle}</S.ScheduleSubtitle>
                  </S.ScheduleContent>
                  <S.ScheduleStatus color={schedule.statusColor}>
                    {schedule.status}
                  </S.ScheduleStatus>
                </S.ScheduleItem>
              ))}
            </S.ScheduleList>
          </S.ScheduleSection>

          {/* 알림 및 성과 */}
          <S.RightPanel>
            {/* 나의 건강 현황 */}
            <S.HealthSection>
              <S.SectionHeader>
                <S.SectionTitle>❤️ 나의 건강 현황</S.SectionTitle>
                <S.SectionAction>업데이트</S.SectionAction>
              </S.SectionHeader>

              <S.HealthScore>
                <S.ScoreValue>{healthData.healthPoint}</S.ScoreValue>
                <S.ScoreGrid>
                  <S.ScoreItem>
                    <S.ScoreGrade grade="A">{healthData.physicalPoint}</S.ScoreGrade>
                    <S.ScoreLabel>체력(신체건강)</S.ScoreLabel>
                  </S.ScoreItem>
                  <S.ScoreItem>
                    <S.ScoreGrade grade="B+">{healthData.stressPoint}</S.ScoreGrade>
                    <S.ScoreLabel>스트레스</S.ScoreLabel>
                  </S.ScoreItem>
                </S.ScoreGrid>
              </S.HealthScore>

              <S.HealthActionButton onClick={handleHealthDetailClick}>
                📊 상세 정보보기
              </S.HealthActionButton>
            </S.HealthSection>

            {/* 최근 알림 */}
            <S.NotificationSection>
                            <S.SectionHeader>
                                <S.SectionTitle>🔔 최근 알림</S.SectionTitle>
                            </S.SectionHeader>
                            <S.NotificationList>
                                {recentNotifications.map((noti) => (
                                    <S.NotificationItem key={noti.id}>
                                        <S.NotificationIcon color={noti.color}>{noti.icon}</S.NotificationIcon>
                                        <S.NotificationContent>
                                            <S.NotificationTitle>{noti.title}</S.NotificationTitle>
                                            <S.NotificationMessage>{noti.message}</S.NotificationMessage>
                                            <S.NotificationTime>{noti.time}</S.NotificationTime>
                                        </S.NotificationContent>
                                    </S.NotificationItem>
                                ))}
                            </S.NotificationList>
                        </S.NotificationSection>
          </S.RightPanel>
        </S.ContentGrid>

        <S.PerformanceSection>
          <S.SectionHeader>
            <S.SectionTitle>📊 이번 달 현황</S.SectionTitle>
          </S.SectionHeader>

          <S.PerformanceChart>
            {/* 연차 사용 바 */}
            <S.ChartBar>
              <S.ChartLabel>연차</S.ChartLabel>
              <S.ChartProgress>
                <S.ChartFill 
                  width={performanceData.attendance.percentage} 
                  color="#4A90E2"
                />
              </S.ChartProgress>
              <S.ChartValue>
                {performanceData.attendance.current}일 사용 
                <S.ChartTotal>/ {leaveCount}일</S.ChartTotal>
              </S.ChartValue>
            </S.ChartBar>

            {/* 근무일 바 */}
            <S.ChartBar>
              <S.ChartLabel>근무</S.ChartLabel>
              <S.ChartProgress>
                <S.ChartFill 
                  width={performanceData.leave.percentage} 
                  color="#27AE60"
                />
              </S.ChartProgress>
              <S.ChartValue>
                {performanceData.leave.current}일 출근 
                <S.ChartTotal>/ {performanceData.leave.total}일</S.ChartTotal>
              </S.ChartValue>
            </S.ChartBar>
          </S.PerformanceChart>
        </S.PerformanceSection>
      </S.MainContent>
    </S.DashboardContainer>
  );
};

export default EmployeeDashboard;