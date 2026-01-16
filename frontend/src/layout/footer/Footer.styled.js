import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  padding: 40px 48px;
  background-color: #f8f9fa; /* 본문보다 살짝 밝거나 어두운 회색 */
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  margin-top: auto; /* 콘텐츠가 짧아도 하단에 위치하도록 설정 */

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

export const FooterContent = styled.div`
  width: 100%;
  max-width: 1600px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 32px;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CompanyName = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #343a40;
  margin: 0;
`;

export const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  font-size: 13px;
  color: #868e96;
  line-height: 1.5;
`;

export const InfoItem = styled.span`
  position: relative;
  
  /* 항목 사이 구분선 (|) */
  &:not(:last-child)::after {
    content: '|';
    display: inline-block;
    margin-left: 8px;
    color: #ced4da;
    font-size: 11px;
    vertical-align: 1px;
  }
`;

export const Copyright = styled.p`
  font-size: 12px;
  color: #adb5bd;
  margin: 12px 0 0 0;
  font-family: sans-serif;
`;

export const RightSection = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 16px;
  }
`;

export const LinkItem = styled.a`
  font-size: 13px;
  color: #495057;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
  
  /* 중요한 링크는 굵게 표시 */
  font-weight: ${props => props.$bold ? '700' : '400'};

  &:hover {
    color: #0055aa; /* 대한항공 블루 */
    text-decoration: underline;
  }
`;