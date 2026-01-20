import React, { useState } from 'react';
import styled from 'styled-components';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const MainContainer = styled.div`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.$color || 'var(--primary-color)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
`;

const CalendarSection = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 32px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const MonthTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
`;

const NavButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const NavButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-main);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  &:hover {
    background: var(--bg-hover);
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const DayHeader = styled.div`
  text-align: center;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
`;

const DayCell = styled.div`
  aspect-ratio: 1;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  background: ${props => props.$isToday ? 'var(--primary-color)' : 'var(--bg-main)'};
  color: ${props => props.$isToday ? 'white' : 'var(--text-primary)'};
  position: relative;

  &:hover {
    background: ${props => props.$isToday ? 'var(--primary-color)' : 'var(--bg-hover)'};
  }
`;

const DayNumber = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const AttendanceStatus = styled.div`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${props => {
    if (props.$status === 'present') return '#D4EDDA';
    if (props.$status === 'absent') return '#F8D7DA';
    if (props.$status === 'late') return '#FFF3CD';
    return 'transparent';
  }};
  color: ${props => {
    if (props.$status === 'present') return '#155724';
    if (props.$status === 'absent') return '#721C24';
    if (props.$status === 'late') return '#856404';
    return 'var(--text-secondary)';
  }};
  text-align: center;
`;

const EmployeeAttendance = () => {
  const [currentMonth, setCurrentMonth] = useState('2026년 1월');
  
  // [QA Mock] 로컬 스토리지 데이터 불러오기
  const storedData = localStorage.getItem('attendance_mock');
  const attendance = storedData ? JSON.parse(storedData) : {};
  
  const todayDate = new Date().getDate(); // 실제 오늘 날짜
  const isTodayWorked = attendance.date === new Date().toISOString().split('T')[0];

  // Mock data
  const stats = [
    { 
      label: '오늘의 상태', 
      value: isTodayWorked ? (attendance.status === 'working' ? '근무 중' : '퇴근 완료') : '미출근', 
      icon: isTodayWorked ? (attendance.status === 'working' ? CheckCircle : CheckCircle) : AlertCircle, 
      color: isTodayWorked ? (attendance.status === 'working' ? '#50C878' : '#4A90E2') : '#e5e7eb' 
    },
    { label: '이번 달 지각', value: '0', icon: AlertCircle, color: '#FFB84D' },
    { label: '이번 달 결근', value: '0', icon: XCircle, color: '#FF6B6B' },
    { label: '총 근무시간', value: '162h', icon: Clock, color: '#4A90E2' },
  ];

  const attendanceData = {
    ...{
      1: 'present', 2: 'present', 3: 'present', 5: 'present', 
      6: 'present', 7: 'present', 8: 'present', 9: 'present',
      10: 'absent', 12: 'present', 13: 'present', 14: 'late'
    },
    // 오늘 날짜 데이터 동적 추가
    ...(isTodayWorked ? { [todayDate]: attendance.status === 'working' ? 'present' : 'present' } : {})
  };

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  
  const renderCalendar = () => {
    const days = [];
    const totalDays = new Date(2026, 1, 0).getDate(); // 1월의 마지막 날짜

    for (let i = 1; i <= totalDays; i++) {
      days.push(
        <DayCell key={i} $isToday={i === todayDate}>
          <DayNumber>{i}</DayNumber>
          {attendanceData[i] && (
            <AttendanceStatus $status={attendanceData[i]}>
              {attendanceData[i] === 'present' && '출근'}
              {attendanceData[i] === 'late' && '지각'}
              {attendanceData[i] === 'absent' && '결근'}
            </AttendanceStatus>
          )}
        </DayCell>
      );
    }
    return days;
  };

  return (
    <MainContainer>
      <Header>
        <Title>내 근태 현황</Title>
        <Subtitle>나의 출퇴근 기록과 근무 시간을 확인하세요</Subtitle>
      </Header>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatIcon $color={stat.color}>
              <stat.icon size={24} />
            </StatIcon>
            <StatLabel>{stat.label}</StatLabel>
            <StatValue>{stat.value}</StatValue>
          </StatCard>
        ))}
      </StatsGrid>

      <CalendarSection>
        <CalendarHeader>
          <MonthTitle>{currentMonth}</MonthTitle>
          <NavButtons>
            <NavButton onClick={() => console.log('prev')}>‹</NavButton>
            <NavButton onClick={() => console.log('next')}>›</NavButton>
          </NavButtons>
        </CalendarHeader>

        <CalendarGrid>
          {daysOfWeek.map(day => (
            <DayHeader key={day}>{day}</DayHeader>
          ))}
          {renderCalendar()}
        </CalendarGrid>
      </CalendarSection>
    </MainContainer>
  );
};

export default EmployeeAttendance;
