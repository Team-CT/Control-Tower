import styled from 'styled-components';

export const S = {
  Container: styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
   
    min-height: 100vh;
    background: linear-gradient(117deg, #EFF6FF 0%, #E0E7FF 100%);
    padding: 40px 20px;
    margin: 0;
  `,

  RegisterCard: styled.article`
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0px 8px 10px -6px rgba(0, 0, 0, 0.1), 
                0px 20px 25px -5px rgba(0, 0, 0, 0.1);
    padding: 48px 56px;
    width: 100%;

    max-width: 720px;

    @media (max-width: 1024px) {
      max-width: 860px;
      padding: 32px 32px;
    }
  `,

  CardHeader: styled.header`
    text-align: center;
    margin-bottom: 48px;

    @media (max-width: 1024px) {
      margin-bottom: 32px;
    }
  `,

  Title: styled.h1`
    font-size: 36px;
    font-weight: 700;
    color: #1D2838;
    margin: 0 0 12px 0;
    letter-spacing: -0.02em;

    @media (max-width: 1024px) {
      font-size: 30px;
    }
  `,

  Subtitle: styled.p`
    font-size: 18px;
    font-weight: 400;
    color: #495565;
    margin: 0;
    line-height: 1.5;

    @media (max-width: 1024px) {
      font-size: 16px;
    }
  `,

  RegisterForm: styled.form`
    display: flex;
    flex-direction: column;
    gap: 28px;
  `,

  FormRow: styled.div`
    display: flex;
    gap: 24px;
    width: 100%;

    @media (max-width: 1024px) {
      flex-direction: column;
      gap: 24px;
    }
  `,

  InputGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    min-width: 0;
  `,

  Label: styled.label`
    font-size: 15px;
    font-weight: 400;
    color: #0A0A0A;
    line-height: 1;

    @media (max-width: 1024px) {
      font-size: 14px;
    }
  `,

  InputWrapper: styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
  `,

  Input: styled.input`
    flex: 1;
    padding: 12px 16px;
    background: #F3F3F5;
    border: 1px solid transparent;
    border-radius: 8px;
    font-size: 15px;
    color: #0A0A0A;
    transition: all 0.2s ease;

    &::placeholder {
      color: #717182;
    }

    &:focus {
      outline: none;
      border-color: #0284C7;
      background: #FFFFFF;
      box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
    }

    &:hover:not(:focus) {
      background: #EBEBED;
    }

    @media (max-width: 1024px) {
      font-size: 14px;
    }
  `,

  VerifyButton: styled.button`
    padding: 10px 20px;
    background: ${props => props.verified ? '#10B981' : '#0284C7'};
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;

    &:hover {
      background: ${props => props.verified ? '#059669' : '#0369A1'};
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
    }

    &:active {
      transform: translateY(0);
    }

    &:disabled {
      background: #CCCCCC;
      cursor: not-allowed;
      transform: none;
    }
  `,

  SubmitButton: styled.button`
    width: 200px;
    padding: 14px 24px;
    background: #0284C7;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    margin: 24px auto 0;
    display: block;

    &:hover {
      background: #0369A1;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(2, 132, 199, 0.35);
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
      width: 160px;
    }
  `,

  Footer: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
  `,

  FooterText: styled.span`
    font-size: 15px;
    font-weight: 400;
    color: #495565;
    line-height: 1.4;

    @media (max-width: 1024px) {
      font-size: 14px;
    }
  `,

  LoginLink: styled.button`
    background: none;
    border: none;
    color: #0284C7;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    padding: 0;
    transition: all 0.2s ease;
    text-decoration: none;

    &:hover {
      color: #0369A1;
      text-decoration: underline;
    }
  `
};