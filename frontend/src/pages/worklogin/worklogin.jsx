import React, { useState } from 'react';
import { S } from './WorkLogin.styled';

const AttendanceLogin = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Zustand store action - validateAttendanceLogin(formData)
    console.log('Attendance login attempt:', formData);
  };

  return (
    <>
    <S.Container>
      <S.LoginWrapper>
        <S.LoginCard>
          <S.CardHeader>
            <S.Title>출/퇴근 로그인</S.Title>
            <S.Subtitle>사번과 비밀번호를 입력하여 로그인해주세요</S.Subtitle>
          </S.CardHeader>

          <S.LoginForm onSubmit={handleSubmit}>
            <S.InputGroup>
              <S.InputLabel>
                <S.UserIdIcon />
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
                <S.PasswordIcon />
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

            <S.SubmitButton type="submit">
              로그인
              <S.ArrowIcon />
            </S.SubmitButton>
          </S.LoginForm>
        </S.LoginCard>
      </S.LoginWrapper>
    </S.Container>
    </>
  );
};

export default AttendanceLogin;