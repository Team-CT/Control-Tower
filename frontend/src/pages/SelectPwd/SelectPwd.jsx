import React, { useState } from 'react';
import { S } from './SelectPwd.styled';
import { useNavigate } from 'react-router-dom';

const FindPassword = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    employeeId: '',
    email: ''
  });

  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSendVerification = (e) => {
    e.preventDefault();
    // TODO: Zustand store action - sendPasswordResetEmail(formData)
    console.log('Send verification email:', formData);
    setVerificationSent(true);
  };

  const handleVerifyAndReset = (e) => {
    e.preventDefault();
    // TODO: Zustand store action - verifyAndResetPassword(formData, verificationCode)
    console.log('Verify code and reset password:', { ...formData, verificationCode });
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <S.Container>
      <S.FindCard>
        <S.CardHeader>
          <S.Title>비밀번호 찾기</S.Title>
          <S.Subtitle>가입 시 입력한 정보를 입력하세요</S.Subtitle>
        </S.CardHeader>

        <S.FindForm onSubmit={verificationSent ? handleVerifyAndReset : handleSendVerification}>
          <S.InputGroup>
            <S.Label>사번</S.Label>
            <S.Input
              type="text"
              name="employeeId"
              placeholder="사번을 입력하세요"
              value={formData.employeeId}
              onChange={handleInputChange}
              disabled={verificationSent}
              required
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>이메일</S.Label>
            <S.Input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleInputChange}
              disabled={verificationSent}
              required
            />
          </S.InputGroup>

          {verificationSent && (
            <S.InputGroup>
              <S.Label>인증 코드</S.Label>
              <S.Input
                type="text"
                name="verificationCode"
                placeholder="이메일로 받은 인증 코드를 입력하세요"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                required
              />
            </S.InputGroup>
          )}

          <S.SubmitButton type="submit">
            {verificationSent ? '비밀번호 재설정' : '이메일 인증'}
          </S.SubmitButton>
        </S.FindForm>

        {verificationSent && (
          <S.InfoMessage>
            인증 메일이 발송되었습니다. 이메일을 확인해주세요.
          </S.InfoMessage>
        )}

        <S.FooterLinks>
          <S.FooterLink onClick={() => handleNavigation('/login')}>
            로그인
          </S.FooterLink>
          <S.Divider>|</S.Divider>
          <S.FooterLink onClick={() => handleNavigation('/find-employee-id')}>
            사번 찾기
          </S.FooterLink>
          <S.Divider>|</S.Divider>
          <S.FooterLink onClick={() => handleNavigation('/register')}>
            회원가입
          </S.FooterLink>
        </S.FooterLinks>
      </S.FindCard>
    </S.Container>
  );
};

export default FindPassword;