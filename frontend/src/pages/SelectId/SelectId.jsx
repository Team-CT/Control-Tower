import React, { useState } from 'react';
import { S } from './SelectId.styled';
import { useNavigate } from 'react-router-dom';

const FindEmployeeId = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const [foundEmployeeId, setFoundEmployeeId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Zustand store action - findEmployeeId(formData)
    console.log('Find employee ID attempt:', formData);
    // Simulate found result
    // setFoundEmployeeId('EMP12345');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <S.Container>
      <S.FindCard>
        <S.CardHeader>
          <S.Title>아이디 찾기</S.Title>
          <S.Subtitle>가입 시 입력한 정보를 입력하세요</S.Subtitle>
        </S.CardHeader>

        <S.FindForm onSubmit={handleSubmit}>
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
            <S.Label>이메일</S.Label>
            <S.Input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </S.InputGroup>

          <S.SubmitButton type="submit">
            아이디 찾기
          </S.SubmitButton>
        </S.FindForm>

        {foundEmployeeId && (
          <S.ResultSection>
            <S.ResultLabel>찾은 아이디</S.ResultLabel>
            <S.ResultValue>{foundEmployeeId}</S.ResultValue>
          </S.ResultSection>
        )}

        <S.FooterLinks>
          <S.FooterLink onClick={() => handleNavigation('/login')}>
            로그인
          </S.FooterLink>
          <S.Divider>|</S.Divider>
          <S.FooterLink onClick={() => handleNavigation('/find-password')}>
            비밀번호 찾기
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

export default FindEmployeeId;