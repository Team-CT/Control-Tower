import React, { useState } from 'react';
import * as S from './InitialSetup.styled';
import SetupComplete from './SetupComplete'; // 완료 화면 import

const InitialSetup = () => {
  const [logoFile, setLogoFile] = useState(null);
  const [timezone, setTimezone] = useState('Asia/Seoul (KST, UTC+9)');
  const [department, setDepartment] = useState('본사');
  const [position, setPosition] = useState('');
  const [employeeFile, setEmployeeFile] = useState(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false); // 설정 완료 상태

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      // TODO: 파일 미리보기 처리
    }
  };

  const handleEmployeeFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployeeFile(file);
      // TODO: 파일 유효성 검증
    }
  };

  const handleSubmit = () => {
    // TODO: API 연동 - 초기 설정 완료 처리
    console.log('Initial setup submitted');
    
    // 설정 완료 후 완료 페이지로 이동
    setIsSetupComplete(true);
  };

  // 설정 완료 시 완료 페이지 렌더링
  if (isSetupComplete) {
    return <SetupComplete />;
  }

  return (
    <S.MainContainer>
      <S.ContentWrapper>
        <S.Header>
          <S.StepIndicator>
            <S.Step completed>
              <S.StepNumber>✓</S.StepNumber>
              <S.StepLabel>계정 활성화</S.StepLabel>
            </S.Step>
            <S.Step active>
              <S.StepNumber>2</S.StepNumber>
              <S.StepLabel>초기 설정</S.StepLabel>
            </S.Step>
          </S.StepIndicator>
        </S.Header>

        <S.FormCard>
          <S.IconWrapper>
            <S.Icon>💼</S.Icon>
          </S.IconWrapper>

          <S.Title>항공사 초기 설정</S.Title>
          <S.Subtitle>
            항공사의 기본 정보와 조직 구조를 설정하세요
          </S.Subtitle>

          {/* Section 1: 기본 정보 입력 */}
          <S.Section>
            <S.SectionHeader>
              <S.SectionNumber>1</S.SectionNumber>
              <S.SectionTitle>기본 정보 입력</S.SectionTitle>
            </S.SectionHeader>

            <S.LogoUploadSection>
              <S.Label>항공사 로고</S.Label>
              <S.LogoUploadArea>
                <input
                  type="file"
                  id="logo-upload"
                  accept="image/png, image/jpeg, image/svg+xml"
                  onChange={handleLogoUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="logo-upload">
                  <S.UploadBox>
                    <S.UploadIcon>⬆️</S.UploadIcon>
                    <S.UploadText>
                      {logoFile ? logoFile.name : '로고 이미지'}
                    </S.UploadText>
                  </S.UploadBox>
                </label>
                <S.UploadGuide>
                  <S.GuideTitle>📤 파일 선택</S.GuideTitle>
                  <S.GuideItem>• 권장 크기: 400x400px</S.GuideItem>
                  <S.GuideItem>• 지원 형식: PNG, JPG, SVG</S.GuideItem>
                  <S.GuideItem>• 최대 용량: 5MB</S.GuideItem>
                </S.UploadGuide>
              </S.LogoUploadArea>
            </S.LogoUploadSection>

            <S.InputField>
              <S.Label>
                <S.LabelIcon>🕐</S.LabelIcon>
                기본 시간대
              </S.Label>
              <S.Select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                <option value="Asia/Seoul (KST, UTC+9)">Asia/Seoul (KST, UTC+9)</option>
                <option value="America/New_York (EST, UTC-5)">America/New_York (EST, UTC-5)</option>
                <option value="Europe/London (GMT, UTC+0)">Europe/London (GMT, UTC+0)</option>
                <option value="Asia/Tokyo (JST, UTC+9)">Asia/Tokyo (JST, UTC+9)</option>
              </S.Select>
            </S.InputField>
          </S.Section>

          {/* Section 2: 조직 구조 생성 */}
          <S.Section>
            <S.SectionHeader>
              <S.SectionNumber>2</S.SectionNumber>
              <S.SectionTitle>조직 구조 생성</S.SectionTitle>
            </S.SectionHeader>

            <S.Label>본부 / 지점 목록</S.Label>
            
            <S.DepartmentInputWrapper>
              <S.DepartmentIconWrapper>
                <S.DepartmentIcon>🏢</S.DepartmentIcon>
              </S.DepartmentIconWrapper>
              <S.Input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="본사명 입력"
              />
              <S.AddButton>+ 추가</S.AddButton>
            </S.DepartmentInputWrapper>

            <S.InputField>
              <S.Input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="부서명 입력"
              />
              <S.PositionDropdown>
                <option>지점</option>
                <option>본부</option>
                <option>팀</option>
              </S.PositionDropdown>
            </S.InputField>
          </S.Section>

          {/* Section 3: 직원 초대 / 등록 */}
          <S.Section>
            <S.SectionHeader>
              <S.SectionNumber>3</S.SectionNumber>
              <S.SectionTitle>직원 초대 / 등록</S.SectionTitle>
            </S.SectionHeader>

            <S.Description>
              엑셀 파일을 업로드하여 일괄적 정보를 일괄 등록할 수 있습니다.
            </S.Description>

            <S.BulkUploadInfo>
              <S.InfoIcon>👥</S.InfoIcon>
              <S.InfoTitle>엑셀 대량 등록 방식</S.InfoTitle>
              <S.InfoList>
                <S.InfoItem>• 항목 양식: 이름, 이메일, 부서, 직급</S.InfoItem>
                <S.InfoItem>• 선택 양식: 전화번호, 입사일</S.InfoItem>
              </S.InfoList>
              <S.TemplateButton>템플릿 다운로드</S.TemplateButton>
            </S.BulkUploadInfo>

            <S.FileUploadArea>
              <input
                type="file"
                id="employee-upload"
                accept=".xlsx, .xls, .csv"
                onChange={handleEmployeeFileUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="employee-upload">
                <S.UploadDropZone>
                  <S.UploadIcon>⬆️</S.UploadIcon>
                  <S.UploadMainText>
                    {employeeFile 
                      ? employeeFile.name 
                      : '엑셀 파일을 드래그하거나 클릭하여 업로드'}
                  </S.UploadMainText>
                  <S.UploadSubText>지원 형식 : .xlsx, .xls, .csv</S.UploadSubText>
                </S.UploadDropZone>
              </label>
            </S.FileUploadArea>

            <S.WarningBox>
              <S.WarningIcon>⚠️</S.WarningIcon>
              <S.WarningTitle>주의사항</S.WarningTitle>
              <S.WarningList>
                <S.WarningItem>엑셀 파일의 첫 번째 행은 헤더로 인식됩니다</S.WarningItem>
                <S.WarningItem>이메일 주소는 중복될 수 없습니다</S.WarningItem>
                <S.WarningItem>업로드 후 직원들에게 초기 이메일이 자동 발송됩니다</S.WarningItem>
              </S.WarningList>
            </S.WarningBox>
          </S.Section>

          <S.SubmitButton onClick={handleSubmit}>
            초기 설정 완료
          </S.SubmitButton>
        </S.FormCard>
      </S.ContentWrapper>
    </S.MainContainer>
  );
};

export default InitialSetup;