import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAirlineTheme } from '../../context/AirlineThemeContext';
import * as S from './Register.styled';

// ✅ service 분리 방식
import { empService } from '../../api/emp/empService';
import { fileService } from '../../api/emp/fileService';

// ✅ 추가: 이메일 인증 백엔드 연결 서비스
import { passwordCodeService } from '../../api/emp/passwordCodeService';

const Register = () => {
  const navigate = useNavigate();
  const { currentAirline, theme } = useAirlineTheme();

  // 현재 단계 (1: 이메일인증, 2: 아이디확인, 3: 정보입력)
  const [step, setStep] = useState(1);

  // 폼 데이터
  const [formData, setFormData] = useState({
    email: '',
    emailCode: '',
    userId: '', // 아이디
    empNo: '', // ✅ 사번
    password: '',
    confirmPassword: '',
    name: '',
    age: '',
    phone: '',
    address: '',
    department: '',
    position: '',
    profileImage: null, // 미리보기용(선택)
    profileImageId: null, // ✅ 업로드 결과 fileId
  });

  // 프로필 이미지 미리보기 URL
  const [profilePreview, setProfilePreview] = useState(null);

  // 각 단계별 인증 완료 여부 (실제 구현 시 활용)
  const [verified, setVerified] = useState({
    email: false,
    userId: false,
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

    // ✅ 전화번호만 자동 포맷
    if (name === 'phone') {
      const formatted = formatPhone(value);
      setFormData((prev) => ({ ...prev, phone: formatted }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatPhone = (raw) => {
    const digits = raw.replace(/\D/g, ''); // 숫자만 남김

    // 010-XXXX-XXXX (최대 11자리만)
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  };

  /* ==========================
   * ✅ 업로드 파일 삭제(회원가입 실패/이전 단계 등)
   * ========================== */
  const deleteUploadedFileIfExists = async () => {
    const fileId = formData.profileImageId;
    if (!fileId) return;

    try {
      await fileService.remove(fileId);
      console.log('🧹 업로드 파일 삭제 완료:', fileId);
    } catch (e) {
      // 최소구현: 삭제 실패해도 UX 깨지지 않게 조용히 넘김
      console.warn('⚠️ 업로드 파일 삭제 실패(무시 가능):', fileId, e);
    } finally {
      setFormData((prev) => ({
        ...prev,
        profileImageId: null,
        profileImage: null,
      }));
      setProfilePreview(null);
    }
  };

  /* ==========================
   * ✅ 프로필 이미지 업로드(선택 시 즉시 업로드 → fileId 저장)
   * ========================== */
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1) 프론트 미리보기
    setFormData((prev) => ({ ...prev, profileImage: file }));

    const reader = new FileReader();
    reader.onloadend = () => setProfilePreview(reader.result);
    reader.readAsDataURL(file);

    // 2) 이미 업로드된 파일이 있으면(교체) 먼저 삭제 시도(선택)
    if (formData.profileImageId) {
      await deleteUploadedFileIfExists();
    }

    // 3) 백엔드 업로드
    try {
      const uploadRes = await fileService.upload(file);
      const fileId = uploadRes.data.fileId;

      setFormData((prev) => ({
        ...prev,
        profileImageId: fileId,
      }));

      console.log('✅ 업로드 성공 fileId=', fileId);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || '이미지 업로드에 실패했습니다.');
      setFormData((prev) => ({ ...prev, profileImageId: null }));
    }
  };

  /* ==========================
   * ✅ [Step 1] 이메일 인증 로직(백엔드 연결)
   * ========================== */
  const handleSendEmailCode = async () => {
    if (!formData.email) return alert('이메일을 입력해주세요.');

    try {
      // ✅ 백엔드로 발송 요청
      await passwordCodeService.send(formData.email);

      alert('인증번호가 발송되었습니다.');

      // ✅ 타이머 리셋 + 시작
      setEmailSecondsLeft(EMAIL_EXPIRE_SECONDS);
      setEmailTimerRunning(true);

      // 입력값/상태 초기화(선택)
      setFormData((prev) => ({ ...prev, emailCode: '' }));
      setVerified((prev) => ({ ...prev, email: false }));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || '인증번호 발송에 실패했습니다.');
    }
  };

  const handleEmailVerify = async () => {
    if (!formData.email) return alert('이메일을 입력해주세요.');
    if (emailSecondsLeft <= 0) return alert('인증번호가 만료되었습니다. 다시 전송해주세요.');
    if (!formData.emailCode) return alert('인증번호를 입력해주세요.');

    try {
      // ✅ 백엔드로 검증 요청
      await passwordCodeService.verify({
        email: formData.email,
        code: formData.emailCode,
      });

      alert('인증이 완료되었습니다.');
      setVerified((prev) => ({ ...prev, email: true }));
      setStep(2);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || '인증번호가 올바르지 않습니다.');
    }
  };

  /* ==========================
   * [Step 2] 아이디 중복 체크 + 사번 preview
   * ========================== */
  const handleUserIdCheck = async () => {
    if (!formData.userId) return alert('아이디를 입력해주세요.');

    try {
      // 1) 아이디 중복 체크
      const idRes = await empService.checkId(formData.userId);
      if (!idRes.data.available) {
        return alert('이미 사용 중인 아이디입니다.');
      }

      // 2) 사번 preview 발급
      const noRes = await empService.previewEmpNo();
      const empNo = noRes.data.emp_no;

      setFormData((prev) => ({
        ...prev,
        empNo,
      }));

      setVerified((prev) => ({ ...prev, userId: true }));
      alert('사용 가능한 아이디입니다.');
      setStep(3);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || '아이디 확인 중 오류가 발생했습니다.');
    }
  };

  /* ==========================
   * [Step 3] 최종 회원가입
   * ========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert('비밀번호가 일치하지 않습니다.');
    }

    // 백엔드 EmpDto.RegisterRequest(JSONProperty)에 맞춰 payload 구성
    const payload = {
      emp_id: formData.userId,
      emp_no: formData.empNo,
      emp_name: formData.name,
      age: Number(formData.age),
      emp_pwd: formData.password,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      profile_image_id: formData.profileImageId, // ✅ 업로드 결과 fileId
    };

    try {
      await empService.register(payload);

      alert(`회원가입이 완료되었습니다.`);
      navigate('/login');
    } catch (err) {
      const status = err.response?.status;
      const data = err.response?.data;

      // ✅ 409 사번 충돌: new_emp_no 내려오면 자동 반영 후 재시도 유도
      if (status === 409 && data?.errors?.new_emp_no) {
        setFormData((prev) => ({
          ...prev,
          empNo: data.errors.new_emp_no,
        }));
        alert('사번이 갱신되었습니다. 다시 가입을 시도해주세요.');
        return;
      }

      // 그 외 실패: 업로드 파일이 있으면 삭제(최소 구현)
      await deleteUploadedFileIfExists();

      alert(data?.message || '회원가입에 실패했습니다.');
    }
  };

  // ✅ Step3에서 "이전 단계"로 돌아갈 때도 파일 정리(선택)
  const handlePrevToStep2 = async () => {
    await deleteUploadedFileIfExists();
    setStep(2);
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
              {step === 1 && '먼저 이메일 인증을 진행해주세요.'}
              {step === 2 && '아이디를 확인하여 본인 인증을 진행합니다.'}
              {step === 3 && '마지막으로 개인정보를 입력하고 항공사를 선택하세요.'}
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
                  <S.InputRow>
                    <S.Input
                      name="emailCode"
                      placeholder="인증번호 6자리"
                      onChange={handleInputChange}
                      value={formData.emailCode}
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

            {/* --- Step 3: 정보 입력 --- */}
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

                  <S.HelperText>
                    JPG, PNG 형식 (최대 5MB), 생략 가능
                    {formData.profileImageId ? ` (업로드 완료: fileId=${formData.profileImageId})` : ''}
                  </S.HelperText>
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

                <S.SubmitButton type="submit">가입 요청하기</S.SubmitButton>

                <S.PrevButton type="button" onClick={handlePrevToStep2}>
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
