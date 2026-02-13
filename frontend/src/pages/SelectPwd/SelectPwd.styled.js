import styled from "styled-components";


const TOKENS = {
  // 배경(페이지)
  pageBg: "linear-gradient(135deg, rgba(17,24,39,0.06) 0%, #ffffff 70%)",

  // 카드/표면
  cardBg: "#ffffff",
  shadow: "0px 8px 10px -6px rgba(0, 0, 0, 0.10), 0px 20px 25px -5px rgba(0, 0, 0, 0.10)",

  // 텍스트
  textPrimary: "#1D2838",
  textSecondary: "#495565",
  textMuted: "#717182",

  // 입력/보더
  inputBg: "#F3F3F5",
  inputHoverBg: "#EBEBED",
  inputDisabledBg: "#E5E7EB",
  inputDisabledText: "#9CA3AF",

  // ✅ 핵심: 액션 컬러(진회색)
  accent: "#111827",
  accentHover: "#0B1220",
  accentSoft: "rgba(17,24,39,0.06)",
  accentBorder: "rgba(17,24,39,0.18)",

  // 링크/디바이더
  divider: "#99A1AE",
};

export const S = {
  Container: styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;

    /* ✅ 옵션 1) 기존 테마 배경 유지(테마 감성 유지) */
    background: linear-gradient(117deg, ${({ theme }) => theme?.hover ?? TOKENS.accentSoft} 0%, #ffffff 100%);

    /* ✅ 옵션 2) 테마 의존 제거(항상 동일) - 원하면 위 줄을 지우고 아래만 쓰기 */
    /* background: ${TOKENS.pageBg}; */

    padding: 0;
    margin: 0;
    overflow: hidden;
  `,

  FindCard: styled.article`
    background: ${TOKENS.cardBg};
    border-radius: 16px;
    box-shadow: ${TOKENS.shadow};
    padding: 48px 56px 56px;
    width: 100%;
    max-width: 520px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media (max-width: 1024px) {
      max-width: 448px;
      padding: 32px;
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
    color: ${TOKENS.textPrimary};
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
    color: ${TOKENS.textSecondary};
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
    color: #0a0a0a;
    line-height: 1;

    @media (max-width: 1024px) {
      font-size: 14px;
    }
  `,

  Input: styled.input`
    width: 100%;
    padding: 12px 16px;
    background: ${TOKENS.inputBg};
    border: 1px solid transparent;
    border-radius: 8px;
    font-size: 15px;
    color: #0a0a0a;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &::placeholder {
      color: ${TOKENS.textMuted};
    }

    &:focus {
      outline: none;

      /* ✅ 포커스 링/보더는 테마 primary를 쓰되, 없으면 TOKENS로 대체 */
      border-color: ${({ theme }) => theme?.primary ?? TOKENS.accent};
      background: #ffffff;
      box-shadow: 0 0 0 3px ${({ theme }) => (theme?.primary ?? TOKENS.accent)}20;
    }

    &:hover:not(:focus):not(:disabled) {
      background: ${TOKENS.inputHoverBg};
    }

    &:disabled {
      background: ${TOKENS.inputDisabledBg};
      color: ${TOKENS.inputDisabledText};
      cursor: not-allowed;
    }

    @media (max-width: 1024px) {
      font-size: 14px;
    }
  `,

  /**
   * ✅ 핵심 수정: 버튼 배경을 “항상 충분히 어둡게”
   * - theme.primary가 밝아서 글씨가 안 보이는 문제를 원천 차단
   * - hover도 대비 유지
   */
  SubmitButton: styled.button`
    width: 100%;
    padding: 12px 20px;
    background: ${TOKENS.accent};
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 8px;

    &:hover {
      background: ${TOKENS.accentHover};
      transform: translateY(-1px);
      box-shadow: 0 10px 24px rgba(17, 24, 39, 0.22);
    }

    &:active {
      transform: translateY(0);
    }

    &:disabled {
      background: #9ca3af;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    @media (max-width: 1024px) {
      font-size: 14px;
    }
  `,

  /**
   * ✅ 안내 메시지(성공/실패/정보 공용)
   * - 테마 primary가 연해도 메시지가 흐려지지 않게 “진회색” 기준 유지
   * - 배경은 부드럽게
   */
  InfoMessage: styled.div`
    padding: 16px 20px;

    /* ✅ 옵션 1) 테마 hover 사용(테마 감성 유지) */
    background: ${({ theme }) => theme?.hover ?? TOKENS.accentSoft};

    /* ✅ 옵션 2) 완전 통일 */
    /* background: ${TOKENS.accentSoft}; */

    border: 1px solid ${TOKENS.accentBorder};
    border-radius: 8px;
    color: ${TOKENS.accent};
    font-size: 14px;
    font-weight: 600;
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
    color: ${TOKENS.accent};
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    padding: 0;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
      color: ${TOKENS.accentHover};
      text-decoration: underline;
    }

    @media (max-width: 1024px) {
      font-size: 15px;
    }
  `,

  Divider: styled.span`
    color: ${TOKENS.divider};
    font-size: 14px;
    font-weight: 400;
    user-select: none;
  `,
};
