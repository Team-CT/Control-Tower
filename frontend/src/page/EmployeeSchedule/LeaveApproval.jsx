import React, { useState } from 'react';
import {
  PageLayout,
  MainContentArea,
  PageHeader,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  PageTitle,
  PageDescription,
  ActionHeader,
  CreateButton,
  StatsGrid,
  StatCard,
  StatIcon,
  StatInfo,
  StatLabel,
  StatValue,
  StatSubtext,
  FilterSection,
  FilterTabs,
  FilterTab,
  TabIcon,
  TabLabel,
  SortDropdown,
  ApprovalListSection,
  ListHeader,
  ListTitle,
  SortButton,
  ApprovalList,
  ApprovalItem,
  ApprovalAvatar,
  ApprovalInfo,
  ApprovalName,
  ApprovalDepartment,
  ApprovalDetails,
  ApprovalType,
  ApprovalDate,
  ApprovalPeriod,
  ApprovalActions,
  ViewButton,
  ApproveButton,
  RejectButton,
} from './LeaveApproval.styled';

const LeaveApproval = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data - Replace with Zustand
  const stats = [
    { icon: '📋', label: '대기 중', value: 8, subtext: '신규 요청 +2건', color: '#fef3c7', iconColor: '#f59e0b' },
    { icon: '✓', label: '승인', value: 24, subtext: '승인율 96%', color: '#d1fae5', iconColor: '#10b981' },
    { icon: '⚠', label: '반려', value: 1, subtext: '이번달 반려 2건', color: '#fee2e2', iconColor: '#ef4444' },
    { icon: 'ℹ', label: '최장 대기시간', value: '1.2일', subtext: '평균 8시간', color: '#dbeafe', iconColor: '#0284c7' },
  ];

  const filterTabs = [
    { id: 'all', label: '대기중' },
    { id: 'waiting', label: '승인'},
    { id: 'completed', label: '반려' },
  ];

  const approvalData = [
    { id: 1, name: '이수지', department: '객실 승무원', type: '연차', typeBadge: 'annual', date: '2026-01-25 ~ 2026-01-27 (3일)', period: '대기 사유', avatar: 'SJ', avatarColor: '#3b82f6' },
    { id: 2, name: '김경녀', department: '운항 승무원', type: '반차', typeBadge: 'half', date: '2026-01-22 오전', period: '결재 완료', avatar: 'KN', avatarColor: '#f59e0b', status: 'approved' },
    { id: 3, name: '최유준', department: '정비팀', type: '병가/외출', typeBadge: 'sick', date: '2026-02-03 ~ 2026-02-07 (5일)', period: '대기 의료증명서 검토 필요', avatar: 'YJ', avatarColor: '#8b5cf6' },
    { id: 4, name: '박지현', department: '객실 승무원', type: '연차', typeBadge: 'annual', date: '2026-02-10 ~ 2026-02-14 (5일)', period: '근태 이력', status: 'approved', avatar: 'JH', avatarColor: '#10b981' },
    { id: 5, name: '김태희', department: '운항팀', type: '반차', typeBadge: 'half', date: '2026-01-30 (1일)', period: '대기 결재', avatar: 'TH', avatarColor: '#06b6d4' },
  ];

  // ✅ Router 없이 UI만: 일단 콘솔로 처리
  const handleApprove = (id) => console.log('승인:', id);
  const handleReject = (id) => console.log('반려:', id);
  const handleViewDetail = (id) => console.log('상세 보기:', id);
  const handleCreateRequest = () => console.log('전체 승인 클릭');

  // ✅ (옵션) 탭 눌렀을 때 리스트 필터링 “보이게”만 간단 적용
  const filteredApprovals = approvalData.filter((a) => {
    if (activeFilter === 'waiting') return !a.status || a.status === 'waiting';
    if (activeFilter === 'completed') return a.status === 'approved' || a.status === 'rejected';
    return true; // all
  });

  return (
    <PageLayout>
      <MainContentArea>
        {/* Page Header */}
        <PageHeader>
          <div>
            <Breadcrumb>
              <BreadcrumbItem>홈</BreadcrumbItem>
              <BreadcrumbSeparator>›</BreadcrumbSeparator>
              <BreadcrumbItem>근태 관리</BreadcrumbItem>
              <BreadcrumbSeparator>›</BreadcrumbSeparator>
              <BreadcrumbItem $active>승인 관리</BreadcrumbItem>
            </Breadcrumb>
            <PageTitle>승인 관리</PageTitle>
            <PageDescription>
              팀원들의 휴가 신청을 검토하고 승인하세요 ✈ 승인하기
            </PageDescription>
          </div>

          <ActionHeader>
            <CreateButton onClick={handleCreateRequest}>✈ 전체 승인</CreateButton>
          </ActionHeader>
        </PageHeader>

        {/* Statistics Cards */}
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index} $bgColor={stat.color}>
              <StatIcon $color={stat.iconColor}>{stat.icon}</StatIcon>
              <StatInfo>
                <StatLabel>{stat.label}</StatLabel>
                <StatValue>{stat.value}</StatValue>
                <StatSubtext>{stat.subtext}</StatSubtext>
              </StatInfo>
            </StatCard>
          ))}
        </StatsGrid>

        {/* Filter Section */}
        <FilterSection>
          <FilterTabs>
            {filterTabs.map((tab) => (
              <FilterTab
                key={tab.id}
                $active={activeFilter === tab.id}
                onClick={() => setActiveFilter(tab.id)}
              >
                <TabIcon>{tab.icon}</TabIcon>
                <TabLabel>{tab.label}</TabLabel>
              </FilterTab>
            ))}
          </FilterTabs>

          <SortDropdown>
            <option value="date">전체 분석</option>
            <option value="type">유형별</option>
            <option value="status">상태별</option>
          </SortDropdown>
        </FilterSection>

        {/* Approval List */}
        <ApprovalListSection>
          <ListHeader>
            <ListTitle>📋 승인 대기 목록</ListTitle>
            <SortButton>진행 분석 ⚙</SortButton>
          </ListHeader>

          <ApprovalList>
            {filteredApprovals.map((approval) => (
              <ApprovalItem key={approval.id}>
                <ApprovalAvatar $color={approval.avatarColor}>
                  {approval.avatar}
                </ApprovalAvatar>

                <ApprovalInfo>
                  <ApprovalName>{approval.name}</ApprovalName>
                  <ApprovalDepartment>{approval.department}</ApprovalDepartment>
                </ApprovalInfo>

                <ApprovalDetails>
                  <ApprovalType $type={approval.typeBadge}>{approval.type}</ApprovalType>
                  <ApprovalDate>{approval.date}</ApprovalDate>
                  <ApprovalPeriod>{approval.period}</ApprovalPeriod>
                </ApprovalDetails>

                <ApprovalActions>
                  <ViewButton onClick={() => handleViewDetail(approval.id)}>👁 상세</ViewButton>
                  <ApproveButton onClick={() => handleApprove(approval.id)}>✓ 승인</ApproveButton>
                  <RejectButton onClick={() => handleReject(approval.id)}>✕ 반려</RejectButton>
                </ApprovalActions>
              </ApprovalItem>
            ))}
          </ApprovalList>
        </ApprovalListSection>
      </MainContentArea>
    </PageLayout>
  );
};

export default LeaveApproval;
