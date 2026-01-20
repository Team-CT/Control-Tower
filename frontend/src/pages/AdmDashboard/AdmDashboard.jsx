import React from 'react';
import * as S from './AdmDashboard.styled';
import { 
  
  FiUsers, 
  FiSun, 
  FiHeart,
  FiCalendar,
  FiClock,
  FiMapPin
} from 'react-icons/fi';
import { FaPlane } from "react-icons/fa";
const Dashboard = () => {
  // TODO: Zustand state mapping
  const dashboardData = {
    date: '2026년 1월 15일 (화)',
    currentTime: '08:45',
    stats: [
      {
        id: 1,
        icon: <FaPlane />,
        label: '현재 근무 중 직원 수',
        value: 18,
        unit: '명',
        trend: '전일 근무 중',
        color: '#4A90E2'
      },
      {
        id: 2,
        icon: <FiUsers />,
        label: '승인 대기 건수',
        value: 847,
        unit: '명',
        trend: '어제 대비 +62명',
        color: '#50C878'
      },
      {
        id: 3,
        icon: <FiSun />,
        label: '이번 달 휴가 사용 현황',
        value: 12,
        unit: '일',
        trend: '8 15일 총 사용 일',
        color: '#FFB347'
      },
      {
        id: 4,
        icon: <FiHeart />,
        label: '직원 평균 건강 점수',
        value: 82,
        unit: '점',
        trend: '지난달 대비 +5점',
        color: '#FF6B9D'
      }
    ],
    todaySchedule: [
      {
        id: 1,
        time: '08:00',
        type: '항공편',
        title: 'KE001 인천 → 뉴욕 (JFK)',
        subtitle: 'A380-800 • 탑승객 14시간 20분',
        badge: '출발',
        badgeColor: '#4A90E2'
      },
      {
        id: 2,
        time: '10:30',
        type: '교육',
        title: '안전 교육 이수',
        subtitle: '본사 교육센터 3동',
        badge: '진행',
        badgeColor: '#FFB347'
      },
      {
        id: 3,
        time: '14:00',
        type: '항공편',
        title: 'KE017 인천 → 파리 (CDG)',
        subtitle: '보잉 787-9 • 파리샤를 14시간 30분',
        badge: '대기',
        badgeColor: '#E0E0E0'
      }
    ],
    quickMenu: [
      { title: '휴가 승인 신청', status: '1건 미처리 신청건이 있습니다.', time: '3시간 전', completed: true },
      { title: '비행 일정 변경', status: 'KE002 항공 기준이 08:00에 변경', time: '5시간 전', completed: false }
    ],
    progress: {
      leave: { current: 12, total: 18, label: '휴가 신청 건수' },
      health: { current: 12, total: 18, label: '근태 정정 건수' }
    },
    healthScore: {
      total: 82,
      physical: { grade: 'A', label: '피로도' },
      stress: { grade: 'B+', label: '스트레스' }
    }
  };

  return (
    <S.MainContainer>
      {/* 상단 헤더 */}
      <S.DashboardHeader>
        <S.GreetingSection>
          <S.GreetingIcon>👋</S.GreetingIcon>
          <div>
            <S.GreetingText>오늘의 근무 상황</S.GreetingText>
            <S.DateDisplay>
              정상 출근 완료 — {dashboardData.date}
            </S.DateDisplay>
          </div>
        </S.GreetingSection>
        <S.CurrentTime>{dashboardData.currentTime}</S.CurrentTime>
      </S.DashboardHeader>

      {/* 통계 카드 그리드 */}
      <S.StatsGrid>
        {dashboardData.stats.map(stat => (
          <S.StatCard key={stat.id} color={stat.color}>
            <S.StatIcon color={stat.color}>{stat.icon}</S.StatIcon>
            <S.StatLabel>{stat.label}</S.StatLabel>
            <S.StatValue>
              <span>{stat.value}</span>
              <S.StatUnit>{stat.unit}</S.StatUnit>
            </S.StatValue>
            <S.StatTrend>{stat.trend}</S.StatTrend>
          </S.StatCard>
        ))}
      </S.StatsGrid>

      {/* 메인 콘텐츠 영역 */}
      <S.ContentGrid>
        {/* 왼쪽: 오늘 일정 */}
        <S.ScheduleSection>
          <S.SectionHeader>
            <S.SectionTitle>
              <FiCalendar /> 오늘 일정
            </S.SectionTitle>
            <S.FilterButton>전체보기</S.FilterButton>
          </S.SectionHeader>

          <S.ScheduleList>
            {dashboardData.todaySchedule.map(schedule => (
              <S.ScheduleItem key={schedule.id}>
                <S.ScheduleTime>
                  <FiClock />
                  {schedule.time}
                </S.ScheduleTime>
                <S.ScheduleContent>
                  <S.ScheduleType>{schedule.type}</S.ScheduleType>
                  <S.ScheduleTitle>{schedule.title}</S.ScheduleTitle>
                  <S.ScheduleSubtitle>
                    <FiMapPin size={14} />
                    {schedule.subtitle}
                  </S.ScheduleSubtitle>
                </S.ScheduleContent>
                <S.ScheduleBadge color={schedule.badgeColor}>
                  {schedule.badge}
                </S.ScheduleBadge>
              </S.ScheduleItem>
            ))}
          </S.ScheduleList>
        </S.ScheduleSection>

        {/* 오른쪽: 빠른 메뉴 & 건강 점수 */}
        <S.SidePanel>
          {/* 직원 평균 건강 점수 */}
          <S.HealthScoreCard>
            <S.SectionHeader>
              <S.SectionTitle style={{ fontSize: '16px' }}>
                ❤️ 직원 평균 건강 점수
              </S.SectionTitle>
            </S.SectionHeader>
            
            <S.HealthScoreDisplay>
              <S.TotalScore>{dashboardData.healthScore.total}</S.TotalScore>
              <S.HealthMetrics>
                <S.HealthMetric>
                  <S.HealthGrade color="#50C878">
                    {dashboardData.healthScore.physical.grade}
                  </S.HealthGrade>
                  <S.MetricLabel>{dashboardData.healthScore.physical.label}</S.MetricLabel>
                </S.HealthMetric>
                <S.HealthMetric>
                  <S.HealthGrade color="#FFB347">
                    {dashboardData.healthScore.stress.grade}
                  </S.HealthGrade>
                  <S.MetricLabel>{dashboardData.healthScore.stress.label}</S.MetricLabel>
                </S.HealthMetric>
              </S.HealthMetrics>
            </S.HealthScoreDisplay>

            <S.ViewReportButton>
              📊 건강 프로그램 승인
            </S.ViewReportButton>
          </S.HealthScoreCard>

          {/* 빠른 알림 */}
          <S.QuickMenuCard>
            <S.SectionHeader>
              <S.SectionTitle style={{ fontSize: '16px' }}>
                ⚡ 최근 알림
              </S.SectionTitle>
              <S.ViewAllLink>모두 보기</S.ViewAllLink>
            </S.SectionHeader>

            <S.QuickMenuList>
              {dashboardData.quickMenu.map((item, idx) => (
                <S.QuickMenuItem key={idx} completed={item.completed}>
                  {item.completed && <S.CheckIcon>✓</S.CheckIcon>}
                  <S.QuickMenuContent>
                    <S.QuickMenuTitle>{item.title}</S.QuickMenuTitle>
                    <S.QuickMenuStatus>{item.status}</S.QuickMenuStatus>
                    <S.QuickMenuTime>{item.time}</S.QuickMenuTime>
                  </S.QuickMenuContent>
                </S.QuickMenuItem>
              ))}
            </S.QuickMenuList>
          </S.QuickMenuCard>
        </S.SidePanel>
      </S.ContentGrid>

      {/* 하단: 진행률 */}
      <S.ProgressSection>
        <S.SectionHeader>
          <S.SectionTitle>📊 상태</S.SectionTitle>
          <S.MonthButton>휴가 승인</S.MonthButton>
        </S.SectionHeader>

        <S.ProgressGrid>
          <S.ProgressBar>
            <S.ProgressLabel>{dashboardData.progress.leave.label}</S.ProgressLabel>
            <S.ProgressTrack>
              <S.ProgressFill 
                width={(dashboardData.progress.leave.current / dashboardData.progress.leave.total) * 100}
                color="#4A90E2"
              />
            </S.ProgressTrack>
            <S.ProgressValue>
              {dashboardData.progress.leave.current}일 / {dashboardData.progress.leave.total}일
            </S.ProgressValue>
          </S.ProgressBar>

          <S.ProgressBar>
            <S.ProgressLabel>{dashboardData.progress.health.label}</S.ProgressLabel>
            <S.ProgressTrack>
              <S.ProgressFill 
                width={(dashboardData.progress.health.current / dashboardData.progress.health.total) * 100}
                color="#50C878"
              />
            </S.ProgressTrack>
            <S.ProgressValue>
              {dashboardData.progress.health.current}일 / {dashboardData.progress.health.total}일
            </S.ProgressValue>
          </S.ProgressBar>
        </S.ProgressGrid>
      </S.ProgressSection>
    </S.MainContainer>
  );
};

export default Dashboard;