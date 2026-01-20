import React, { useState } from 'react';
import * as S from './AccountActivation.styled';
import InitialSetup from './InitialSetup'; // 초기 설정 컴포넌트 import

const AccountActivation = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState({
    service: false,
    privacy: false,
  });
  const [isActivationComplete, setIsActivationComplete] = useState(false); // 활성화 완료 상태

  // TODO: Zustand state mapping
  const userInfo = {
    email: 'admin@koreanair.com',
    country: '대한민국',
    role: '대한항공',
    activationDate: '2026-01-20 14:30',
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleTermsToggle = (type) => {
    setTermsAgreed(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSubmit = () => {
    // TODO: API 연동 - 계정 활성화 처리
    console.log('Account activation submitted');
    
    // 활성화 완료 후 초기 설정 페이지로 이동
    setIsActivationComplete(true);
  };

  const isFormValid = password && passwordConfirm && 
                      termsAgreed.service && termsAgreed.privacy;

  // 활성화 완료 시 초기 설정 페이지 렌더링
  if (isActivationComplete) {
    return <InitialSetup />;
  }

  return (
    <S.MainContainer>
      <S.ContentWrapper>
        <S.Header>
          <S.StepIndicator>
            <S.Step active>
              <S.StepNumber>1</S.StepNumber>
              <S.StepLabel>계정 활성화</S.StepLabel>
            </S.Step>
            <S.Step>
              <S.StepNumber>2</S.StepNumber>
              <S.StepLabel>추가 설정</S.StepLabel>
            </S.Step>
          </S.StepIndicator>
        </S.Header>

        <S.FormCard>
          <S.IconWrapper>
            <S.ShieldIcon>🛡️</S.ShieldIcon>
          </S.IconWrapper>

          <S.Title>계정 활성화</S.Title>
          <S.Subtitle>
            항공사 관리자 계정을 활성화하고 보안 설정을 완료하세요
          </S.Subtitle>

          {/* Section 1: 본인 확인 정보 */}
          <S.Section>
            <S.SectionHeader>
              <S.SectionNumber>1</S.SectionNumber>
              <S.SectionTitle>본인 확인 정보</S.SectionTitle>
            </S.SectionHeader>

            <S.InfoGrid>
              <S.InfoItem>
                <S.InfoLabel>이메일</S.InfoLabel>
                <S.InfoValue>{userInfo.email}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>항공사명</S.InfoLabel>
                <S.InfoValue>{userInfo.role}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>국가</S.InfoLabel>
                <S.InfoValue>{userInfo.country}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>승인 일시</S.InfoLabel>
                <S.InfoValue>{userInfo.activationDate}</S.InfoValue>
              </S.InfoItem>
            </S.InfoGrid>
          </S.Section>

          {/* Section 2: 비밀번호 설정 */}
          <S.Section>
            <S.SectionHeader>
              <S.SectionNumber>2</S.SectionNumber>
              <S.SectionTitle>비밀번호 설정</S.SectionTitle>
            </S.SectionHeader>

            <S.PasswordField>
              <S.Label>비밀번호</S.Label>
              <S.InputWrapper>
                <S.Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                />
                <S.ToggleButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </S.ToggleButton>
              </S.InputWrapper>
            </S.PasswordField>

            <S.PasswordField>
              <S.Label>비밀번호 확인</S.Label>
              <S.InputWrapper>
                <S.Input
                  type={showPasswordConfirm ? 'text' : 'password'}
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  placeholder="비밀번호를 다시 입력하세요"
                />
                <S.ToggleButton onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
                  {showPasswordConfirm ? '👁️' : '👁️‍🗨️'}
                </S.ToggleButton>
              </S.InputWrapper>
            </S.PasswordField>

            <S.PasswordHint>
              <S.HintTitle>최소 8자 이상</S.HintTitle>
              <S.HintList>
                <S.HintItem>영문 대문자, 소문자 포함</S.HintItem>
                <S.HintItem>숫자 포함</S.HintItem>
                <S.HintItem>특수문자 포함 (!@#$%^&*)</S.HintItem>
              </S.HintList>
            </S.PasswordHint>
          </S.Section>

          {/* Section 3: 약관 동의 */}
          <S.Section>
            <S.SectionHeader>
              <S.SectionNumber>3</S.SectionNumber>
              <S.SectionTitle>약관 동의</S.SectionTitle>
            </S.SectionHeader>

            <S.TermsBox>
              <S.TermItem>
                <S.Checkbox
                  type="checkbox"
                  checked={termsAgreed.service}
                  onChange={() => handleTermsToggle('service')}
                />
                <S.TermLabel>
                  (필수) 서비스 이용약관에 동의합니다
                </S.TermLabel>
                <S.TermLink href="#">📄</S.TermLink>
              </S.TermItem>
              <S.TermDescription>
                항공사 관리자로서 권한과 책임에 대한 내용을 확인하세요
              </S.TermDescription>

              <S.TermItem>
                <S.Checkbox
                  type="checkbox"
                  checked={termsAgreed.privacy}
                  onChange={() => handleTermsToggle('privacy')}
                />
                <S.TermLabel>
                  (필수) 개인정보 처리방침에 동의합니다
                </S.TermLabel>
                <S.TermLink href="#">📄</S.TermLink>
              </S.TermItem>
              <S.TermDescription>
                개인정보 수집, 이용 및 보호에 대한 내용을 확인하세요
              </S.TermDescription>
            </S.TermsBox>
          </S.Section>

          <S.SubmitButton 
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            계정 활성화 완료
          </S.SubmitButton>
        </S.FormCard>
      </S.ContentWrapper>
    </S.MainContainer>
  );
};

export default AccountActivation;