import React, { useMemo, useState } from 'react';
import {
  PageLayout,
  MainContentArea,
  PageHeader,
  PageTitle,
  PageDescription,
  ContentGrid,
  LeftColumn,
  RightColumn,
  SectionCard,
  SectionTitle,
  DateRangeSection,
  DateInputGroup,
  DateLabel,
  DateInput,
  ReasonSection,
  ReasonLabel,
  ReasonTextarea,
  InfoBox,
  InfoTitle,
  InfoList,
  InfoItem,
  ActionButtons,
  CancelButton,
  SubmitButton,
  HistoryCard,
  HistoryItem,
  HistoryType,
  HistoryDate,
  HistoryDuration,
  HistoryStatus,

  // ✅ Native Select
  SelectGroup,
  SelectLabel,
  SelectBox,
  SelectHint,
} from './HealthProgramApply.styled';

const HealthProgramApply = () => {
  const [selectedProgramType, setSelectedProgramType] = useState('counseling');
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });

  const programTypes = useMemo(
    () => [
      { id: 'counseling', name: '상담', icon: '🧑‍⚕️', desc: '스트레스 · 심리 · 수면 상담' },
      { id: 'exercise', name: '운동', icon: '🏃‍♀️', desc: '체력 회복 및 운동 관리' },
      { id: 'rest', name: '휴식', icon: '🛌', desc: '컨디션 회복 및 휴식' },
    ],
    []
  );

  const recent = useMemo(
    () => [
      { type: '상담', value: '1건', detail: '2025.11.15 05:18', badge: '승인' },
      { type: '운동', value: '1건', detail: '2025.10.02 - 2025.10.14', badge: '승인' },
      { type: '휴식', value: '1건', detail: '2025.12.26 - 2025.12.28', badge: '승인' },
    ],
    []
  );

  const placeholderMap = useMemo(
    () => ({
      counseling: '상담받고 싶은 내용(업무/스트레스/수면 등)을 적어주세요.',
      exercise: '운동 목표(체력/근력/유산소)와 현재 컨디션을 적어주세요.',
      rest: '휴식이 필요한 사유와 희망 일정(회복 목적)을 적어주세요.',
    }),
    []
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedProgramType) return alert('프로그램 유형을 선택하세요');
    if (!formData.startDate || !formData.endDate) return alert('프로그램 기간을 선택하세요');
    if (!formData.reason.trim()) return alert('신청 사유를 입력하세요');

    console.log('프로그램 신청:', { type: selectedProgramType, ...formData });
  };

  const handleCancel = () => {
    setFormData({ startDate: '', endDate: '', reason: '' });
    setSelectedProgramType('counseling');
  };

  return (
    <PageLayout>
      <MainContentArea>
        <PageHeader>
          <div>
            <PageTitle>건강관리 프로그램 신청</PageTitle>
            <PageDescription>원하는 프로그램 유형을 선택한 후 신청을 제출하세요</PageDescription>
          </div>
        </PageHeader>

        <ContentGrid>
          {/* 왼쪽: 신청 폼 */}
          <LeftColumn>
            <SectionCard>
              <SectionTitle>프로그램 유형 선택</SectionTitle>

              <SelectGroup>
                <SelectLabel htmlFor="programType">프로그램 유형 *</SelectLabel>

                <SelectBox
                  id="programType"
                  value={selectedProgramType}
                  onChange={(e) => setSelectedProgramType(e.target.value)}
                >
                  {programTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.icon} {type.name} · {type.desc}
                    </option>
                  ))}
                </SelectBox>

                <SelectHint>상담 / 운동 / 휴식 중 하나를 선택하세요</SelectHint>
              </SelectGroup>
            </SectionCard>

            <SectionCard>
              <SectionTitle>신청 일정</SectionTitle>

              <DateRangeSection>
                <DateInputGroup>
                  <DateLabel>시작일 *</DateLabel>
                  <DateInput
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </DateInputGroup>

                <DateInputGroup>
                  <DateLabel>종료일 *</DateLabel>
                  <DateInput
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </DateInputGroup>
              </DateRangeSection>
            </SectionCard>

            <SectionCard>
              <ReasonSection>
                <ReasonLabel>신청 사유 *</ReasonLabel>
                <ReasonTextarea
                  name="reason"
                  placeholder={
                    placeholderMap[selectedProgramType] ||
                    '프로그램 신청 사유를 상세히 입력하세요'
                  }
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows={5}
                  required
                />
              </ReasonSection>

              <InfoBox>
                <InfoTitle>ℹ️ 신청 시 유의사항</InfoTitle>
                <InfoList>
                  <InfoItem>• 프로그램은 최소 3일 전에 신청해 주세요</InfoItem>
                  <InfoItem>• 일정 확정 후 변경이 제한될 수 있어요</InfoItem>
                  <InfoItem>• 승인 완료 시 알림으로 안내됩니다</InfoItem>
                </InfoList>
              </InfoBox>

              <ActionButtons>
                <CancelButton type="button" onClick={handleCancel}>
                  취소
                </CancelButton>
                <SubmitButton type="submit" onClick={handleSubmit}>
                  💙 프로그램 신청하기
                </SubmitButton>
              </ActionButtons>
            </SectionCard>
          </LeftColumn>

          {/* 오른쪽: 최근 신청 내역만 */}
          <RightColumn>
            <HistoryCard>
              <SectionTitle>최근 신청 내역</SectionTitle>

              {recent.slice(0, 2).map((item, idx) => (
                <HistoryItem key={idx}>
                  <div>
                    <HistoryType $type={item.type}>{item.type}</HistoryType>
                    <HistoryDate>{item.detail}</HistoryDate>
                    <HistoryDuration>{item.value}</HistoryDuration>
                  </div>
                  <HistoryStatus $status="approved">✓ {item.badge}</HistoryStatus>
                </HistoryItem>
              ))}
            </HistoryCard>
          </RightColumn>
        </ContentGrid>
      </MainContentArea>
    </PageLayout>
  );
};

export default HealthProgramApply;
