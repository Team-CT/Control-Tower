import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';

// 페이지 컴포넌트 Import
import Login from './pages/login/login';
import Register from './pages/register/register';
import SelectId from './pages/select_id/select_id';
import SelectPwd from './pages/select_pwd/select_pwd';
import WorkLogin from './pages/worklogin/worklogin';
import Board from './pages/board/board';
import QnA from './pages/Q&A/Q&A'; // 폴더명 대소문자 주의

// 레이아웃 컴포넌트 Import
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      {/* 전역 스타일 적용 */}
      <GlobalStyle />
      
      <Routes>
        {/* 1. 사이드바가 없는 페이지 (로그인, 회원가입 등) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/find-employee-id" element={<SelectId />} />
        <Route path="/find-password" element={<SelectPwd />} />
        <Route path="/work-login" element={<WorkLogin />} />

        {/* 2. 사이드바가 있는 페이지 (MainLayout 내부) */}
        <Route element={<MainLayout />}>
          {/* 기본 경로 접속 시 대시보드나 게시판으로 리다이렉트 */}
          <Route path="/" element={<Navigate to="/board" replace />} />
          
          {/* 각 메뉴별 페이지 연결 */}
          <Route path="/dashboard" element={<div>대시보드 페이지 (준비중)</div>} />
          <Route path="/board" element={<Board />} />
          <Route path="/qna" element={<QnA />} />
          
          {/* 관리자 전용 페이지 */}
          <Route path="/employee-list" element={<div>직원 목록 페이지 (준비중)</div>} />
          <Route path="/dept-manage" element={<div>부서 관리 페이지 (준비중)</div>} />
          
          {/* 나머지 메뉴들에 대한 라우트도 여기에 추가하면 됩니다 */}
          <Route path="/attendance" element={<div>근태 현황 페이지 (준비중)</div>} />
          <Route path="/vacation" element={<div>휴가 신청 페이지 (준비중)</div>} />
          <Route path="/approval" element={<div>승인 관리 페이지 (준비중)</div>} />
          <Route path="/health-status" element={<div>건강 현황 페이지 (준비중)</div>} />
          <Route path="/stress" element={<div>스트레스 설문 페이지 (준비중)</div>} />
          <Route path="/health-program" element={<div>건강 프로그램 페이지 (준비중)</div>} />
          <Route path="/settings" element={<div>설정 페이지 (준비중)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;