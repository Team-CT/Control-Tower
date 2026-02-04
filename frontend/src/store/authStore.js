import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../api/auth/services';

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      emp: null,
      isAuthenticated: false,

      setToken: (token) => {
        set({
          token: token || null,
          isAuthenticated: !!token,
        });
      },

      setEmp: (emp) => set({ emp }),

      clearAuth: () => {
        set({
          token: null,
          emp: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('auth-storage');
      },

      logout: () => get().clearAuth(),

      // ✅ 로그인 플로우: login -> setToken -> me
      loginFlow: async ({ empId, empPwd }) => {
        const loginRes = await authService.login({ empId, empPwd });

        // 백엔드 응답 구조에 따라 둘 다 커버
        const token = loginRes?.data?.token ?? loginRes?.token;
        if (!token) {
          throw new Error('토큰이 응답에 없습니다. (login 응답 구조 확인 필요)');
        }

        // ✅ 토큰 저장(인터셉터가 여기 token을 읽어감)
        get().setToken(token);

        // ✅ 토큰 저장 직후 me 호출 (이때 Authorization 자동 첨부)
        const meRes = await authService.me();
        const emp = meRes?.data ?? meRes;

        get().setEmp(emp);
        return { token, emp };
      },

      // 새로고침 후 토큰이 남아있으면 me로 재수화
      hydrate: async () => {
        const token = get().token;
        if (!token) return null;

        try {
          const meRes = await authService.me();
          const emp = meRes?.data ?? meRes;
          get().setEmp(emp);
          return emp;
        } catch (e) {
          get().clearAuth();
          return null;
        }
      },

      // role helpers
      hasRole: (roles) => {
        const role = get().emp?.role;
        if (!role) return false;
        return Array.isArray(roles) ? roles.includes(role) : role === roles;
      },

      // emp helpers
      getEmpId: () => get().emp?.empId ?? null,
      getEmpName: () => get().emp?.empName ?? null,
      getRole: () => get().emp?.role ?? null,

      // Dev helper for updating role
      updateRole: (newRole) => {
        set((state) => ({
          emp: {
            ...state.emp,
            role: newRole
          }
        }));
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        emp: state.emp,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
