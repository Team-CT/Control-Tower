import styled from 'styled-components';

export const S = {
  Container: styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #5B9BD5 0%, #70A9DD 100%);
    padding: auto;
    margin: auto;
    overflow: hidden;
  `,

  ContentWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    max-width: 1200px;
    width: 100%;
    height: 100%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    border-radius: 24px;
    overflow: hidden;
    background: transparent;

    @media (max-width: 1024px) {
      flex-direction: column;
      max-width: 480px;
      box-shadow: none;
    }
  `,

  BrandSection: styled.section`
    flex: 1;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(20px);
    padding: 64px 56px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    min-height: 680px;

    @media (max-width: 1024px) {
      padding: 48px 32px;
      min-height: auto;
    }
  `,

  BrandHeader: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
  `,

  LogoIcon: styled.div`
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #00A8E8 0%, #0088CC 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 168, 232, 0.3);

    &::before {
      content: '';
      width: 20px;
      height: 20px;
      background: #FFFFFF;
      border-radius: 50%;
    }
  `,

  BrandName: styled.h2`
    font-size: 20px;
    font-weight: 700;
    color: #FFFFFF;
    margin: 0;
    letter-spacing: 0.05em;
  `,

  ServiceInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,

  ServiceTitle: styled.h1`
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 36px;
    font-weight: 700;
    color: #FFFFFF;
    margin: 0;
    letter-spacing: -0.02em;

    @media (max-width: 1024px) {
      font-size: 28px;
    }
  `,

  ServiceIcon: styled.div`
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: '👥';
      font-size: 20px;
    }
  `,

  ServiceSubtitle: styled.p`
    font-size: 18px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
  `,

  ServiceDescription: styled.p`
    font-size: 15px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
    line-height: 1.7;
  `,

  FeatureList: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 16px;
    list-style: none;
    padding: 0;
    margin: 0;
  `,

  FeatureItem: styled.li`
    display: flex;
    align-items: center;
    gap: 12px;
  `,

  FeatureCheckIcon: styled.div`
    width: 24px;
    height: 24px;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &::before {
      content: '✓';
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 700;
    }
  `,

  FeatureText: styled.span`
    font-size: 15px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.5;
  `,

  LoginSection: styled.section`
    flex: 1;
    background: #FFFFFF;
    padding: 64px 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 680px;

    @media (max-width: 1024px) {
      padding: 48px 32px;
      min-height: auto;
    }
  `,

  LoginCard: styled.article`
    width: 100%;
    max-width: 460px;
  `,

  LoginHeader: styled.header`
    margin-bottom: 40px;

    @media (max-width: 1024px) {
      margin-bottom: 32px;
    }
  `,

  LoginTitle: styled.h2`
    font-size: 32px;
    font-weight: 700;
    color: #1A1A1A;
    margin: 0 0 12px 0;
    letter-spacing: -0.03em;

    @media (max-width: 1024px) {
      font-size: 28px;
    }
  `,

  LoginSubtitle: styled.p`
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
    gap: 24px;
  `,

  InputGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,

  InputLabel: styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #333333;
  `,

  UserIcon: styled.span`
    width: 16px;
    height: 16px;
    background: #5B9BD5;
    border-radius: 2px;
    display: inline-block;
    flex-shrink: 0;
  `,

  LockIcon: styled.span`
    width: 16px;
    height: 16px;
    background: #5B9BD5;
    border-radius: 2px;
    display: inline-block;
    position: relative;
    flex-shrink: 0;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      background: #FFFFFF;
      border-radius: 1px;
    }
  `,

  Input: styled.input`
    width: 100%;
    padding: 14px 16px;
    border: 1px solid #E0E0E0;
    border-radius: 8px;
    font-size: 15px;
    color: #1A1A1A;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &::placeholder {
      color: #AAAAAA;
    }

    &:focus {
      outline: none;
      border-color: #5B9BD5;
      box-shadow: 0 0 0 3px rgba(91, 155, 213, 0.12);
    }

    &:hover:not(:focus) {
      border-color: #B8B8B8;
    }

    @media (max-width: 1024px) {
      font-size: 14px;
    }
  `,

  RememberMeRow: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -8px;
  `,

  CheckboxWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  Checkbox: styled.input`
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #5B9BD5;
  `,

  CheckboxLabel: styled.label`
    font-size: 14px;
    color: #666666;
    cursor: pointer;
    user-select: none;
  `,

  ForgotPasswordLink: styled.a`
    font-size: 14px;
    color: #5B9BD5;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #4A8AC4;
      text-decoration: underline;
    }
  `,

  SubmitButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 16px 20px;
    background: #5B9BD5;
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 8px;

    &:hover {
      background: #4A8AC4;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(91, 155, 213, 0.35);
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

  ArrowIcon: styled.span`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: '→';
      font-size: 20px;
      line-height: 1;
    }
  `,

  FooterLinks: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 8px;
  `,

  FooterLink: styled.a`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #666666;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #5B9BD5;
    }
  `,

  FooterDivider: styled.span`
    width: 1px;
    height: 12px;
    background: #E0E0E0;
  `,

  HelpIcon: styled.span`
    width: 16px;
    height: 16px;
    background: #E0E0E0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: '📝';
      font-size: 10px;
    }
  `,

  InfoIcon: styled.span`
    width: 16px;
    height: 16px;
    background: #E0E0E0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: 'ℹ';
      font-size: 12px;
      color: #666666;
    }
  `
};