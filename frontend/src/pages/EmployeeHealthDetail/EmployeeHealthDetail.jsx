import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MainContainer,
  ContentWrapper,
  PageHeader,
  BackButton,
  PageHeaderContent,
  PageTitle,
  PageSubtitle,
  HeaderActions,
  ActionButton,
  PrimaryButton,
  EmployeeProfileCard,
  ProfileSection,
  AvatarLarge,
  ProfileInfo,
  ProfileLabel,
  ProfileValue,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  HealthStatusBadge,
  AlertSection,
  AlertBox,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDate,
  SuccessBox,
  SuccessIcon,
  SuccessContent,
  SuccessTitle,
  SuccessDate,
  TabContainer,
  TabList,
  Tab,
  TabContent,
  CheckupCard,
  CheckupHeader,
  CheckupIcon,
  CheckupTitle,
  CheckupDate,
  CheckupDetails,
  DetailRow,
  DetailLabel,
  DetailValue,
  DetailBadge,
  DoctorNote,
  NoteLabel,
  NoteText,
  VitalSignsCard,
  VitalSignsTitle,
  VitalGrid,
  VitalItem,
  VitalIcon,
  VitalLabel,
  VitalValue,
  VitalUnit,
  VitalStatus
} from './EmployeeHealthDetail.styled';

const EmployeeHealthDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('건강 개요');

  {/* TODO: Zustand state mapping */}
  const employeeData = {
    id: 'EMP-2024-0547',
    name: '김민수',
    avatar: '김',
    department: '객실 승무부',
    role: '신임 승무원',
    birthDate: '1985-05-12',
    joinDate: '2015-03-15',
    email: 'minsu.kim@koreanair.com',
    phone: '010-1234-5678',
    address: '서울특별시 강서구 하늘길 260',
    healthStatus: '정상'
  };

  const upcomingCheckup = {
    type: '대한항공 건강검진센터',
    status: '정상',
    date: '2026-01-10',
    daysUntil: 362
  };

  const recentCheckup = {
    date: '2024-10-15',
    status: '완료'
  };

  const vitalSigns = [
    { icon: '📏', label: '키', value: '175', unit: 'cm', status: 'normal' },
    { icon: '⚖️', label: '체중', value: '72', unit: 'kg', status: 'normal' },
    { icon: '📊', label: 'BMI', value: '23.5', unit: '', status: 'warning' },
    { icon: '❤️', label: '심박수', value: '72', unit: 'bpm', status: 'normal' },
    { icon: '🩸', label: '혈압', value: '120/80', unit: 'mmHg', status: 'normal' },
    { icon: '💉', label: '체지방률', value: '18.5', unit: '%', status: 'normal' },
    { icon: '🩺', label: '혈당', value: '95', unit: 'mg/dL', status: 'normal' },
    { icon: '💊', label: '콜레스테롤', value: '185', unit: 'mg/dL', status: 'normal' }
  ];

  const tabs = ['건강 개요', '검진 이력', '예방접종 기록'];

  const handleBack = () => {
    navigate('/employeehealthmanagement');
  };

  return (
    <MainContainer>
      <ContentWrapper>
        <PageHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <BackButton onClick={handleBack}>
              ←
            </BackButton>
            <PageHeaderContent>
              <PageTitle>직원 건강 상세 정보</PageTitle>
              <PageSubtitle>직원의 건강 상태 및 검진 이력을 확인합니다</PageSubtitle>
            </PageHeaderContent>
          </div>
          <HeaderActions>
            <ActionButton>
              📥 건강 기록 제출
            </ActionButton>
            <PrimaryButton>
              ✏️ 정보 수정
            </PrimaryButton>
          </HeaderActions>
        </PageHeader>

        <EmployeeProfileCard>
          <ProfileSection>
            <AvatarLarge>{employeeData.avatar}</AvatarLarge>
            <ProfileInfo>
              <ProfileLabel>이름</ProfileLabel>
              <ProfileValue>{employeeData.name}</ProfileValue>
            </ProfileInfo>
          </ProfileSection>

          <InfoGrid>
            <InfoItem>
              <InfoLabel>사번</InfoLabel>
              <InfoValue>{employeeData.id}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>생년월일</InfoLabel>
              <InfoValue>{employeeData.birthDate}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>건강 상태</InfoLabel>
              <HealthStatusBadge status="normal">
                {employeeData.healthStatus}
              </HealthStatusBadge>
            </InfoItem>
          </InfoGrid>

          <InfoGrid>
            <InfoItem>
              <InfoLabel>부서</InfoLabel>
              <InfoValue>{employeeData.department}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>직급</InfoLabel>
              <InfoValue>{employeeData.role}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>입사일</InfoLabel>
              <InfoValue>{employeeData.joinDate}</InfoValue>
            </InfoItem>
          </InfoGrid>

          <InfoGrid>
            <InfoItem>
              <InfoLabel>📧 이메일</InfoLabel>
              <InfoValue>{employeeData.email}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>📞 연락처</InfoLabel>
              <InfoValue>{employeeData.phone}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>📍 주소</InfoLabel>
              <InfoValue>{employeeData.address}</InfoValue>
            </InfoItem>
          </InfoGrid>
        </EmployeeProfileCard>

        <AlertSection>
          <AlertBox>
            <AlertIcon>⚠️</AlertIcon>
            <AlertContent>
              <AlertTitle>다음 정기 건강검진일: 2026년 1월 10일</AlertTitle>
              <AlertDate>2025-01-14</AlertDate>
            </AlertContent>
          </AlertBox>

          <SuccessBox>
            <SuccessIcon>✅</SuccessIcon>
            <SuccessContent>
              <SuccessTitle>인플루엔자 예방접종 완료</SuccessTitle>
              <SuccessDate>2024-10-15</SuccessDate>
            </SuccessContent>
          </SuccessBox>
        </AlertSection>

        <TabContainer>
          <TabList>
            {tabs.map((tab) => (
              <Tab
                key={tab}
                active={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Tab>
            ))}
          </TabList>

          <TabContent>
            {activeTab === '건강 개요' && (
              <>
                <CheckupCard>
                  <CheckupHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CheckupIcon>🏥</CheckupIcon>
                      <CheckupTitle>최근 건강검진</CheckupTitle>
                    </div>
                    <CheckupDate>{upcomingCheckup.date}</CheckupDate>
                  </CheckupHeader>

                  <CheckupDetails>
                    <DetailRow>
                      <DetailLabel>검진 기관</DetailLabel>
                      <DetailValue>{upcomingCheckup.type}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>종합 소견</DetailLabel>
                      <DetailBadge status="normal">{upcomingCheckup.status}</DetailBadge>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>다음 검진일</DetailLabel>
                      <DetailValue>{upcomingCheckup.date}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>D-Day</DetailLabel>
                      <DetailValue style={{ color: '#1E88E5', fontWeight: 600 }}>
                        {upcomingCheckup.daysUntil}일
                      </DetailValue>
                    </DetailRow>
                  </CheckupDetails>

                  <DoctorNote>
                    <NoteLabel>의사 소견</NoteLabel>
                    <NoteText>
                      모든 검사 항목에서 정상 소견. 정기 건강검진 계속 유지 권장.
                    </NoteText>
                  </DoctorNote>
                </CheckupCard>

                <VitalSignsCard>
                  <VitalSignsTitle>
                    <span style={{ fontSize: '20px' }}>📋</span>
                    신체 측정값
                  </VitalSignsTitle>

                  <VitalGrid>
                    {vitalSigns.map((vital, index) => (
                      <VitalItem key={index}>
                        <VitalIcon>{vital.icon}</VitalIcon>
                        <div style={{ flex: 1 }}>
                          <VitalLabel>{vital.label}</VitalLabel>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            <VitalValue status={vital.status}>{vital.value}</VitalValue>
                            {vital.unit && <VitalUnit>{vital.unit}</VitalUnit>}
                          </div>
                        </div>
                        {vital.status === 'warning' && (
                          <VitalStatus status="warning">과체중</VitalStatus>
                        )}
                      </VitalItem>
                    ))}
                  </VitalGrid>
                </VitalSignsCard>
              </>
            )}

            {activeTab === '검진 이력' && (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                검진 이력 내용이 여기에 표시됩니다.
              </div>
            )}

            {activeTab === '예방접종 기록' && (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                예방접종 기록이 여기에 표시됩니다.
              </div>
            )}
          </TabContent>
        </TabContainer>
      </ContentWrapper>
    </MainContainer>
  );
};

export default EmployeeHealthDetail;