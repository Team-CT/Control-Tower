import React, { useState } from 'react';
import {
  MainContainer,
  ContentWrapper,
  LeftPanel,
  RightPanel,
  SectionHeader,
  SectionTitle,
  AddButton,
  CodeGroupCard,
  CodeGroupTitle,
  CodeGroupSubtitle,
  CodeGroupLabel,
  CodeCountBadge,
  SearchInputWrapper,
  SearchIcon,
  SearchInput,
  TableWrapper,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  CodeLink,
  StatusBadge,
  ActionButton,
  EditIcon,
  DeleteIcon
} from './CommonCodeManagement.styled.js';

const CommonCodeManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // TODO: Zustand state mapping
  const codeGroups = [
    {
      id: 1,
      title: '직급',
      subtitle: 'POSITION',
      label: '직원 직급 코드',
      count: 5
    },
    {
      id: 2,
      title: '부서',
      subtitle: 'DEPARTMENT',
      label: '조직 부서 코드',
      count: 5
    },
    {
      id: 3,
      title: '항공기 종류',
      subtitle: 'AIRCRAFT',
      label: '항공기 기종 코드',
      count: 4
    },
    {
      id: 4,
      title: '근무 형태',
      subtitle: 'WORKTYPE',
      label: '근무 유형 코드',
      count: 3
    }
  ];

  // TODO: Zustand state mapping
  const positionCodes = [
    { order: 1, code: 'POS001', name: '기장', nameEn: 'Captain', status: '사용' },
    { order: 2, code: 'POS002', name: '부기장', nameEn: 'First Officer', status: '사용' },
    { order: 3, code: 'POS003', name: '사무장', nameEn: 'Purser', status: '사용' },
    { order: 4, code: 'POS004', name: '승무원', nameEn: 'Flight Attendant', status: '사용' },
    { order: 5, code: 'POS005', name: '정비사', nameEn: 'Mechanic', status: '사용' }
  ];

  const handleAddCodeGroup = () => {
    // TODO: Implement add code group logic
    console.log('Add code group');
  };

  const handleAddCode = () => {
    // TODO: Implement add code logic
    console.log('Add code');
  };

  const handleEditCode = (code) => {
    // TODO: Implement edit code logic
    console.log('Edit code:', code);
  };

  const handleDeleteCode = (code) => {
    // TODO: Implement delete code logic
    console.log('Delete code:', code);
  };

  return (
    <MainContainer>
      <ContentWrapper>
        {/* Left Panel - Code Groups */}
        <LeftPanel>
          <SectionHeader>
            <SectionTitle>코드 그룹</SectionTitle>
            <AddButton onClick={handleAddCodeGroup}>
              + 그룹 추가
            </AddButton>
          </SectionHeader>

          {codeGroups.map((group) => (
            <CodeGroupCard key={group.id}>
              <CodeGroupTitle>{group.title}</CodeGroupTitle>
              <CodeGroupSubtitle>{group.subtitle}</CodeGroupSubtitle>
              <CodeGroupLabel>{group.label}</CodeGroupLabel>
              <CodeCountBadge>{group.count}개 항목</CodeCountBadge>
            </CodeGroupCard>
          ))}
        </LeftPanel>

        {/* Right Panel - Code List */}
        <RightPanel>
          <SectionHeader>
            <SectionTitle>직급</SectionTitle>
            <AddButton onClick={handleAddCode}>
              + 코드 추가
            </AddButton>
          </SectionHeader>

          <CodeGroupLabel style={{ marginBottom: '16px' }}>
            직원 직급 코드
          </CodeGroupLabel>

          <SearchInputWrapper>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput
              type="text"
              placeholder="코드, 코드명, 설명으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchInputWrapper>

          <TableWrapper>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>순서</TableHeaderCell>
                  <TableHeaderCell>코드</TableHeaderCell>
                  <TableHeaderCell>코드명</TableHeaderCell>
                  <TableHeaderCell>설명</TableHeaderCell>
                  <TableHeaderCell>사용여부</TableHeaderCell>
                  <TableHeaderCell>관리</TableHeaderCell>
                </tr>
              </TableHeader>
              <TableBody>
                {positionCodes.map((position) => (
                  <TableRow key={position.code}>
                    <TableCell>{position.order}</TableCell>
                    <TableCell>
                      <CodeLink>{position.code}</CodeLink>
                    </TableCell>
                    <TableCell>{position.name}</TableCell>
                    <TableCell>{position.nameEn}</TableCell>
                    <TableCell>
                      <StatusBadge status={position.status}>
                        {position.status}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      <ActionButton onClick={() => handleEditCode(position.code)}>
                        <EditIcon>✏️</EditIcon>
                      </ActionButton>
                      <ActionButton onClick={() => handleDeleteCode(position.code)}>
                        <DeleteIcon>🗑️</DeleteIcon>
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        </RightPanel>
      </ContentWrapper>
    </MainContainer>
  );
};

export default CommonCodeManagement;