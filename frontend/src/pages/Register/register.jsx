import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAirlineTheme } from '../../context/AirlineThemeContext';
import * as S from './Register.styled';

const Register = () => {
  const navigate = useNavigate();
  const { currentAirline, toggleAirline, theme } = useAirlineTheme();

  // 현재 단계 (1: 이메일인증, 2: 아이디확인, 3: 정보입력)
  const [step, setStep] = useState(1);

  // 폼 데이터
  const [formData, setFormData] = useState({
    email: '',
    emailCode: '',
    userId: '', // 아이디
    password: '',
    confirmPassword: '',
    name: '',
    age: '',
    phone: '',
    address: '',
    department: '',
    position: '',
    profileImage: null
  });

  // 프로필 이미지 미리보기 URL
  const [profilePreview, setProfilePreview] = useState(null);

  // 각 단계별 인증 완료 여부 (실제 구현 시 활용)
  const [verified, setVerified] = useState({
    email: false,
    userId: false
  });

  /* ==========================
   * ✅ 이메일 인증번호 타이머 (5분)
   * ========================== */
  const EMAIL_EXPIRE_SECONDS = 300; // 5분
  const [emailSecondsLeft, setEmailSecondsLeft] = useState(0);
  const [emailTimerRunning, setEmailTimerRunning] = useState(false);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (!emailTimerRunning) return;

    // 이미 0이면 종료
    if (emailSecondsLeft <= 0) {
      setEmailTimerRunning(false);
      return;
    }

    const id = setInterval(() => {
      setEmailSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setEmailTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [emailTimerRunning, emailSecondsLeft]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 프로필 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profileImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  /* ==========================
   * [Step 1] 이메일 인증 로직
   * ========================== */
  const handleSendEmailCode = () => {
    if (!formData.email) return alert('이메일을 입력해주세요.');

    // 실제 구현 시: API 성공 콜백에서만 타이머 시작
    alert('인증번호 발송');

    // ✅ 타이머 리셋 + 시작
    setEmailSecondsLeft(EMAIL_EXPIRE_SECONDS);
    setEmailTimerRunning(true);

    // 입력값/상태 초기화(선택)
    setFormData((prev) => ({ ...prev, emailCode: '' }));
    setVerified((prev) => ({ ...prev, email: false }));
  };

  const handleEmailVerify = () => {
    if (!formData.email) return alert('이메일을 입력해주세요.');
    if (emailSecondsLeft <= 0) return alert('인증번호가 만료되었습니다. 다시 전송해주세요.');
    if (!formData.emailCode) return alert('인증번호를 입력해주세요.');

    // 실제로는 API로 인증번호 검증
    alert(`인증 완료 처리됨(테스트)`);
    setVerified(prev => ({ ...prev, email: true }));
    setStep(2);
  };

  /* ==========================
   * [Step 2] 아이디 확인 로직
   * ========================== */
  const handleUserIdCheck = () => {
    if (!formData.userId) return alert('아이디를 입력해주세요.');

    // 실제로는 API로 아이디 유효성 확인
    alert('사용 가능한 아이디입니다.');

    // ✅ 더미 사번 고정 (백엔드 연동 전 임시)
    // 실무 느낌으로 만들고 싶으면 날짜/랜덤을 섞어도 되지만,
    // 지금은 "고정 더미"가 목적이니까 확정값으로 박아두는 게 디버깅에 유리함.
    const dummyEmpNo = '2026-CT-0001';

    setFormData((prev) => ({
      ...prev,
      empNo: dummyEmpNo,
    }));

    setVerified(prev => ({ ...prev, userId: true }));
    setStep(3);
  };

  /* ==========================
   * [Step 3] 최종 회원가입
   * ========================== */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert('비밀번호가 일치하지 않습니다.');
    }

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
        {/* 왼쪽: 브랜드 섹션 */}
        <S.BrandSection>
          <S.BrandHeader>
            <S.LogoIcon />
            <S.BrandName>SkyHR</S.BrandName>
          </S.BrandHeader>

          <S.ServiceInfo>
            <S.ServiceTitle>Register</S.ServiceTitle>
            <S.ServiceDescription>
              {step === 1 && "먼저 이메일 인증을 진행해주세요."}
              {step === 2 && "아이디를 확인하여 본인 인증을 진행합니다."}
              {step === 3 && "마지막으로 개인정보를 입력하고 항공사를 선택하세요."}
            </S.ServiceDescription>
          </S.ServiceInfo>

          {/* 단계 표시기 */}
          <S.Stepper>
            <S.Step $active={step >= 1}>1. 이메일</S.Step>
            <S.StepLine />
            <S.Step $active={step >= 2}>2. 아이디</S.Step>
            <S.StepLine />
            <S.Step $active={step >= 3}>3. 정보</S.Step>
          </S.Stepper>
        </S.BrandSection>

        {/* 오른쪽: 입력 폼 */}
        <S.RegisterSection>
          <S.RegisterCard>
            <S.RegisterHeader>
              <S.RegisterTitle>
                {step === 1 ? '이메일 확인' : step === 2 ? '아이디 중복 확인' : '정보 입력'}
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
                    <S.SmallButton type="button" onClick={handleSendEmailCode}>
                      전송
                    </S.SmallButton>
                  </S.InputRow>
                </S.InputGroup>

                <S.InputGroup>
                  <S.InputLabel>인증번호</S.InputLabel>

                  {/* ✅ 인증번호 인풋 + 타이머 표시 */}
                  <S.InputRow>
                    <S.Input
                      name="emailCode"
                      placeholder="인증번호 6자리"
                      onChange={handleInputChange}
                      value={formData.emailCode}
                      // 선택: 전송 전/만료면 입력 막기
                      disabled={emailSecondsLeft === 0}
                    />

                    <S.TimerBadge $expired={emailSecondsLeft === 0}>
                      {emailSecondsLeft > 0 ? formatTime(emailSecondsLeft) : '만료'}
                    </S.TimerBadge>
                  </S.InputRow>
                </S.InputGroup>

                <S.SubmitButton
                  type="button"
                  onClick={handleEmailVerify}
                  disabled={emailSecondsLeft <= 0}
                >
                  인증 확인 후 다음
                </S.SubmitButton>
              </S.RegisterForm>
            )}

            {/* --- Step 2: 아이디 확인 --- */}
            {step === 2 && (
              <S.RegisterForm>
                <S.InputGroup>
                  <S.InputLabel>아이디 입력</S.InputLabel>
                  <S.Input
                    name="userId"
                    placeholder="아이디를 입력하세요"
                    onChange={handleInputChange}
                    value={formData.userId}
                  />
                </S.InputGroup>

                <S.SubmitButton type="button" onClick={handleUserIdCheck}>
                  아이디 중복 확인
                </S.SubmitButton>

                <S.PrevButton type="button" onClick={() => setStep(1)}>
                  이전 단계
                </S.PrevButton>
              </S.RegisterForm>
            )}

            {/* --- Step 3: 정보 입력 & 항공사 선택 --- */}
            {step === 3 && (
              <S.RegisterForm onSubmit={handleSubmit}>

                <S.InputGroup>
                  <S.InputLabel>이메일</S.InputLabel>
                    <S.Input
                      name="email"
                      value={formData.email}
                      readOnly
                      placeholder="이메일"
                      style={{ background: '#f3f4f6', cursor: 'not-allowed' }}
                    />
                </S.InputGroup>
                <S.RowGroup>
                  <S.InputGroup>
                    <S.InputLabel>아이디</S.InputLabel>
                      <S.Input
                        name="userId"
                        value={formData.userId}
                        readOnly
                        placeholder="아이디"
                        style={{ background: '#f3f4f6', cursor: 'not-allowed' }}
                      />
                </S.InputGroup>
                <S.InputGroup>
                  <S.InputLabel>사번</S.InputLabel>
                  <S.Input
                    name="empNo"
                    value={formData.empNo || '사번 생성 대기'}
                    readOnly
                    placeholder="사번"
                    style={{ background: '#f3f4f6', cursor: 'not-allowed' }}
                  />
                </S.InputGroup>
                </S.RowGroup>
                
                {/* 프로필 이미지 업로드 */}
                <S.InputGroup>
                  <S.InputLabel>프로필 이미지 (선택)</S.InputLabel>
                  <S.ProfileImageSection>
                    <S.ProfileImagePreview>
                      {profilePreview ? (
                        <img src={profilePreview} alt="프로필 미리보기" />
                      ) : (
                        <S.ProfilePlaceholder>👤</S.ProfilePlaceholder>
                      )}
                    </S.ProfileImagePreview>

                    <S.ImageUploadButton
                      type="button"
                      onClick={() => document.getElementById('profileImageInput').click()}
                    >
                      이미지 선택
                    </S.ImageUploadButton>

                    <input
                      id="profileImageInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </S.ProfileImageSection>
                  <S.HelperText>JPG, PNG 형식 (최대 5MB), 생략 가능</S.HelperText>
                </S.InputGroup>

                <S.RowGroup>
                  <S.InputGroup>
                    <S.InputLabel>이름</S.InputLabel>
                    <S.Input
                      name="name"
                      onChange={handleInputChange}
                      value={formData.name}
                      placeholder="실명 입력"
                      required
                    />
                  </S.InputGroup>
                  <S.InputGroup>
                    <S.InputLabel>나이</S.InputLabel>
                    <S.Input
                      name="age"
                      type="number"
                      onChange={handleInputChange}
                      value={formData.age}
                      placeholder="나이"
                      required
                    />
                  </S.InputGroup>
                </S.RowGroup>

                <S.RowGroup>
                  <S.InputGroup>
                    <S.InputLabel>전화번호</S.InputLabel>
                    <S.Input
                      name="phone"
                      type="tel"
                      onChange={handleInputChange}
                      value={formData.phone}
                      placeholder="010-1234-5678"
                      required
                    />
                </S.InputGroup>
                <S.InputGroup>
                  <S.InputLabel>직급</S.InputLabel>
                    <S.Input
                      name="position"
                      onChange={handleInputChange}
                      value={formData.position}
                      placeholder="직급 입력"
                      required
                    />
                </S.InputGroup>
                </S.RowGroup>

                <S.InputGroup>
                  <S.InputLabel>주소</S.InputLabel>
                  <S.Input
                    name="address"
                    onChange={handleInputChange}
                    value={formData.address}
                    placeholder="주소 입력"
                    required
                  />
                </S.InputGroup>

                <S.InputGroup>
                  <S.InputLabel>부서</S.InputLabel>
                  <S.Input
                    name="department"
                    onChange={handleInputChange}
                    value={formData.department}
                    placeholder="부서명 입력"
                    required
                  />
                </S.InputGroup>

                <S.InputGroup>
                  <S.InputLabel>비밀번호</S.InputLabel>
                  <S.Input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    value={formData.password}
                    placeholder="비밀번호"
                    required
                  />
                </S.InputGroup>

                <S.InputGroup>
                  <S.InputLabel>비밀번호 확인</S.InputLabel>
                  <S.Input
                    type="password"
                    name="confirmPassword"
                    onChange={handleInputChange}
                    value={formData.confirmPassword}
                    placeholder="비밀번호 확인"
                    required
                  />
                </S.InputGroup>

                <S.SubmitButton type="submit">
                  가입 요청하기
                </S.SubmitButton>

                <S.PrevButton type="button" onClick={() => setStep(2)}>
                  이전 단계
                </S.PrevButton>
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
