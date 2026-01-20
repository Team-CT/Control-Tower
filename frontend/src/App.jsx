import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import { AirlineThemeProvider } from './context/AirlineThemeContext';

// 페이지 컴포넌트 Import
import LandingPage from './pages/Landing/LandingPage';
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
import Dashboard from './pages/HealthDashboard/HealthDashboard';
import Stress from './pages/StressSurvey/StressSurvey';
// 레이아웃 컴포넌트 Import
import MainLayout from './layout/MainLayout';
import EmployeeHealthManagement from './pages/EmployeeHealthManagement/EmployeeHealthManagement';
import EmployeeHealthDetail from './pages/EmployeeHealthDetail/EmployeeHealthDetail';
import HealthInfoSubmission from './pages/HealthInfoSubmission/HealthInfoSubmission';
import HealthSubmissionHistory from './pages/HealthSubmissionHistory/HealthSubmissionHistory';
import HealthProgramManagement from './pages/HealthProgramManagement/HealthProgramManagement';
import Settings from './pages/Settings/Settings';
import NotFound from './pages/NotFound/NotFound';
import CommonCodeManagement from './pages/CommonCodeManagement/CommonCodeManagement';
import HealthProgramApply from './pages/HealthProgramApply/HealthProgramApply.jsx';
import FlightSchedule from './pages/FlightSchedule/FlightSchedule.jsx';
import FlightScheduleDetail from './pages/FlightSchedule/FlightScheduleDetail.jsx'
import CrewMemberDetail from './pages/FlightSchedule/CrewMemberDetail.jsx'
import AdmDashboard from './pages/AdmDashboard/AdmDashboard.jsx';

function App() {
  return (
    <AirlineThemeProvider>
      <BrowserRouter>
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
            <Route path="/admin-dashboard" element={<AdmDashboard />} />
            
            {/* 게시판 */}
            <Route path="/board" element={<Board />} />
            <Route path="/board/detail" element={<BoardDetail />} />
            <Route path="/qna" element={<QnA />} />
            
            {/* 인사 관리 */}
            <Route path="/employee-list" element={<EmployeeManagement />} />
            <Route path="/employee-list/detail" element={<EmployeeDetail />} />
            <Route path="/dept-manage" element={<DepartmentManagement />} />
            <Route path="/dept-manage/detail" element={<DepartmentDetail />} />
            
            {/* 항공편 관리 */}
            <Route path="/flightschedule" element={<FlightSchedule />} />
           <Route path="/flightschedule/:flightId" element={<FlightScheduleDetail />} />
<Route path="/crew/:crewId" element={<CrewMemberDetail />} />

            {/* 근태 관리 */}
            <Route path="/attendance" element={<EmployeeSchedule />} />
            <Route path="/employee-schedule" element={<EmployeeSchedule />} />
            <Route path="/vacation" element={<LeaveApply />} />
            <Route path="/approval" element={<LeaveApproval />} />
            
            {/* 건강 관리 */}
            <Route path="/health-dashboard" element={<Dashboard />} />
            <Route path="/stress" element={<Stress/>} />
            <Route path="/employeehealthmanagement" element={<EmployeeHealthManagement/>} />
            <Route path="/employeehealthdetail" element={<EmployeeHealthDetail/>} />
            <Route path="/healthinfosubmission" element={<HealthInfoSubmission/>} />
            <Route path="/healthsubmissionhistory" element={<HealthSubmissionHistory/>} />
            <Route path="/healthprogrammanagement" element={<HealthProgramManagement/>} />   
            <Route path="/healthprogramapply" element={<HealthProgramApply/>} />  
            
            {/* 시스템 관리 */}
            <Route path="/common-code" element={<CommonCodeManagement />} />
            
            {/* 기타 */}
            <Route path="/settings" element={<Settings/>} />
          </Route>

          {/* 404 페이지 */}
          <Route path="*" element={<NotFound />} />
            



        </Routes>
      </BrowserRouter>
    </AirlineThemeProvider>
  );
}

export default App;