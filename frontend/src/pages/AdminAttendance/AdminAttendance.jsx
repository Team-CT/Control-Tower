import React, { useState } from 'react';
import { Users, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import * as S from './AdminAttendance.styled';

const AdminAttendance = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  // Mock Data - 상단 통계
  const stats = [
    { label: '전체 직원', value: 48, icon: Users, color: '#e0e7ff', textColor: '#4f46e5' },
    { label: '출근', value: 42, icon: CheckCircle, color: '#d1fae5', textColor: '#059669' },
    { label: '지각', value: 3, icon: Clock, color: '#fef3c7', textColor: '#d97706' },
    { label: '결근', value: 3, icon: AlertCircle, color: '#fee2e2', textColor: '#dc2626' },
  ];

  // Mock Data - 휴가 승인 대기 목록
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      name: '이수진',
      department: '개발 1팀',
      period: '2026-01-25 ~ 2026-01-27 (3일)',
      reason: '개인 사유',
      badge: '연차'
    },
    {
      id: 2,
      name: '이수진',
      department: '개발 2팀',
      period: '2026-01-25 ~ 2026-01-27 (3일)',
      reason: '개인 사유',
      badge: '연차'
    },
    {
      id: 3,
      name: '이수진',
      department: '관리팀',
      period: '2026-01-25 ~ 2026-01-27 (3일)',
      reason: '개인 사유',
      badge: '연차'
    }
  ]);

  // Mock Data - 부서별 현황
  const departmentStats = [
    { name: '개발팀', total: 13, present: 13, late: 0, absent: 0, percentage: 100 },
    { name: '디자인팀', total: 7, present: 7, late: 0, absent: 0, percentage: 100 },
    { name: '기획팀', total: 9, present: 7, late: 1, absent: 1, percentage: 78 },
    { name: '영업팀', total: 11, present: 9, late: 1, absent: 1, percentage: 82 },
    { name: '인사팀', total: 2, present: 2, late: 0, absent: 0, percentage: 100 },
  ];

  // 승인 처리
  const handleApprove = (id) => {
    console.log('승인:', id);
    setLeaveRequests(prev => prev.filter(req => req.id !== id));
    // TODO: API 호출
  };

  // 반려 처리
  const handleReject = (id) => {
    console.log('반려:', id);
    setLeaveRequests(prev => prev.filter(req => req.id !== id));
    // TODO: API 호출
  };

  return (
    <S.Container>
      {/* 헤더 */}
      <S.Header>
        <S.Title>근태관리 시스템</S.Title>
        <S.UserInfo>관리자</S.UserInfo>
      </S.Header>

      {/* 탭 네비게이션 */}
      <S.TabContainer>
        <S.Tab
          $active={selectedTab === 'dashboard'}
          onClick={() => setSelectedTab('dashboard')}
        >
          대시보드
        </S.Tab>
        <S.Tab
          $active={selectedTab === 'attendance'}
          onClick={() => setSelectedTab('attendance')}
        >
          직원 현황
        </S.Tab>
        <S.Tab
          $active={selectedTab === 'calendar'}
          onClick={() => setSelectedTab('calendar')}
        >
          근태 기록
        </S.Tab>
      </S.TabContainer>

      {/* 메인 컨텐츠 */}
      <S.MainContent>
        {/* 상단 통계 카드 */}
        <S.StatsGrid>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <S.StatCard key={index} $color={stat.color}>
                <S.StatIcon $color={stat.textColor}>
                  <IconComponent size={24} />
                </S.StatIcon>
                <S.StatInfo>
                  <S.StatLabel>{stat.label}</S.StatLabel>
                  <S.StatValue $color={stat.textColor}>{stat.value}</S.StatValue>
                </S.StatInfo>
              </S.StatCard>
            );
          })}
        </S.StatsGrid>

        {/* 메인 레이아웃 (좌측: 휴가 승인 목록, 우측: 부서별 현황) */}
        <S.ContentGrid>
          {/* 좌측: 휴가 승인 대기 목록 */}
          <S.LeftPanel>
            <S.SectionHeader>
              <S.SectionTitle>
                <S.SectionIcon>📋</S.SectionIcon>
                휴가 승인 대기 목록 (관리자)
              </S.SectionTitle>
              <S.FilterButtons>
                <S.FilterButton $active>전체 보기</S.FilterButton>
                <S.FilterButton>반려</S.FilterButton>
              </S.FilterButtons>
            </S.SectionHeader>

            <S.LeaveRequestList>
              {leaveRequests.map((request) => (
                <S.LeaveRequestCard key={request.id}>
                  <S.RequestBadge>{request.badge}</S.RequestBadge>
                  <S.RequestInfo>
                    <S.RequestName>{request.name}</S.RequestName>
                    <S.RequestDepartment>{request.department}</S.RequestDepartment>
                    <S.RequestPeriod>{request.period}</S.RequestPeriod>
                    <S.RequestReason>사유: {request.reason}</S.RequestReason>
                  </S.RequestInfo>
                  <S.ActionButtons>
                    <S.ApproveButton onClick={() => handleApprove(request.id)}>
                      ✓ 승인
                    </S.ApproveButton>
                    <S.RejectButton onClick={() => handleReject(request.id)}>
                      ✕ 반려
                    </S.RejectButton>
                  </S.ActionButtons>
                </S.LeaveRequestCard>
              ))}
            </S.LeaveRequestList>
          </S.LeftPanel>

          {/* 우측: 부서별 현황 */}
          <S.RightPanel>
            <S.SectionHeader>
              <S.SectionTitle>
                <S.SectionIcon>📊</S.SectionIcon>
                부서별 현황
              </S.SectionTitle>
            </S.SectionHeader>

            <S.DepartmentList>
              {departmentStats.map((dept, index) => (
                <S.DepartmentCard key={index}>
                  <S.DepartmentHeader>
                    <S.DepartmentName>{dept.name}</S.DepartmentName>
                    <S.DepartmentTotal>{dept.total}/{dept.total}</S.DepartmentTotal>
                  </S.DepartmentHeader>
                  <S.ProgressBar>
                    <S.ProgressFill $percentage={dept.percentage} />
                  </S.ProgressBar>
                  <S.DepartmentStats>
                    <S.DepartmentStat $color="#059669">
                      출근: {dept.present}
                    </S.DepartmentStat>
                    <S.DepartmentStat $color="#d97706">
                      지각: {dept.late}
                    </S.DepartmentStat>
                    <S.DepartmentStat $color="#dc2626">
                      결근: {dept.absent}
                    </S.DepartmentStat>
                  </S.DepartmentStats>
                </S.DepartmentCard>
              ))}
            </S.DepartmentList>
          </S.RightPanel>
        </S.ContentGrid>
      </S.MainContent>
    </S.Container>
  );
};

export default AdminAttendance;