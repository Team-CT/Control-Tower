import React, { useState } from 'react';
import {
  MainContainer,
  ContentWrapper,
  PageHeader,
  HeaderIcon,
  PageTitle,
  PageDescription,
  FormSection,
  SectionHeader,
  SectionNumber,
  SectionTitle,
  FormGrid,
  FormGroup,
  Label,
  RequiredMark,
  Input,
  Select,
  HelpText,
  FileUploadArea,
  UploadIcon,
  UploadText,
  UploadHint,
  TextArea,
  InfoBox,
  InfoTitle,
  InfoList,
  InfoItem,
  SubmitButton,
  Footer,
  Copyright
} from './ServiceRegistration.styled';

const ServiceRegistration = () => {
  // {/* TODO: Zustand state mapping */}
  const [formData, setFormData] = useState({
    airlineName: '',
    country: '',
    companyDomain: '',
    managerName: '',
    managerPhone: '',
    managerEmail: '',
    businessLicense: null,
    bankStatement: null,
    additionalInfo: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = () => {
    // {/* TODO: API call for service registration */}
    console.log('Form submitted:', formData);
  };

  return (
    <MainContainer>
      <ContentWrapper>
        <PageHeader>
          <HeaderIcon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="9 22 9 12 15 12 15 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </HeaderIcon>
          <PageTitle>서비스 가입 신청</PageTitle>
          <PageDescription>항공사 인사관리를 위한 SkyHR 서비스에 가입하세요</PageDescription>
        </PageHeader>

        {/* Section 1: 항공사 기본 정보 */}
        <FormSection>
          <SectionHeader>
            <SectionNumber>1</SectionNumber>
            <SectionTitle>항공사 기본 정보</SectionTitle>
          </SectionHeader>

          <FormGrid>
            <FormGroup>
              <Label>
                항공사명 <RequiredMark>*</RequiredMark>
              </Label>
              <Input
                type="text"
                placeholder="예: 대한항공"
                value={formData.airlineName}
                onChange={(e) => handleInputChange('airlineName', e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>
                국가 <RequiredMark>*</RequiredMark>
              </Label>
              <Select
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
              >
                <option value="">국가를 선택하세요</option>
                <option value="KR">대한민국</option>
                <option value="US">미국</option>
                <option value="JP">일본</option>
                {/* TODO: Add more countries */}
              </Select>
            </FormGroup>

            <FormGroup fullWidth>
              <Label>
                회사 도메인 <RequiredMark>*</RequiredMark>
              </Label>
              <Input
                type="text"
                placeholder="예: koreanair.com"
                value={formData.companyDomain}
                onChange={(e) => handleInputChange('companyDomain', e.target.value)}
              />
              <HelpText>이메일 도메인 검증에 사용됩니다</HelpText>
            </FormGroup>
          </FormGrid>
        </FormSection>

        {/* Section 2: 담당자 정보 */}
        <FormSection>
          <SectionHeader>
            <SectionNumber>2</SectionNumber>
            <SectionTitle>담당자 정보</SectionTitle>
          </SectionHeader>

          <FormGrid>
            <FormGroup>
              <Label>
                담당자 이름 <RequiredMark>*</RequiredMark>
              </Label>
              <Input
                type="text"
                placeholder="홍길동"
                value={formData.managerName}
                onChange={(e) => handleInputChange('managerName', e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>
                담당자 전화번호 <RequiredMark>*</RequiredMark>
              </Label>
              <Input
                type="tel"
                placeholder="010-1234-5678"
                value={formData.managerPhone}
                onChange={(e) => handleInputChange('managerPhone', e.target.value)}
              />
            </FormGroup>

            <FormGroup fullWidth>
              <Label>
                담당자 이메일 <RequiredMark>*</RequiredMark>
              </Label>
              <Input
                type="email"
                placeholder="hr.manager@koreanair.com"
                value={formData.managerEmail}
                onChange={(e) => handleInputChange('managerEmail', e.target.value)}
              />
              <HelpText>실무 추가 문의시 필요한 연락처를 입력합니다</HelpText>
            </FormGroup>
          </FormGrid>
        </FormSection>

        {/* Section 3: 첨부 서류 */}
        <FormSection>
          <SectionHeader>
            <SectionNumber>3</SectionNumber>
            <SectionTitle>첨부 서류</SectionTitle>
          </SectionHeader>

          <FormGrid>
            <FormGroup fullWidth>
              <Label>
                사업자등록증 <RequiredMark>*</RequiredMark>
              </Label>
              <FileUploadArea>
                <UploadIcon>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 22V10M16 10L11 15M16 10L21 15" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M28 20V26C28 27.1046 27.1046 28 26 28H6C4.89543 28 4 27.1046 4 26V20" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </UploadIcon>
                <UploadText>파일 업로드</UploadText>
                <UploadHint>PDF, JPG, PNG (최대 10MB)</UploadHint>
              </FileUploadArea>
            </FormGroup>

            <FormGroup fullWidth>
              <Label>
                재직증명서 <RequiredMark>*</RequiredMark>
              </Label>
              <FileUploadArea>
                <UploadIcon>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 22V10M16 10L11 15M16 10L21 15" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M28 20V26C28 27.1046 27.1046 28 26 28H6C4.89543 28 4 27.1046 4 26V20" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </UploadIcon>
                <UploadText>파일 업로드</UploadText>
                <UploadHint>PDF, JPG, PNG (최대 10MB)</UploadHint>
              </FileUploadArea>
            </FormGroup>
          </FormGrid>
        </FormSection>

        {/* Section 4: 추가 정보 (선택) */}
        <FormSection>
          <SectionHeader>
            <SectionNumber>4</SectionNumber>
            <SectionTitle>추가 정보 (선택)</SectionTitle>
          </SectionHeader>

          <FormGroup fullWidth>
            <Label>기타 안내 사항</Label>
            <TextArea
              placeholder="서비스 이용 목적이나 기타 문의사항을 입력해 주세요"
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
              rows={4}
            />
          </FormGroup>
        </FormSection>

        {/* 신청 전 확인사항 */}
        <InfoBox>
          <InfoTitle>📋 신청 전 확인사항</InfoTitle>
          <InfoList>
            <InfoItem>• 담당자 이메일로 회사 도메인[@company.com]과 일치하여야 합니다</InfoItem>
            <InfoItem>• 제출하신 서류는 항공사 업종 확인용으로만 사용됩니다</InfoItem>
            <InfoItem>• 신청 완료는 1-2 영업일 소요되며, 결과는 이메일로 안내됩니다</InfoItem>
            <InfoItem>• 승인 후 계정 발급과 팀장과 팀 설정은 상세사항 안내와 함께 제공됩니다</InfoItem>
          </InfoList>
        </InfoBox>

        <SubmitButton onClick={handleSubmit}>
          가입 신청하기
        </SubmitButton>

        <Footer>
          <Copyright>© 2025 SkyHR. All rights reserved.</Copyright>
          <Copyright>항공사 인사관리 통합 플랫폼</Copyright>
        </Footer>
      </ContentWrapper>
    </MainContainer>
  );
};

export default ServiceRegistration;