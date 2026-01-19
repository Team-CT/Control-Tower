import React, { useState } from 'react';
import * as S from './EmployeeDashboard.styled';

const EmployeeDashboard = () => {
  // TODO: Zustand state mapping
  const [currentTime] = useState('08:45');
  const [currentDate] = useState('2026년 1월 15일 (화)');
  
  // 통계 데이터
  const statistics = [
    { 
      id: 'leave', 
      icon: '📅', 
      label: '이번 달 연차', 
      value: 18, 
      unit: '/ 22일',
      subInfo: '잔여 근무 중',
      color: '#4A90E2'
    },
    { 
      id: 'flight', 
      icon: '✈️', 
      label: '누적 비행시간', 
      value: 847, 
      unit: '시간',
      subInfo: '이번 달 +42시간',
      color: '#27AE60'
    },
    { 
      id: 'health', 
      icon: '🏥', 
      label: '건강 검진', 
      value: 12, 
      unit: '월',
      subInfo: '3월 15일 예정',
      color: '#F39C12'
    },
    { 
      id: 'stress', 
      icon: '❤️', 
      label: '건강 점수', 
      value: 82, 
      unit: '점',
      subInfo: '지난달 대비 +5점',
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
  const recentNotifications = [
    {
      id: 1,
      type: 'attendance',
      icon: '✅',
      title: '출퇴근 완료',
      message: '1/20 업무 근태가 완료되었습니다.',
      time: '5분전',
      color: '#27AE60'
    },
    {
      id: 2,
      type: 'schedule',
      icon: '✈️',
      title: '비행 일정 변경',
      message: 'KE008 항공 4/30(목) 08:00로 변경',
      time: '3시간',
      color: '#4A90E2'
    }
  ];

  // 성과 데이터
  const performanceData = {
    attendance: { label: '연차', current: 12, total: 18, percentage: 66.7 },
    leave: { label: '근무일', current: 18, total: 22, percentage: 81.8 }
  };

  return (
    <S.DashboardContainer>
      <S.MainContent>
        {/* 출퇴근 현황 배너 */}
        <S.AttendanceBanner>
          <S.BannerContent>
            <S.BannerInfo>
              <S.BannerLabel>오늘의 근무 상태</S.BannerLabel>
              <S.BannerTitle>정상 출근 완료 - {currentDate}</S.BannerTitle>
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
                📅 이번 주 일정
              </S.SectionTitle>
              <S.SectionAction>전체보기</S.SectionAction>
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
                <S.ScoreValue>82</S.ScoreValue>
                <S.ScoreGrid>
                  <S.ScoreItem>
                    <S.ScoreGrade grade="A">A</S.ScoreGrade>
                    <S.ScoreLabel>체력</S.ScoreLabel>
                  </S.ScoreItem>
                  <S.ScoreItem>
                    <S.ScoreGrade grade="B+">B+</S.ScoreGrade>
                    <S.ScoreLabel>스트레스</S.ScoreLabel>
                  </S.ScoreItem>
                </S.ScoreGrid>
              </S.HealthScore>

              <S.HealthActionButton>
                📊 상세 정보보기
              </S.HealthActionButton>
            </S.HealthSection>

            {/* 최근 알림 */}
            <S.NotificationSection>
              <S.SectionHeader>
                <S.SectionTitle>🔔 최근 알림</S.SectionTitle>
                <S.SectionAction>전체 보기</S.SectionAction>
              </S.SectionHeader>

              <S.NotificationList>
                {recentNotifications.map((notification) => (
                  <S.NotificationItem key={notification.id}>
                    <S.NotificationIcon color={notification.color}>
                      {notification.icon}
                    </S.NotificationIcon>
                    <S.NotificationContent>
                      <S.NotificationTitle>{notification.title}</S.NotificationTitle>
                      <S.NotificationMessage>{notification.message}</S.NotificationMessage>
                      <S.NotificationTime>{notification.time}</S.NotificationTime>
                    </S.NotificationContent>
                  </S.NotificationItem>
                ))}
              </S.NotificationList>
            </S.NotificationSection>
          </S.RightPanel>
        </S.ContentGrid>

        {/* 성과 차트 */}
        <S.PerformanceSection>
          <S.SectionHeader>
            <S.SectionTitle>📊 성과</S.SectionTitle>
            <S.PerformanceButton>월간 성과</S.PerformanceButton>
          </S.SectionHeader>

          <S.PerformanceChart>
            <S.ChartBar>
              <S.ChartLabel>연차</S.ChartLabel>
              <S.ChartProgress>
                <S.ChartFill 
                  width={performanceData.attendance.percentage} 
                  color="#4A90E2"
                />
              </S.ChartProgress>
              <S.ChartValue>
                {performanceData.attendance.current}일 
                <S.ChartTotal>/ {performanceData.attendance.total}일</S.ChartTotal>
              </S.ChartValue>
            </S.ChartBar>

            <S.ChartBar>
              <S.ChartLabel>근무일</S.ChartLabel>
              <S.ChartProgress>
                <S.ChartFill 
                  width={performanceData.leave.percentage} 
                  color="#27AE60"
                />
              </S.ChartProgress>
              <S.ChartValue>
                {performanceData.leave.current}일 
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