import React, { useState } from 'react';
import {
  MainContainer,
  ContentWrapper,
  PageHeader,
  HeaderBadge,
  PageTitle,
  PageSubtitle,
  ActionBar,
  ActionButton,
  FilterButton,
  SearchBar,
  SearchIcon,
  SearchInput,
  SortButton,
  ProgramList,
  ProgramCard,
  ProgramHeader,
  ParticipantAvatar,
  ParticipantInfo,
  ParticipantName,
  ParticipantId,
  ParticipantDepartment,
  StatusBadge,
  ProgramContent,
  SectionLabel,
  ProgramDescription,
  StatsGrid,
  StatItem,
  StatValue,
  StatLabel,
  CardFooter,
  FooterDate,
  CardActions,
  RejectButton,
  ApproveButton,
  EmptyState,
  EmptyIcon,
  EmptyText
} from './HealthProgramManagement.styled';

const HealthProgramManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActive, setFilterActive] = useState(false);

  {/* TODO: Zustand state mapping */}
  const programs = [
    {
      id: 1,
      participant: {
        name: '김민수',
        employeeId: 'EMP-2024-0847',
        department: '객실승무부',
        role: '수석승무원',
        avatar: '김',
        avatarColor: '#4A90E2'
      },
      status: 'pending',
      statusText: '심사 대기',
      description: '최근 장거리 노선 비행으로 인한 실버 타임존에 스케줄로 겪락하고 있습니다. 전문 상담사와 상담 통해 스트레스 관리 방법을 배우고 싶습니다.',
      stats: {
        flightHours: { value: '156h', label: '총 비행시간' },
        stress: { value: '78', label: '스트레스 지수' },
        health: { value: '82', label: '건강 점수' },
        visits: { value: '2회', label: '이용 신청' }
      },
      submittedAt: '2026-01-13 09:30'
    },
    {
      id: 2,
      participant: {
        name: '이지현',
        employeeId: 'EMP-2024-1234',
        department: '객실승무부',
        role: '주임승무원',
        avatar: '이',
        avatarColor: '#52C41A'
      },
      status: 'approved',
      statusText: '승인 프로그램',
      description: '체력 유지 및 면역력 향상을 위해 정기적인 운동 프로그램에 참여하고 싶습니다.',
      stats: {
        flightHours: { value: '124h', label: '총 비행시간' },
        stress: { value: '45', label: '스트레스 지수' },
        health: { value: '88', label: '건강 점수' },
        visits: { value: '0회', label: '이용 신청' }
      },
      submittedAt: '2026-01-12 14:20'
    },
    {
      id: 3,
      participant: {
        name: '박준혁',
        employeeId: 'EMP-2023-0567',
        department: '기장',
        role: '국제선장',
        avatar: '박',
        avatarColor: '#FF6B35'
      },
      status: 'review',
      statusText: '검토 프로그램',
      description: '연속적인 대장항 뱅쿠버운 신체 피로를 이체율 것 같습니다. 항공 현업에 특화 집 신업 현업에 받습니다.',
      stats: {
        flightHours: { value: '180h', label: '총 비행시간' },
        stress: { value: '85', label: '스트레스 지수' },
        health: { value: '75', label: '건강 점수' },
        visits: { value: '1회', label: '이용 신청' }
      },
      submittedAt: '2026-01-11 16:45'
    }
  ];

  const filteredPrograms = programs.filter(program =>
    program.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.participant.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'review':
        return 'info';
      default:
        return 'default';
    }
  };

  const handleApprove = (programId) => {
    {/* TODO: Implement approval with Zustand */}
    console.log('Approve program:', programId);
  };

  const handleReject = (programId) => {
    {/* TODO: Implement rejection with Zustand */}
    console.log('Reject program:', programId);
  };

  return (
    <MainContainer>
      <ContentWrapper>
        <PageHeader>
          <div>
            <HeaderBadge>✈️ 관리자 모드</HeaderBadge>
            <PageTitle>건강 프로그램 관리</PageTitle>
            <PageSubtitle>직원들의 건강 프로그램 신청을 관리하고 승인합니다 처리합니다</PageSubtitle>
          </div>
        </PageHeader>

        <ActionBar>
          <ActionButton active>
            📋 승인 대기 <span style={{ 
              background: '#DC2626', 
              color: 'white', 
              borderRadius: '12px', 
              padding: '2px 8px', 
              fontSize: '12px',
              marginLeft: '8px'
            }}>3</span>
          </ActionButton>
          <FilterButton>
            📊 표준별 필터
          </FilterButton>
          <SortButton>
            ⏰ 최신 내역
          </SortButton>
          <SearchBar>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput
              type="text"
              placeholder="이름, 사번, 직급명를 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBar>
          <SortButton>최신순</SortButton>
        </ActionBar>

        {filteredPrograms.length > 0 ? (
          <ProgramList>
            {filteredPrograms.map((program) => (
              <ProgramCard key={program.id}>
                <ProgramHeader>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                    <ParticipantAvatar color={program.participant.avatarColor}>
                      {program.participant.avatar}
                    </ParticipantAvatar>
                    <ParticipantInfo>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                        <ParticipantName>{program.participant.name}</ParticipantName>
                        <ParticipantId>({program.participant.employeeId})</ParticipantId>
                      </div>
                      <ParticipantDepartment>
                        {program.participant.department} · {program.participant.role}
                      </ParticipantDepartment>
                    </ParticipantInfo>
                  </div>
                  <StatusBadge statusType={getStatusColor(program.status)}>
                    {program.statusText}
                  </StatusBadge>
                </ProgramHeader>

                <ProgramContent>
                  <SectionLabel>신청 사유</SectionLabel>
                  <ProgramDescription>{program.description}</ProgramDescription>
                </ProgramContent>

                <StatsGrid>
                  {Object.values(program.stats).map((stat, index) => (
                    <StatItem key={index}>
                      <StatValue>{stat.value}</StatValue>
                      <StatLabel>{stat.label}</StatLabel>
                    </StatItem>
                  ))}
                </StatsGrid>

                <CardFooter>
                  <FooterDate>📅 신청일: {program.submittedAt}</FooterDate>
                  <CardActions>
                    <RejectButton onClick={() => handleReject(program.id)}>
                      ✕ 반려
                    </RejectButton>
                    <ApproveButton onClick={() => handleApprove(program.id)}>
                      ✓ 승인
                    </ApproveButton>
                  </CardActions>
                </CardFooter>
              </ProgramCard>
            ))}
          </ProgramList>
        ) : (
          <EmptyState>
            <EmptyIcon>🔍</EmptyIcon>
            <EmptyText>검색 결과가 없습니다.</EmptyText>
          </EmptyState>
        )}
      </ContentWrapper>
    </MainContainer>
  );
};

export default HealthProgramManagement;