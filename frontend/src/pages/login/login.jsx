import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAirlineTheme } from '../../context/AirlineThemeContext';
import * as S from './Login.styled'; 

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useAirlineTheme();

  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    rememberMe: false
  });

  // 1. 컴포넌트 마운트 시 저장된 아이디 불러오기
  useEffect(() => {
    const savedId = localStorage.getItem('savedId');
    if (savedId) {
      setFormData(prev => ({
        ...prev,
        userId: savedId,
        rememberMe: true 
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 2. 아이디 저장/삭제 로직
    if (formData.rememberMe) {
      localStorage.setItem('savedId', formData.userId);
    } else {
      localStorage.removeItem('savedId');
    }

    console.log('Login attempt:', formData);

    // [수정 포인트] 로그인 성공 시 직책(Role) 저장 및 대시보드 리다이렉션
    let dashboardPath = '/dashboard'; // 기본값: 직원 대시보드
    
    if (formData.userId === 'superadmin') {
      localStorage.setItem('userRole', 'SUPER_ADMIN');
      dashboardPath = '/super-admin-dashboard';
    } else if (formData.userId === 'admin') {
      localStorage.setItem('userRole', 'ADMIN');
      dashboardPath = '/admin-dashboard';
    } else {
      localStorage.setItem('userRole', 'EMP'); // 일반 직원
      dashboardPath = '/dashboard';
    }

    // 역할에 맞는 대시보드로 이동
    navigate(dashboardPath); 
  };

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
            <S.BrandName>{theme.name}</S.BrandName>
          </S.BrandHeader>

          <S.ServiceInfo>
            <S.ServiceTitle>
              <S.ServiceIcon />
              SkyHR
            </S.ServiceTitle>
            <S.ServiceSubtitle>통합 HR 시스템</S.ServiceSubtitle>
            <S.ServiceDescription>
              {theme.name} 임직원을 위한 통합 HR 관리 시스템 입니다. 근태 관리, 전자 결재, 휴가 신청 등 모든 HR 서비스를 한 곳에서 관리하세요.
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
              <S.LoginSubtitle>아이디와 비밀번호를 입력하여 로그인해주세요</S.LoginSubtitle>
            </S.LoginHeader>

            {/* [Form 시작] 입력 필드와 로그인 버튼만 감쌉니다 */}
            <S.LoginForm onSubmit={handleSubmit}>
              <S.InputGroup>
                <S.InputLabel>
                  <S.UserIcon />
                  아이디
                </S.InputLabel>
                <S.Input
                  type="text"
                  name="userId"
                  placeholder="아이디를 입력하세요"
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
                    아이디 저장
                  </S.CheckboxLabel>
                </S.CheckboxWrapper>
              </S.RememberMeRow>

              <S.SubmitButton type="submit">
                로그인
                <S.ArrowIcon />
              </S.SubmitButton>
            </S.LoginForm> 
            {/* [Form 종료] 여기서 닫아주어야 아래 링크들이 submit 영향을 받지 않습니다 */}

            {/* [Form 바깥으로 이동됨] */}
            <S.FooterLinks>
              <S.FooterLink onClick={() => navigate('/register')}>
                <S.HelpIcon />
                회원가입
              </S.FooterLink>
              <S.FooterDivider />
              <S.FooterLink onClick={() => navigate('/find-employee-id')}>
                <S.InfoIcon />
                아이디 찾기
              </S.FooterLink>
              <S.FooterDivider />
              <S.FooterLink onClick={() => navigate('/find-password')}>
                <S.InfoIcon />
                비밀번호 찾기
              </S.FooterLink>
            </S.FooterLinks>

          </S.LoginCard>
        </S.LoginSection>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Login;