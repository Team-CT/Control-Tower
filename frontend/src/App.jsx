import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';

// 페이지 컴포넌트 Import
import LandingPage from './pages/Landing/LandingPage'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SelectId from './pages/SelectId/SelectId';
import SelectPwd from './pages/SelectPwd/SelectPwd';
import WorkLogin from './pages/WorkLogin/WorkLogin';
import Board from './pages/Board/Board';
import BoardDetail from './pages/BoardDetail/BoardDetail';
import QnA from './pages/QnA/QnA';
import EmployeeDashboard from './pages/EmployeeDashboard/EmployeeDashboard';
import EmployeeManagement from './pages/EmployeeManagement/EmployeeManagement';
import EmployeeDetail from './pages/EmployeeDetail/EmployeeDetail';
import DepartmentManagement from './pages/DepartmentManagement/DepartmentManagement';
import DepartmentDetail from './pages/DepartmentDetail/DepartmentDetail';
import LeaveApply from './pages/EmployeeSchedule/LeaveApply';
import LeaveApproval from './pages/EmployeeSchedule/LeaveApproval';
import EmployeeSchedule from './pages/EmployeeSchedule/EmployeeSchedule';
import Dashboard from './pages/HealthDashboard/HealthDashboard.jsx';
import Stress from './pages/StressSurvey/StressSurvey.jsx';
// 레이아웃 컴포넌트 Import
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      {/* 전역 스타일 적용 */}
      <GlobalStyle />
      
      <Routes>
        {/* 1. 사이드바가 없는 페이지 */}
        <Route path="/" element={<LandingPage />} /> 

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/find-employee-id" element={<SelectId />} />
        <Route path="/find-password" element={<SelectPwd />} />
        <Route path="/work-login" element={<WorkLogin />} />
        {/* 2. 사이드바/헤더/푸터가 있는 페이지 (MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/board" replace />} />
          
          <Route path="/dashboard" element={<EmployeeDashboard />} />
          
          {/* 게시판 */}
          <Route path="/board" element={<Board />} />
          <Route path="/board/detail" element={<BoardDetail />} />
          <Route path="/qna" element={<QnA />} />
          
          {/* 인사 관리 */}
          <Route path="/employee-list" element={<EmployeeManagement />} />
          <Route path="/employee-list/detail" element={<EmployeeDetail />} />
          <Route path="/dept-manage" element={<DepartmentManagement />} />
          <Route path="/dept-manage/detail" element={<DepartmentDetail />} />
          
          {/* 근태 관리 */}
          <Route path="/attendance" element={<EmployeeSchedule />} />
          <Route path="/vacation" element={<LeaveApply />} />
          <Route path="/approval" element={<LeaveApproval />} />
          
          {/* 기타 */}
          <Route path="/health-dashboard" element={<Dashboard />} />
          <Route path="/stress" element={<Stress/>} />
          <Route path="/health-program" element={<div>건강 프로그램 페이지 (준비중)</div>} />
          <Route path="/settings" element={<div>설정 페이지 (준비중)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;