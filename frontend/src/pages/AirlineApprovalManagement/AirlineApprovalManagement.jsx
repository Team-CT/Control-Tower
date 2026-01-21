import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Building2, CheckCircle, XCircle, Mail, Phone, 
  Calendar, FileText, Search, Filter
} from 'lucide-react';

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

const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: var(--bg-hover);
  }
  
  ${props => props.$active && `
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  `}
`;

const ApprovalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ApprovalCard = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 20px;
`;

const AirlineInfo = styled.div`
  flex: 1;
`;

const AirlineName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  
  ${props => props.$status === 'pending' && `
    background: #FFF3CD;
    color: #856404;
  `}
  
  ${props => props.$status === 'approved' && `
    background: #D4EDDA;
    color: #155724;
  `}
  
  ${props => props.$status === 'rejected' && `
    background: #F8D7DA;
    color: #721C24;
  `}
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-secondary);
`;

const DetailLabel = styled.span`
  font-weight: 500;
  color: var(--text-primary);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.$approve && `
    background: #50C878;
    color: white;
    &:hover {
      background: #45B369;
    }
  `}
  
  ${props => props.$reject && `
    background: #FF6B6B;
    color: white;
    &:hover {
      background: #E85C5C;
    }
  `}
  
  ${props => props.$view && `
    background: var(--bg-main);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    &:hover {
      background: var(--bg-hover);
    }
  `}
`;

const AirlineApprovalManagement = () => {
  const [filter, setFilter] = useState('pending'); // 'all', 'pending', 'approved', 'rejected'
  const [searchQuery, setSearchQuery] = useState('');
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  // TODO: Zustand state mapping
  const approvalRequests = [
    {
      id: 1,
      airlineName: '아시아나항공',
      country: '대한민국',
      domain: 'flyasiana.com',
      airlineAddress: '서울시 강서구 하늘길 112',
      mainNumber: '1588-8000',
      theme: {
        mainColor: '#E31E24',
        subColor: '#8B0000'
      },
      description: '아시아나항공 HR 시스템 도입 신청',
      managerName: '김철수',
      managerEmail: 'manager@flyasiana.com',
      managerPhone: '02-1234-5678',
      submittedDate: '2026-01-18',
      status: 'pending'
    },
    {
      id: 2,
      airlineName: 'Jin Air',
      country: '대한민국',
      domain: 'jinair.com',
      airlineAddress: '서울시 강서구 공항대로 260',
      mainNumber: '1600-6200',
      theme: {
        mainColor: '#FFD700',
        subColor: '#FFA500'
      },
      description: 'Jin Air 인사 관리 시스템 가입',
      managerName: '이영희',
      managerEmail: 'hr@jinair.com',
      managerPhone: '02-2345-6789',
      submittedDate: '2026-01-19',
      status: 'pending'
    },
    {
      id: 3,
      airlineName: 'T\'way Air',
      country: '대한민국',
      domain: 'twayair.com',
      airlineAddress: '서울시 강서구 하늘길 38',
      mainNumber: '1688-8686',
      theme: {
        mainColor: '#E30613',
        subColor: '#990000'
      },
      description: 'T\'way Air HR 솔루션 도입',
      managerName: '박민수',
      managerEmail: 'admin@twayair.com',
      managerPhone: '02-3456-7890',
      submittedDate: '2026-01-20',
      status: 'pending'
    }
  ];

  const handleApprove = (id) => {
    // TODO: Zustand action - approveAirline(id)
    console.log('Approve airline:', id);
  };

  const handleReject = (airline) => {
    setSelectedAirline(airline);
    setRejectModalOpen(true);
  };

  const handleRejectConfirm = () => {
    if (!rejectReason.trim()) {
      alert('반려 사유를 입력해주세요.');
      return;
    }
    // TODO: Zustand action - rejectAirline(selectedAirline.id, rejectReason)
    console.log('Reject airline:', selectedAirline.id, 'Reason:', rejectReason);
    setRejectModalOpen(false);
    setRejectReason('');
    setSelectedAirline(null);
  };

  const handleViewDetails = (id) => {
    // TODO: Navigate to detail page or open modal
    console.log('View details:', id);
  };

  const filteredRequests = approvalRequests.filter(request => {
    const matchesFilter = filter === 'all' || request.status === filter;
    const matchesSearch = request.airlineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.managerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <MainContainer>
      <Header>
        <Title>항공사 승인 관리</Title>
        <Subtitle>항공사 가입 신청 검토 및 승인 처리</Subtitle>
      </Header>

      <FilterBar>
        <SearchInput
          type="text"
          placeholder="항공사명 또는 이메일로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FilterButton 
          $active={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          전체
        </FilterButton>
        <FilterButton 
          $active={filter === 'pending'}
          onClick={() => setFilter('pending')}
        >
          대기 중
        </FilterButton>
        <FilterButton 
          $active={filter === 'approved'}
          onClick={() => setFilter('approved')}
        >
          승인됨
        </FilterButton>
        <FilterButton 
          $active={filter === 'rejected'}
          onClick={() => setFilter('rejected')}
        >
          반려됨
        </FilterButton>
      </FilterBar>

      <ApprovalList>
        {filteredRequests.map(request => (
          <ApprovalCard key={request.id}>
            <CardHeader>
              <AirlineInfo>
                <AirlineName>
                  <Building2 size={20} />
                  {request.airlineName}
                </AirlineName>
              </AirlineInfo>
              <StatusBadge $status={request.status}>
                {request.status === 'pending' && '승인 대기'}
                {request.status === 'approved' && '승인 완료'}
                {request.status === 'rejected' && '반려됨'}
              </StatusBadge>
            </CardHeader>

            <DetailGrid>
              <DetailItem>
                <Mail size={16} />
                <DetailLabel>이메일:</DetailLabel> {request.managerEmail}
              </DetailItem>
              <DetailItem>
                <Phone size={16} />
                <DetailLabel>전화번호:</DetailLabel> {request.managerPhone}
              </DetailItem>
              <DetailItem>
                <Building2 size={16} />
                <DetailLabel>도메인:</DetailLabel> @{request.domain}
              </DetailItem>
              <DetailItem>
                <Calendar size={16} />
                <DetailLabel>신청일:</DetailLabel> {request.submittedDate}
              </DetailItem>
              <DetailItem>
                <Building2 size={16} />
                <DetailLabel>주소:</DetailLabel> {request.airlineAddress}
              </DetailItem>
              <DetailItem>
                <Phone size={16} />
                <DetailLabel>대표번호:</DetailLabel> {request.mainNumber}
              </DetailItem>
              <DetailItem style={{ gridColumn: 'span 2' }}>
                <DetailLabel>테마 컬러:</DetailLabel>
                <ThemeColorBox>
                  <ColorSwatch $color={request.theme.mainColor} />
                  <span>{request.theme.mainColor}</span>
                  <ColorSwatch $color={request.theme.subColor} />
                  <span>{request.theme.subColor}</span>
                </ThemeColorBox>
              </DetailItem>
              {request.description && (
                <DetailItem style={{ gridColumn: 'span 2' }}>
                  <DetailLabel>설명:</DetailLabel> {request.description}
                </DetailItem>
              )}
            </DetailGrid>

            {request.status === 'pending' && (
              <ActionButtons>
                <Button $view onClick={() => handleViewDetails(request.id)}>
                  <FileText size={16} />
                  상세 보기
                </Button>
                <Button $reject onClick={() => handleReject(request)}>
                  <XCircle size={16} />
                  반려
                </Button>
                <Button $approve onClick={() => handleApprove(request.id)}>
                  <CheckCircle size={16} />
                  승인
                </Button>
              </ActionButtons>
            )}
          </ApprovalCard>
        ))}
      </ApprovalList>
    </MainContainer>
  );
};

export default AirlineApprovalManagement;
