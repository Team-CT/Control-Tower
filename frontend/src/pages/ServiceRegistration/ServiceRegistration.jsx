import React, { useState } from 'react';
import * as S from './ServiceRegistration.styled';

const ServiceRegistration = () => {
  const [formData, setFormData] = useState({
    airlineName: '',
    country: '',
    companyDomain: '',
    managerName: '',
    managerPhone: '',
    managerEmail: '',
    businessLicense: null,
    registrationCert: null,
    additionalInfo: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = () => {
    // TODO: Zustand 액션으로 대체 (항공사 등록 신청 API 호출)
    console.log('Form submitted:', formData);
  };

  return (
    <S.MainContainer>
      <S.PageHeader>
        <S.HeaderIcon>
          <S.BuildingIcon />
        </S.HeaderIcon>
        <S.PageTitle>서비스 가입 신청</S.PageTitle>
        <S.PageSubtitle>항공사 인사담당팀 위한 SkyHR 서비스에 가입하세요</S.PageSubtitle>
      </S.PageHeader>

      <S.ContentWrapper>
        {/* 좌측: 입력 폼 영역 */}
        <S.FormSection>
          {/* Step 1: 항공사 기본 정보 */}
          <S.FormCard>
            <S.StepHeader>
              <S.StepNumber>1</S.StepNumber>
              <S.StepTitle>항공사 기본 정보</S.StepTitle>
            </S.StepHeader>

            <S.FormGrid>
              <S.FormField>
                <S.Label>
                  <S.BuildingSmallIcon />
                  항공사명 <S.Required>*</S.Required>
                </S.Label>
                <S.Input
                  type="text"
                  placeholder="예: 대한항공"
                  value={formData.airlineName}
                  onChange={(e) => handleInputChange('airlineName', e.target.value)}
                />
              </S.FormField>

              <S.FormField>
                <S.Label>
                  <S.GlobeIcon />
                  국가 <S.Required>*</S.Required>
                </S.Label>
                <S.Select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                >
                  <option value="">국가를 선택하세요</option>
                  <option value="KR">대한민국</option>
                  <option value="US">미국</option>
                  <option value="JP">일본</option>
                  {/* TODO: Zustand에서 국가 목록 매핑 */}
                </S.Select>
              </S.FormField>

              <S.FormField $fullWidth>
                <S.Label>
                  <S.DomainIcon />
                  회사 도메인 <S.Required>*</S.Required>
                </S.Label>
                <S.DomainInputWrapper>
                  <S.DomainPrefix>@</S.DomainPrefix>
                  <S.Input
                    type="text"
                    placeholder="예: koreanair.com"
                    value={formData.companyDomain}
                    onChange={(e) => handleInputChange('companyDomain', e.target.value)}
                  />
                </S.DomainInputWrapper>
                <S.HelperText>이메일 도메인 검증에 사용됩니다</S.HelperText>
              </S.FormField>
            </S.FormGrid>
          </S.FormCard>

          {/* Step 2: 담당자 정보 */}
          <S.FormCard>
            <S.StepHeader>
              <S.StepNumber>2</S.StepNumber>
              <S.StepTitle>담당자 정보</S.StepTitle>
            </S.StepHeader>

            <S.FormGrid>
              <S.FormField>
                <S.Label>
                  담당자 이름 <S.Required>*</S.Required>
                </S.Label>
                <S.Input
                  type="text"
                  placeholder="홍길동"
                  value={formData.managerName}
                  onChange={(e) => handleInputChange('managerName', e.target.value)}
                />
              </S.FormField>

              <S.FormField>
                <S.Label>
                  <S.PhoneIcon />
                  담당자 전화번호 <S.Required>*</S.Required>
                </S.Label>
                <S.Input
                  type="tel"
                  placeholder="010-1234-5678"
                  value={formData.managerPhone}
                  onChange={(e) => handleInputChange('managerPhone', e.target.value)}
                />
              </S.FormField>

              <S.FormField $fullWidth>
                <S.Label>
                  <S.EmailIcon />
                  담당자 이메일 <S.Required>*</S.Required>
                </S.Label>
                <S.Input
                  type="email"
                  placeholder="hr.manager@koreanair.com"
                  value={formData.managerEmail}
                  onChange={(e) => handleInputChange('managerEmail', e.target.value)}
                />
                <S.HelperText>설정 또는 계정 로그인 이메일로 사용됩니다</S.HelperText>
              </S.FormField>
            </S.FormGrid>
          </S.FormCard>

          {/* Step 3: 필수 서류 */}
          <S.FormCard>
            <S.StepHeader>
              <S.StepNumber>3</S.StepNumber>
              <S.StepTitle>필수 서류</S.StepTitle>
            </S.StepHeader>
            <S.DocumentDescription>
              항공사 인증을 위해 아래 서류를 업로드해 주세요
            </S.DocumentDescription>

            <S.FormGrid>
              <S.FormField $fullWidth>
                <S.Label>
                  <S.DocumentIcon />
                  사업자등록증 <S.Required>*</S.Required>
                </S.Label>
                <S.FileUploadArea>
                  <S.UploadIcon />
                  <S.UploadText>파일 업로드</S.UploadText>
                  <S.UploadSubtext>PDF, JPG, PNG (최대 10MB)</S.UploadSubtext>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => handleFileUpload('businessLicense', e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </S.FileUploadArea>
              </S.FormField>

              <S.FormField $fullWidth>
                <S.Label>
                  <S.DocumentIcon />
                  재직증명서 <S.Required>*</S.Required>
                </S.Label>
                <S.FileUploadArea>
                  <S.UploadIcon />
                  <S.UploadText>파일 업로드</S.UploadText>
                  <S.UploadSubtext>PDF, JPG, PNG (최대 10MB)</S.UploadSubtext>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => handleFileUpload('registrationCert', e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </S.FileUploadArea>
              </S.FormField>
            </S.FormGrid>
          </S.FormCard>

          {/* Step 4: 추가 정보 (선택) */}
          <S.FormCard>
            <S.StepHeader>
              <S.StepNumber>4</S.StepNumber>
              <S.StepTitle>추가 정보 (선택)</S.StepTitle>
            </S.StepHeader>

            <S.FormField $fullWidth>
              <S.Label>기타 전달 사항</S.Label>
              <S.Textarea
                rows={4}
                placeholder="서비스 이용 목적이나 기타 문의사항을 입력해 주세요"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
              />
            </S.FormField>
          </S.FormCard>
        </S.FormSection>

        {/* 우측: 신청 전 안내사항 */}
        <S.InfoSection>
          <S.InfoCard>
            <S.InfoIcon>📋</S.InfoIcon>
            <S.InfoTitle>신청 전 확인사항</S.InfoTitle>
            <S.InfoList>
              <S.InfoItem>
                • 담당자 이메일은 회사 도메인[@company.com]과 일치해야 합니다
              </S.InfoItem>
              <S.InfoItem>
                • 제출하신 서류는 항공사 인증 목적으로만 사용됩니다
              </S.InfoItem>
              <S.InfoItem>
                • 신청 검토는 1-2 영업일 소요되며, 결과는 이메일로 안내됩니다
              </S.InfoItem>
              <S.InfoItem>
                • 승인 후 계정 활성화 안내와 함께 초기 ID 및 임시비밀번호를 발송해 드립니다
              </S.InfoItem>
            </S.InfoList>
          </S.InfoCard>

          <S.SubmitButton onClick={handleSubmit}>
            가입 신청하기
          </S.SubmitButton>
        </S.InfoSection>
      </S.ContentWrapper>

      <S.Footer>
        <S.Copyright>© 2026 SkyHR. All rights reserved.</S.Copyright>
        <S.FooterLinks>
          <S.FooterLink href="#">항공사 인사관리 특약 동의</S.FooterLink>
        </S.FooterLinks>
      </S.Footer>
    </S.MainContainer>
  );
};

export default ServiceRegistration;