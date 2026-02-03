import styled from 'styled-components';

export const S = {
  Container: styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
   
    background: linear-gradient(135deg, ${props => props.theme.primary} 0%, ${props => props.theme.secondary} 100%);
    padding: 40px 20px;
  `,

  LoginWrapper: styled.div`
    width: 100%;
   
    max-width: 520px;
    display: flex;
    justify-content: center;

    @media (max-width: 1024px) {
      max-width: 440px;
    }
  `,

  LoginCard: styled.article`
    background: #FFFFFF;
    border-radius: 20px;
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
    padding: 56px 48px;
    width: 100%;

    @media (max-width: 1024px) {
      padding: 48px 40px;
      border-radius: 16px;
    }
  `,

  CardHeader: styled.header`
    margin-bottom: 40px;
    text-align: left;

    @media (max-width: 1024px) {
      margin-bottom: 32px;
    }
  `,

  Title: styled.h1`
    font-size: 28px;
    font-weight: 700;
    color: #1A1A1A;
    margin: 0 0 12px 0;
    letter-spacing: -0.03em;
    line-height: 1.3;

    @media (max-width: 1024px) {
      font-size: 24px;
      margin-bottom: 8px;
    }
  `,

  Subtitle: styled.p`
    font-size: 15px;
    font-weight: 400;
    color: #666666;
    margin: 0;
    line-height: 1.6;

    @media (max-width: 1024px) {
      font-size: 14px;
    }
  `,

  LoginForm: styled.form`
    display: flex;
    flex-direction: column;
    gap: 28px;

    @media (max-width: 1024px) {
      gap: 24px;
    }
  `,

  InputGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,

  InputLabel: styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 600;
    color: #333333;

    @media (max-width: 1024px) {
      font-size: 14px;
      gap: 8px;
    }
  `,

  UserIdIcon: styled.span`
    width: 18px;
    height: 18px;
    background: ${props => props.theme.primary};
    border-radius: 3px;
    display: inline-block;
    flex-shrink: 0;

    @media (max-width: 1024px) {
      width: 16px;
      height: 16px;
      border-radius: 2px;
    }
  `,

  PasswordIcon: styled.span`
    width: 18px;
    height: 18px;
    background: ${props => props.theme.primary};
    border-radius: 3px;
    display: inline-block;
    position: relative;
    flex-shrink: 0;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 9px;
      height: 9px;
      background: #FFFFFF;
      border-radius: 1.5px;
    }

    @media (max-width: 1024px) {
      width: 16px;
      height: 16px;
      border-radius: 2px;

      &::before {
        width: 8px;
        height: 8px;
        border-radius: 1px;
      }
    }
  `,

  Input: styled.input`
    width: 100%;
    padding: 16px 18px;
    border: 1.5px solid #E0E0E0;
    border-radius: 10px;
    font-size: 15px;
    color: #1A1A1A;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &::placeholder {
      color: #AAAAAA;
    }

    &:focus {
      outline: none;
      border-color: ${props => props.theme.primary};
      box-shadow: 0 0 0 4px ${props => props.theme.primary}20;
    }

    &:hover:not(:focus) {
      border-color: #B8B8B8;
    }

    @media (max-width: 1024px) {
      padding: 14px 16px;
      border-radius: 8px;
      font-size: 14px;
      border-width: 1px;
    }
  `,

  SubmitButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 16px 20px;
    background: ${props => props.theme.primary};
    color: #FFFFFF;
    font-size: 17px;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 12px;

    &:hover {
      background: ${props => props.theme.secondary};
      transform: translateY(-2px);
      box-shadow: 0 6px 20px ${props => props.theme.primary}50;
    }

    &:active {
      transform: translateY(0);
    }

    &:disabled {
      background: #CCCCCC;
      cursor: not-allowed;
      transform: none;
    }

    @media (max-width: 1024px) {
      padding: 14px;
      font-size: 16px;
      border-radius: 8px;
      margin-top: 8px;
      gap: 8px;
    }
  `,

  ArrowIcon: styled.span`
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: '→';
      font-size: 22px;
      line-height: 1;
    }

    @media (max-width: 1024px) {
      width: 20px;
      height: 20px;

      &::after {
        font-size: 20px;
      }
    }
  `
};