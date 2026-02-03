import React from 'react';
import * as S from './Footer.styled';
import { useAirlineTheme } from '../../context/AirlineThemeContext';

const Footer = () => {
  const { theme, isControlTower } = useAirlineTheme();
  
  // 회사명 표시 로직: Control Tower일 경우 시스템명 표시, 항공사일 경우 항공사명 표시
  const displayCompanyName = isControlTower ? 'Control Tower System' : `(주)${theme.airline.name}`;

  return (
    <S.FooterContainer>
      <S.FooterContent>
        {/* 왼쪽: 회사 정보 영역 */}
        <S.LeftSection>
          <S.CompanyName>{displayCompanyName}</S.CompanyName>
          
          <S.InfoRow>
            <S.InfoItem>대표이사 : 조원태, 우기홍</S.InfoItem>
            <S.InfoItem>사업자등록번호 : 110-81-14794</S.InfoItem>
            <S.InfoItem>통신판매업신고 : 강서 제 16-3010호</S.InfoItem>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoItem>주소 : 서울특별시 강서구 하늘길 260</S.InfoItem>
            <S.InfoItem>대표전화 : 1588-2001</S.InfoItem>
            <S.InfoItem>개인정보보호책임자 : 개인정보보호팀장</S.InfoItem>
          </S.InfoRow>

          <S.Copyright>
            © 1997-2026 {theme.airline.name.toUpperCase()}. All Rights Reserved.
          </S.Copyright>
        </S.LeftSection>

        {/* 오른쪽: 약관 및 링크 영역 */}
        <S.RightSection>
          <S.LinkItem $bold>개인정보처리방침</S.LinkItem>
          <S.LinkItem>이용약관</S.LinkItem>
          <S.LinkItem>법적고지</S.LinkItem>
          <S.LinkItem>사이버보안센터</S.LinkItem>
          <S.LinkItem>사이트맵</S.LinkItem>
        </S.RightSection>

      </S.FooterContent>
    </S.FooterContainer>
  );
};

export default Footer;