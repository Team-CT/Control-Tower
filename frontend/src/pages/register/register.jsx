import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAirlineTheme } from '../../context/AirlineThemeContext';
// [수정 포인트] styled.js의 모든 export 요소(*)를 S라는 이름의 객체(as S)로 묶어서 가져옵니다.
import * as S from './Register.styled';

const Register = () => {
  const navigate = useNavigate();
  const { currentAirline, toggleAirline, theme } = useAirlineTheme();
  
  // 현재 단계 (1: 이메일인증, 2: 사번확인, 3: 정보입력)
  const [step, setStep] = useState(1);
  
  // 폼 데이터
  const [formData, setFormData] = useState({
    email: '',
    emailCode: '',
    userId: '', // 사번
    password: '',
    confirmPassword: '',
    name: '',
    department: '',
    position: ''
  });

  // 각 단계별 인증 완료 여부 (실제 구현 시 활용)
  const [verified, setVerified] = useState({
    email: false,
    userId: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // [Step 1] 이메일 인증 로직
  const handleEmailVerify = () => {
    if (!formData.email) return alert('이메일을 입력해주세요.');
    // 실제로는 API 호출 후 인증번호 발송
    alert(`인증번호가 ${formData.email}로 전송되었습니다.\n(테스트: 인증 완료 처리됨)`);
    setVerified(prev => ({ ...prev, email: true }));
    setStep(2); // 다음 단계로 이동
  };

  // [Step 2] 사번 확인 로직
  const handleUserIdCheck = () => {
    if (!formData.userId) return alert('사번을 입력해주세요.');
    // 실제로는 API로 사번 유효성 확인
    alert('사용 가능한 사번입니다.');
    setVerified(prev => ({ ...prev, userId: true }));
    setStep(3); // 다음 단계로 이동
  };

  // [Step 3] 최종 회원가입
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert('비밀번호가 일치하지 않습니다.');
    }
    
    // 최종 데이터 (항공사 정보 포함)
    const finalData = {
      ...formData,
      airline: currentAirline
    };
    
    console.log('최종 가입 요청:', finalData);
    alert(`${theme.name} 소속으로 회원가입 요청되었습니다.\n관리자 승인 후 로그인 가능합니다.`);
    navigate('/login');
  };

  return (
    <S.Container>
      <S.ContentWrapper>
        {/* 왼쪽: 브랜드 섹션 (테마 색상 자동 적용) */}
        <S.BrandSection>
          <S.BrandHeader>
            <S.LogoIcon />
            <S.BrandName>SkyHR</S.BrandName>
          </S.BrandHeader>
          <S.ServiceInfo>
            <S.ServiceTitle>Register</S.ServiceTitle>
            <S.ServiceDescription>
              {step === 1 && "먼저 이메일 인증을 진행해주세요."}
              {step === 2 && "사번을 확인하여 본인 인증을 진행합니다."}
              {step === 3 && "마지막으로 개인정보를 입력하고 항공사를 선택하세요."}
            </S.ServiceDescription>
          </S.ServiceInfo>
          {/* 단계 표시기 (Stepper) */}
          <S.Stepper>
            <S.Step $active={step >= 1}>1. 이메일</S.Step>
            <S.StepLine />
            <S.Step $active={step >= 2}>2. 사번</S.Step>
            <S.StepLine />
            <S.Step $active={step >= 3}>3. 정보</S.Step>
          </S.Stepper>
        </S.BrandSection>

        {/* 오른쪽: 입력 폼 */}
        <S.RegisterSection>
          <S.RegisterCard>
            <S.RegisterHeader>
              <S.RegisterTitle>
                {step === 1 ? '이메일 확인' : step === 2 ? '사번 확인' : '정보 입력'}
              </S.RegisterTitle>
            </S.RegisterHeader>

            {/* --- Step 1: 이메일 인증 --- */}
            {step === 1 && (
              <S.RegisterForm>
                <S.InputGroup>
                  <S.InputLabel>이메일</S.InputLabel>
                  <S.InputRow>
                    <S.Input 
                      name="email" 
                      type="email" 
                      placeholder="example@airline.com" 
                      onChange={handleInputChange} 
                      value={formData.email}
                    />
                    <S.SmallButton type="button" onClick={() => alert('인증번호 발송')}>전송</S.SmallButton>
                  </S.InputRow>
                </S.InputGroup>
                <S.InputGroup>
                  <S.InputLabel>인증번호</S.InputLabel>
                  <S.Input 
                    name="emailCode" 
                    placeholder="인증번호 6자리" 
                    onChange={handleInputChange} 
                    value={formData.emailCode}
                  />
                </S.InputGroup>
                <S.SubmitButton type="button" onClick={handleEmailVerify}>
                  인증 확인 후 다음
                </S.SubmitButton>
              </S.RegisterForm>
            )}

            {/* --- Step 2: 사번 확인 --- */}
            {step === 2 && (
              <S.RegisterForm>
                <S.InputGroup>
                  <S.InputLabel>사번 입력</S.InputLabel>
                  <S.Input 
                    name="userId" 
                    placeholder="사번을 입력하세요" 
                    onChange={handleInputChange} 
                    value={formData.userId}
                  />
                </S.InputGroup>
                <S.SubmitButton type="button" onClick={handleUserIdCheck}>
                  사번 확인 후 다음
                </S.SubmitButton>
                <S.PrevButton type="button" onClick={() => setStep(1)}>이전 단계</S.PrevButton>
              </S.RegisterForm>
            )}

            {/* --- Step 3: 정보 입력 & 항공사 선택 --- */}
            {step === 3 && (
              <S.RegisterForm onSubmit={handleSubmit}>
                {/* 항공사 선택 토글 (가장 중요) */}
                <S.InputGroup>
                  <S.InputLabel>소속 항공사 선택</S.InputLabel>
                  <S.ToggleContainer>
                    <S.ToggleButton 
                      type="button" 
                      $active={currentAirline === 'KE'} 
                      onClick={() => toggleAirline('KE')}
                      $color="#0066CC"
                    >
                      대한항공
                    </S.ToggleButton>
                    <S.ToggleButton 
                      type="button" 
                      $active={currentAirline === 'LJ'} 
                      onClick={() => toggleAirline('LJ')}
                      $color="#9ACD32"
                    >
                      진에어
                    </S.ToggleButton>
                  </S.ToggleContainer>
                  <p style={{fontSize: '12px', color: theme.primary, marginTop: '4px'}}>
                    * 선택 시 테마 색상이 즉시 변경됩니다.
                  </p>
                </S.InputGroup>

                <S.RowGroup>
                  <S.InputGroup>
                    <S.InputLabel>이름</S.InputLabel>
                    <S.Input name="name" onChange={handleInputChange} placeholder="실명 입력" required />
                  </S.InputGroup>
                  <S.InputGroup>
                    <S.InputLabel>직급</S.InputLabel>
                    <S.Input name="position" onChange={handleInputChange} placeholder="직급 입력" required />
                  </S.InputGroup>
                </S.RowGroup>

                 <S.InputGroup>
                    <S.InputLabel>아이디</S.InputLabel>
                    <S.Input name="userId" onChange={handleInputChange} placeholder="아이디 입력" required />
                  </S.InputGroup>
                <S.InputGroup>
                  <S.InputLabel>비밀번호</S.InputLabel>
                  <S.Input type="password" name="password" onChange={handleInputChange} placeholder="비밀번호" required />
                </S.InputGroup>
                <S.InputGroup>
                  <S.InputLabel>비밀번호 확인</S.InputLabel>
                  <S.Input type="password" name="confirmPassword" onChange={handleInputChange} placeholder="비밀번호 확인" required />
                </S.InputGroup>

                <S.SubmitButton type="submit">
                  가입 요청하기
                </S.SubmitButton>
                <S.PrevButton type="button" onClick={() => setStep(2)}>이전 단계</S.PrevButton>
              </S.RegisterForm>
            )}
            
            <S.LoginLink onClick={() => navigate('/login')}>
               로그인 화면으로 돌아가기
            </S.LoginLink>
          </S.RegisterCard>
        </S.RegisterSection>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Register;