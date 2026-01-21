import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './TenantManagement.styled';

const TenantManagement = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');

  // TODO: Zustand state mapping
  const tenants = [
    {
      id: 'KAL-001',
      name: '대한항공',
      plan: 'Enterprise',
      employeeCount: 1250,
      status: 'active',
      icon: '✈️'
    },
    {
      id: 'AAR-002',
      name: '아시아나항공',
      plan: 'Professional',
      employeeCount: 890,
      status: 'active',
      icon: '✈️'
    },
    {
      id: 'SIA-003',
      name: 'Singapore Airlines',
      plan: 'Enterprise',
      employeeCount: 1500,
      status: 'active',
      icon: '✈️'
    },
    {
      id: 'EK-004',
      name: 'Emirates',
      plan: 'Enterprise',
      employeeCount: 2100,
      status: 'payment-pending',
      icon: '✈️'
    },
    {
      id: 'JJA-005',
      name: '제주항공',
      plan: 'Basic',
      employeeCount: 320,
      status: 'inactive',
      icon: '✈️'
    },
    {
      id: 'JAL-006',
      name: 'Japan Airlines',
      plan: 'Professional',
      employeeCount: 980,
      status: 'active',
      icon: '✈️'
    }
  ];

  const handleViewDetail = (tenantId) => {
    navigate(`/tenant/${tenantId}`);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return '정상 서비스 중';
      case 'payment-pending':
        return '결제 중';
      case 'inactive':
        return '미납으로 인한 정지';
      default:
        return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return '✓';
      case 'payment-pending':
        return '⏱';
      case 'inactive':
        return '⚠';
      default:
        return '';
    }
  };

  return (
    <S.MainContainer>
      <S.ContentWrapper>
        <S.PageHeader>
          <S.PageTitle>테넌트 총괄</S.PageTitle>
          <S.PageDescription>
            모든 항공사 테넌트의 현황을 관리하고 모니터링할 수 있습니다.
          </S.PageDescription>
        </S.PageHeader>

        <S.ControlBar>
          <S.SearchInputWrapper>
            <S.SearchIcon>🔍</S.SearchIcon>
            <S.SearchInput
              placeholder="항공사명, 테넌트 ID 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </S.SearchInputWrapper>

          <S.ViewToggle>
            <S.ViewButton
              active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
            >
              ⊞
            </S.ViewButton>
            <S.ViewButton
              active={viewMode === 'list'}
              onClick={() => setViewMode('list')}
            >
              ☰
            </S.ViewButton>
          </S.ViewToggle>
        </S.ControlBar>

        {viewMode === 'grid' ? (
          <S.GridContainer>
            {tenants.map((tenant) => (
              <S.TenantCard key={tenant.id}>
                <S.CardHeader>
                  <S.TenantIcon>{tenant.icon}</S.TenantIcon>
                  <S.TenantName>{tenant.name}</S.TenantName>
                </S.CardHeader>

                <S.CardBody>
                  <S.TenantId>테넌트 ID: {tenant.id}</S.TenantId>
                  <S.PlanBadge plan={tenant.plan}>{tenant.plan}</S.PlanBadge>
                  <S.EmployeeCount>활성 직원 수: {tenant.employeeCount.toLocaleString()}명</S.EmployeeCount>
                </S.CardBody>

                <S.CardFooter>
                  <S.StatusBadge status={tenant.status}>
                    <S.StatusIcon>{getStatusIcon(tenant.status)}</S.StatusIcon>
                    {getStatusText(tenant.status)}
                  </S.StatusBadge>
                  <S.ViewDetailButton onClick={() => handleViewDetail(tenant.id)}>
                    👁 상세보기
                  </S.ViewDetailButton>
                </S.CardFooter>

                <S.CardActions>
                  <S.ActionButton>⋮</S.ActionButton>
                </S.CardActions>
              </S.TenantCard>
            ))}
          </S.GridContainer>
        ) : (
          <S.TableContainer>
            <S.Table>
              <S.TableHead>
                <S.TableRow>
                  <S.TableHeader>항공사</S.TableHeader>
                  <S.TableHeader>테넌트 ID</S.TableHeader>
                  <S.TableHeader>플랜</S.TableHeader>
                  <S.TableHeader>활성 직원 수</S.TableHeader>
                  <S.TableHeader>상태</S.TableHeader>
                  <S.TableHeader>상세보기</S.TableHeader>
                  <S.TableHeader>작업</S.TableHeader>
                </S.TableRow>
              </S.TableHead>
              <S.TableBody>
                {tenants.map((tenant) => (
                  <S.TableRow key={tenant.id}>
                    <S.TableCell>
                      <S.TenantInfo>
                        <S.TenantIconSmall>{tenant.icon}</S.TenantIconSmall>
                        <S.TenantNameText>{tenant.name}</S.TenantNameText>
                      </S.TenantInfo>
                    </S.TableCell>
                    <S.TableCell>{tenant.id}</S.TableCell>
                    <S.TableCell>
                      <S.PlanBadge plan={tenant.plan}>{tenant.plan}</S.PlanBadge>
                    </S.TableCell>
                    <S.TableCell>{tenant.employeeCount.toLocaleString()}명</S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge status={tenant.status}>
                        <S.StatusIcon>{getStatusIcon(tenant.status)}</S.StatusIcon>
                        {getStatusText(tenant.status)}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ViewDetailButtonSmall onClick={() => handleViewDetail(tenant.id)}>
                        👁 상세보기
                      </S.ViewDetailButtonSmall>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ActionButton>⋮</S.ActionButton>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </S.TableBody>
            </S.Table>
          </S.TableContainer>
        )}
      </S.ContentWrapper>
    </S.MainContainer>
  );
};

export default TenantManagement;