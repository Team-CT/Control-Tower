import styled from 'styled-components';

export const S = {
  Container: styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(117deg, #EFF6FF 0%, #E0E7FF 100%);
    padding: 0;
    margin: 0;
    overflow: hidden;
  `,

  FindCard: styled.article`
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0px 8px 10px -6px rgba(0, 0, 0, 0.1), 
                0px 20px 25px -5px rgba(0, 0, 0, 0.1);
    padding: 48px 56px 56px;
    width: 100%;
    max-width: 520px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media (max-width: 1024px) {
      max-width: 448px;
      padding: 32px 32px 32px;
    }
  `,

  CardHeader: styled.header`
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
  `,

  Title: styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: #1D2838;
    margin: 0;
    letter-spacing: -0.02em;
    line-height: 1.2;

    @media (max-width: 1024px) {
      font-size: 30px;
    }
  `,

  Subtitle: styled.p`
    font-size: 17px;
    font-weight: 400;
    color: #495565;
    margin: 0;
    line-height: 1.5;

    @media (max-width: 1024px) {
      font-size: 16px;
    }
  `,

  FindForm: styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,

  InputGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
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

  Input: styled.input`
    width: 100%;
    padding: 12px 16px;
    background: #F3F3F5;
    border: 1px solid transparent;
    border-radius: 8px;
    font-size: 15px;
    color: #0A0A0A;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &::placeholder {
      color: #717182;
    }

    &:focus {
      outline: none;
      border-color: #0284C7;
      background: #FFFFFF;
      box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
    }

    &:hover:not(:focus):not(:disabled) {
      background: #EBEBED;
    }

    &:disabled {
      background: #E5E7EB;
      color: #9CA3AF;
      cursor: not-allowed;
    }

    @media (max-width: 1024px) {
      font-size: 14px;
    }
  `,

  SubmitButton: styled.button`
    width: 100%;
    padding: 12px 20px;
    background: #0284C7;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 8px;

    &:hover {
      background: #0369A1;
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(2, 132, 199, 0.3);
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
      font-size: 14px;
    }
  `,

  InfoMessage: styled.div`
    padding: 16px 20px;
    background: #DBEAFE;
    border: 1px solid #0284C7;
    border-radius: 8px;
    color: #0369A1;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    line-height: 1.5;
  `,

  FooterLinks: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 8px;
  `,

  FooterLink: styled.button`
    background: none;
    border: none;
    color: #0284C7;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    padding: 0;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
      color: #0369A1;
      text-decoration: underline;
    }

    @media (max-width: 1024px) {
      font-size: 15px;
    }
  `,

  Divider: styled.span`
    color: #99A1AE;
    font-size: 14px;
    font-weight: 400;
    user-select: none;
  `
};