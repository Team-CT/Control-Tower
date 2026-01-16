import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageContainer,
  ContentWrapper,
  PageHeader,
  Breadcrumb,
  TitleSection,
  ContentGrid,
  LeftSection,
  RightSection,
  SectionCard,
  CardHeader,
  TypeGrid,
  TypeButton,
  FormGroup,
  Label,
  Input,
  TextArea,
  InfoBox,
  SubmitButton,
  CancelButton,
  ButtonGroup,
  UsageCard,
  UsageHeader,
  ProgressBar,
  ProgressFill,
  StatRow,
  StatItem,
  HistoryList,
  HistoryItem,
  StatusBadge
} from './LeaveApply.styled';

const LeaveApply = () => {
  const navigate = useNavigate();
  const [leaveType, setLeaveType] = useState('ANNUAL'); // ANNUAL | HALF
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.startDate || !formData.endDate) {
      alert("휴가 기간을 선택해주세요.");
      return;
    }
    alert("휴가 신청이 완료되었습니다.");
  };

  // Mock Data
  const usageData = {
    total: 15,
    used: 5,
    remain: 10,
    percent: 33
  };

  const historyData = [
    { id: 1, type: '연차', date: '2025.12.24 - 12.25', status: '승인', days: '2일' },
    { id: 2, type: '반차', date: '2025.11.15 (오전)', status: '승인', days: '0.5일' },
    { id: 3, type: '병가', date: '2025.10.02', status: '반려', days: '1일' },
  ];

  return (
    <PageContainer>
      <PageHeader>
        <TitleSection>
          <h2>휴가 신청</h2>
          <p>원하는 휴가 유형을 선택하고 신청서를 제출하세요.</p>
        </TitleSection>
      </PageHeader>

      <ContentWrapper>
        <ContentGrid>
          {/* 왼쪽: 신청 폼 */}
          <LeftSection>
            {/* 1. 휴가 유형 선택 */}
            <SectionCard>
              <CardHeader>
                <h3>휴가 유형 선택</h3>
              </CardHeader>
              <TypeGrid>
                <TypeButton 
                  $active={leaveType === 'ANNUAL'} 
                  onClick={() => setLeaveType('ANNUAL')}
                >
                  <span className="icon">☀️</span>
                  <div className="text">
                    <strong>연차</strong>
                    <span>잔여 {usageData.remain}일</span>
                  </div>
                  {leaveType === 'ANNUAL' && <div className="check">✔</div>}
                </TypeButton>

                <TypeButton 
                  $active={leaveType === 'HALF'} 
                  onClick={() => setLeaveType('HALF')}
                >
                  <span className="icon">🕐</span>
                  <div className="text">
                    <strong>반차</strong>
                    <span>4시간 사용</span>
                  </div>
                  {leaveType === 'HALF' && <div className="check">✔</div>}
                </TypeButton>
              </TypeGrid>
            </SectionCard>

            {/* 2. 상세 정보 입력 */}
            <SectionCard>
              <CardHeader>
                <h3>신청 정보</h3>
              </CardHeader>
              
              <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
                <FormGroup style={{ flex: 1 }}>
                  <Label>시작일 <span className="req">*</span></Label>
                  <Input 
                    type="date" 
                    name="startDate" 
                    value={formData.startDate} 
                    onChange={handleInputChange} 
                  />
                </FormGroup>
                <FormGroup style={{ flex: 1 }}>
                  <Label>종료일 <span className="req">*</span></Label>
                  <Input 
                    type="date" 
                    name="endDate" 
                    value={formData.endDate} 
                    onChange={handleInputChange} 
                  />
                </FormGroup>
              </div>

              <FormGroup>
                <Label>신청 사유 <span className="req">*</span></Label>
                <TextArea 
                  name="reason"
                  placeholder="휴가 사유를 상세히 입력해주세요 (예: 개인 사정, 병원 진료 등)"
                  rows={5}
                  value={formData.reason}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <InfoBox>
                <strong>ℹ️ 유의사항</strong>
                <ul>
                  <li>휴가는 최소 3일 전에 신청해주세요.</li>
                  <li>긴급한 사유인 경우 관리자에게 별도 연락 바랍니다.</li>
                </ul>
              </InfoBox>

              <ButtonGroup>
                <CancelButton onClick={() => navigate(-1)}>취소</CancelButton>
                <SubmitButton onClick={handleSubmit}>신청하기</SubmitButton>
              </ButtonGroup>
            </SectionCard>
          </LeftSection>

          {/* 오른쪽: 현황 및 내역 */}
          <RightSection>
            {/* 연차 현황 카드 */}
            <UsageCard>
              <UsageHeader>
                <h3>나의 연차 현황</h3>
                <span className="year">2026년 기준</span>
              </UsageHeader>
              
              <div className="chart-area">
                <div className="text-row">
                  <span className="label">사용률</span>
                  <span className="percent">{usageData.percent}%</span>
                </div>
                <ProgressBar>
                  <ProgressFill width={usageData.percent} />
                </ProgressBar>
              </div>

              <StatRow>
                <StatItem>
                  <span className="label">총 연차</span>
                  <span className="value">{usageData.total}</span>
                </StatItem>
                <StatItem>
                  <span className="label">사용</span>
                  <span className="value used">{usageData.used}</span>
                </StatItem>
                <StatItem>
                  <span className="label">잔여</span>
                  <span className="value remain">{usageData.remain}</span>
                </StatItem>
              </StatRow>
            </UsageCard>

            {/* 최근 신청 내역 */}
            <SectionCard>
              <CardHeader>
                <h3>최근 신청 내역</h3>
                <button className="more-btn">더보기</button>
              </CardHeader>
              <HistoryList>
                {historyData.map(item => (
                  <HistoryItem key={item.id}>
                    <div className="info">
                      <div className="top">
                        <span className="type">{item.type}</span>
                        <StatusBadge $status={item.status}>{item.status}</StatusBadge>
                      </div>
                      <span className="date">{item.date} ({item.days})</span>
                    </div>
                  </HistoryItem>
                ))}
              </HistoryList>
            </SectionCard>
          </RightSection>
        </ContentGrid>
      </ContentWrapper>
    </PageContainer>
  );
};

export default LeaveApply;