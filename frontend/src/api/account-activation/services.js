import api from '../axios';

export const accountActivationService = {
  // 활성화 정보 조회
  getActivationInfo: (token) => {
    return api.get(`/api/account-activation/${token}`);
  },

  // 계정 활성화 완료
  activateAccount: (token, password, passwordConfirm) => {
    return api.post(`/api/account-activation/${token}`, {
      password,
      passwordConfirm,
    });
  },

  // 활성화 링크 재발급
  regenerateLink: (airlineApplyId) => {
    return api.post(`/api/account-activation/regenerate/${airlineApplyId}`);
  }
};

export default { accountActivationService };

