import React, { useState } from 'react';
import { S } from './login_styled';

const Login = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Zustand store action - authenticateUser(formData)
    console.log('Login attempt:', formData);
  };

  // TODO: Zustand state mapping
  const features = [
    '간편한 근태 관리 및 일정 조회',
    '효율적 급여 관리 프로그램',
    '실시간 통지 승인 시스템',
    '스트레스 없는 쉬운 리포트'
  ];

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.BrandSection>
          <S.BrandHeader>
            <S.LogoIcon />
            <S.BrandName>KOREAN AIR</S.BrandName>
          </S.BrandHeader>

          <S.ServiceInfo>
            <S.ServiceTitle>
              <S.ServiceIcon />
              SkyHR
            </S.ServiceTitle>
            <S.ServiceSubtitle>통합 HR 시스템</S.ServiceSubtitle>
            <S.ServiceDescription>
              대한항공 임직원을 위한 통합 HR 관리 시스템 입니다. 근태 관리, 전자 결재, 휴가 신청 등 모든 HR 서비스를 한 곳에서 관리하세요.
            </S.ServiceDescription>
          </S.ServiceInfo>

          <S.FeatureList>
            {features.map((feature, index) => (
              <S.FeatureItem key={index}>
                <S.FeatureCheckIcon />
                <S.FeatureText>{feature}</S.FeatureText>
              </S.FeatureItem>
            ))}
          </S.FeatureList>
        </S.BrandSection>

        <S.LoginSection>
          <S.LoginCard>
            <S.LoginHeader>
              <S.LoginTitle>로그인</S.LoginTitle>
              <S.LoginSubtitle>사번과 비밀번호를 입력하여 로그인해주세요</S.LoginSubtitle>
            </S.LoginHeader>

            <S.LoginForm onSubmit={handleSubmit}>
              <S.InputGroup>
                <S.InputLabel>
                  <S.UserIcon />
                  사번
                </S.InputLabel>
                <S.Input
                  type="text"
                  name="userId"
                  placeholder="사번을 입력하세요"
                  value={formData.userId}
                  onChange={handleInputChange}
                  required
                />
              </S.InputGroup>

              <S.InputGroup>
                <S.InputLabel>
                  <S.LockIcon />
                  비밀번호
                </S.InputLabel>
                <S.Input
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력하세요"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </S.InputGroup>

              <S.RememberMeRow>
                <S.CheckboxWrapper>
                  <S.Checkbox
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <S.CheckboxLabel htmlFor="rememberMe">
                    로그인 상태 유지
                  </S.CheckboxLabel>
                </S.CheckboxWrapper>
                <S.ForgotPasswordLink>
                  비밀번호 찾기
                </S.ForgotPasswordLink>
              </S.RememberMeRow>

              <S.SubmitButton type="submit">
                로그인
                <S.ArrowIcon />
              </S.SubmitButton>

              <S.FooterLinks>
                <S.FooterLink>
                  <S.HelpIcon />
                  회원가입
                </S.FooterLink>
                <S.FooterDivider />
                <S.FooterLink>
                  <S.InfoIcon />
                  사번 찾기
                </S.FooterLink>
              </S.FooterLinks>
            </S.LoginForm>
          </S.LoginCard>
        </S.LoginSection>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Login;