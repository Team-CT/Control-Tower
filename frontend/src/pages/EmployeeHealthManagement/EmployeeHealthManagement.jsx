import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MainContainer,
  ContentWrapper,
  PageHeader,
  PageTitle,
  PageSubtitle,
  ActionButton,
  SearchSection,
  SearchInputWrapper,
  SearchIcon,
  SearchInput,
  FilterGroup,
  FilterButton,
  FilterDivider,
  EmployeeCount,
  FilterToggle,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  EmployeeInfo,
  EmployeeAvatar,
  EmployeeDetails,
  EmployeeName,
  EmployeeId,
  DepartmentInfo,
  DepartmentName,
  DepartmentRole,
  DateText,
  StatusBadge,
  IconButton,
  Pagination,
  PageInfo,
  PageButton
} from './EmployeeHealthManagement.styled';

const EmployeeHealthManagement = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('전체');
  
  const employees = [
    {
      id: 'EMP-2024-0547',
      name: '김민수',
      avatar: '김',
      department: '객실 승무부',
      role: '신입 승무원',
      joinDate: '2015-03-15',
      lastCheckup: '2025-01-10',
      status: '정상',
      statusType: 'normal'
    },
    {
      id: 'EMP-2021-0214',
      name: '박지현',
      avatar: '박',
      department: '운항 승무부',
      role: '기장',
      joinDate: '2010-07-22',
      lastCheckup: '2025-01-08',
      status: '정상',
      statusType: 'normal'
    },
    {
      id: 'EMP-2022-0862',
      name: '이승진',
      avatar: '이',
      department: '객실 승무부',
      role: '승무원',
      joinDate: '2022-01-10',
      lastCheckup: '2024-12-28',
      status: '주의',
      statusType: 'warning'
    },
    {
      id: 'EMP-2018-0301',
      name: '최영호',
      avatar: '최',
      department: '정비사',
      role: '선임 정비사',
      joinDate: '2014-08-03',
      lastCheckup: '2025-01-05',
      status: '정상',
      statusType: 'normal'
    },
    {
      id: 'EMP-2023-0796',
      name: '정혜나',
      avatar: '정',
      department: '지상직',
      role: '팀장',
      joinDate: '2021-06-01',
      lastCheckup: '2024-11-20',
      status: '결과',
      statusType: 'alert'
    },
    {
      id: 'EMP-2023-0356',
      name: '한소희',
      avatar: '한',
      department: '객실 승무부',
      role: '사무장',
      joinDate: '2015-02-20',
      lastCheckup: '2025-01-12',
      status: '정상',
      statusType: 'normal'
    }
  ];

  const filterOptions = [
    '전체',
    '객실 승무부',
    '운항 승무부',
    '정비사',
    '지상직',
    '정상',
    '주의',
    '결과'
  ];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleDetailClick = () => {
    navigate('/employeehealthdetail');
  };

  return (
    <MainContainer>
      <ContentWrapper>
        <PageHeader>
          <div>
            <PageTitle>직원 건강 관리</PageTitle>
            <PageSubtitle>전체 직원 건강 상태를 조회하고 관리합니다</PageSubtitle>
          </div>
          <ActionButton>
            <span>📥</span>
            건강 보고서 다운로드
          </ActionButton>
        </PageHeader>

        <SearchSection>
          <SearchInputWrapper>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput placeholder="이름, 사번, 부서명 검색..." />
          </SearchInputWrapper>
          
          <FilterGroup>
            {filterOptions.map((filter, index) => (
              <React.Fragment key={filter}>
                <FilterButton
                  active={activeFilter === filter}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                </FilterButton>
                {index === 0 && <FilterDivider />}
              </React.Fragment>
            ))}
          </FilterGroup>
        </SearchSection>

        <EmployeeCount>
          전체 직원 <strong>6명</strong>
          <FilterToggle>
            🔽 필터 초기화
          </FilterToggle>
        </EmployeeCount>

        <TableContainer>
          <TableHeader>
            <TableHeaderCell width="20%">직원 정보</TableHeaderCell>
            <TableHeaderCell width="18%">부서/직급</TableHeaderCell>
            <TableHeaderCell width="14%">입사일</TableHeaderCell>
            <TableHeaderCell width="14%">최근 검진일</TableHeaderCell>
            <TableHeaderCell width="12%">건강 상태</TableHeaderCell>
            <TableHeaderCell width="22%">관리</TableHeaderCell>
          </TableHeader>

          <TableBody>
            {employees.map((employee) => (
              <TableRow 
                key={employee.id}
                onClick={handleDetailClick}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <EmployeeInfo>
                    <EmployeeAvatar color={employee.avatar === '김' ? '#4A90E2' : employee.avatar === '박' ? '#E85D75' : employee.avatar === '이' ? '#52C41A' : employee.avatar === '최' ? '#9C27B0' : employee.avatar === '정' ? '#FF6B35' : '#EC4899'}>
                      {employee.avatar}
                    </EmployeeAvatar>
                    <EmployeeDetails>
                      <EmployeeName>{employee.name}</EmployeeName>
                      <EmployeeId>{employee.id}</EmployeeId>
                    </EmployeeDetails>
                  </EmployeeInfo>
                </td>
                <td>
                  <DepartmentInfo>
                    <DepartmentName>{employee.department}</DepartmentName>
                    <DepartmentRole>{employee.role}</DepartmentRole>
                  </DepartmentInfo>
                </td>
                <td>
                  <DateText>{employee.joinDate}</DateText>
                </td>
                <td>
                  <DateText>{employee.lastCheckup}</DateText>
                </td>
                <td>
                  <StatusBadge type={employee.statusType}>
                    {employee.status}
                  </StatusBadge>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <IconButton 
                      title="상세보기"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDetailClick();
                      }}
                    >
                      👁️
                    </IconButton>
                    <IconButton title="편집" onClick={(e) => e.stopPropagation()}>✏️</IconButton>
                  </div>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>

        <Pagination>
          <PageInfo>1-6 / 총 6명</PageInfo>
          <div style={{ display: 'flex', gap: '8px' }}>
            <PageButton disabled>‹</PageButton>
            <PageButton active>1</PageButton>
            <PageButton disabled>›</PageButton>
          </div>
        </Pagination>
      </ContentWrapper>
    </MainContainer>
  );
};

export default EmployeeHealthManagement;