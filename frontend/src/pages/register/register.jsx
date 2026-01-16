import React, { useState } from 'react';
import { S } from './register_styled';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    address: '',
    name: '',
    birthDate: '',
    phoneNumber: '',
    employeeId: ''
  });

  const [verificationStatus, setVerificationStatus] = useState({
    email: false,
    employeeId: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmailVerification = () => {
    // TODO: Zustand store action - verifyEmail(formData.email)
    console.log('Email verification:', formData.email);
    setVerificationStatus(prev => ({ ...prev, email: true }));
  };

  const handleEmployeeIdVerification = () => {
    // TODO: Zustand store action - verifyEmployeeId(formData.employeeId)
    console.log('Employee ID verification:', formData.employeeId);
    setVerificationStatus(prev => ({ ...prev, employeeId: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Zustand store action - registerUser(formData)
    console.log('Registration attempt:', formData);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <S.Container>
      <S.RegisterCard>
        <S.CardHeader>
          <S.Title>회원가입</S.Title>
          <S.Subtitle>새 계정을 만드세요</S.Subtitle>
        </S.CardHeader>

        <S.RegisterForm onSubmit={handleSubmit}>
          <S.FormRow>
            <S.InputGroup>
              <S.Label>이메일</S.Label>
              <S.InputWrapper>
                <S.Input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <S.VerifyButton 
                  type="button"
                  onClick={handleEmailVerification}
                  verified={verificationStatus.email}
                >
                  이메일 확인
                </S.VerifyButton>
              </S.InputWrapper>
            </S.InputGroup>
          </S.FormRow>

          <S.FormRow>
            <S.InputGroup>
              <S.Label>비밀번호</S.Label>
              <S.Input
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>비밀번호 확인</S.Label>
              <S.Input
                type="password"
                name="passwordConfirm"
                placeholder="비밀번호를 다시 입력하세요"
                value={formData.passwordConfirm}
                onChange={handleInputChange}
                required
              />
            </S.InputGroup>
          </S.FormRow>

          <S.FormRow>
            <S.InputGroup>
              <S.Label>주소</S.Label>
              <S.Input
                type="text"
                name="address"
                placeholder="주소를 입력하세요"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </S.InputGroup>
          </S.FormRow>

          <S.FormRow>
            <S.InputGroup>
              <S.Label>이름</S.Label>
              <S.Input
                type="text"
                name="name"
                placeholder="이름을 입력하세요"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>나이(생년월일)</S.Label>
              <S.Input
                type="text"
                name="birthDate"
                placeholder="000000"
                value={formData.birthDate}
                onChange={handleInputChange}
                maxLength={6}
                required
              />
            </S.InputGroup>
          </S.FormRow>

          <S.FormRow>
            <S.InputGroup>
              <S.Label>전화번호</S.Label>
              <S.Input
                type="tel"
                name="phoneNumber"
                placeholder="010-0000-0000"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>사번</S.Label>
              <S.InputWrapper>
                <S.Input
                  type="text"
                  name="employeeId"
                  placeholder="사번을 입력하세요"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  required
                />
                <S.VerifyButton 
                  type="button"
                  onClick={handleEmployeeIdVerification}
                  verified={verificationStatus.employeeId}
                >
                  사번확인
                </S.VerifyButton>
              </S.InputWrapper>
            </S.InputGroup>
          </S.FormRow>

          <S.SubmitButton type="submit">
            회원가입
          </S.SubmitButton>

          <S.Footer>
            <S.FooterText>이미 계정이 있으신가요?</S.FooterText>
            <S.LoginLink onClick={handleLoginRedirect}>
              로그인
            </S.LoginLink>
          </S.Footer>
        </S.RegisterForm>
      </S.RegisterCard>
    </S.Container>
  );
};

export default Register;