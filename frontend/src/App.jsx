import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { AirlineThemeProvider, useAirlineTheme } from './context/AirlineThemeContext';

// [1] 페이지 컴포넌트 Import (PascalCase 적용)
import LandingPage from './pages/Landing/LandingPage';
import Login from './pages/Login/Login'; // login -> Login
import Register from './pages/Register/Register';
import SelectId from './pages/SelectId/SelectId';
import SelectPwd from './pages/SelectPwd/SelectPwd';
import WorkLogin from './pages/WorkLogin/WorkLogin'; // worklogin -> WorkLogin
import Board from './pages/Board/Board'; // board -> Board
import BoardDetail from './pages/BoardDetail/BoardDetail'; // boardDetail -> BoardDetail
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
import SuperAdminDashboard from './pages/SuperAdminDashboard/SuperAdminDashboard.jsx';
import AirlineApprovalManagement from './pages/AirlineApprovalManagement/AirlineApprovalManagement.jsx';
import AccountActivation from './pages/AccountActivation/AccountActivation.jsx';
import ServiceRegistration from './pages/ServiceRegistration/ServiceRegistration.jsx';
import AdminAttendance from './pages/AdminAttendance/AdminAttendance.jsx';
import EmployeeAttendance from './pages/EmployeeAttendance/EmployeeAttendance.jsx';
import TenantManagement from './pages/SuperAdmin/Tenant/TenantManagement.jsx'; // [임시 테스트용]
import TenantDetail from './pages/SuperAdmin/Tenant/TenantDetail.jsx'; // [임시 테스트용]

// [2] 레이아웃 컴포넌트 Import
// sidebar -> Sidebar는 MainLayout 내부에서 사용되겠지만, 여기서는 MainLayout만 import
import MainLayout from './layout/MainLayout';

// [3] ThemeProvider 래퍼 컴포넌트
const ThemedApp = () => {
  const { theme, changeAirline } = useAirlineTheme();
  
  // 앱 초기화 시 사용자의 항공사 정보 로드 (Mock)
  React.useEffect(() => {
    // 실제 환경에서는 로그인 후 사용자 정보에서 항공사 코드를 가져옴
    // 여기서는 LocalStorage에 저장된 정보를 사용
    const savedAirline = localStorage.getItem('airlineCode');
    if (savedAirline && savedAirline !== 'CONTROL_TOWER') {
      // 이미 저장된 항공사가 있으면 해당 테마 적용
      console.log(`[Theme] 저장된 항공사 테마 적용: ${savedAirline}`);
    }
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* 1. 사이드바가 없는 페이지 (퍼블릭) */}
          <Route path="/" element={<LandingPage />} /> 

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/find-employee-id" element={<SelectId />} />
          <Route path="/find-password" element={<SelectPwd />} />
          <Route path="/work-login" element={<WorkLogin />} />
          
          {/* 항공사 가입 신청 및 계정 활성화 */}
          <Route path="/service-registration" element={<ServiceRegistration />} />
          <Route path="/account-activation" element={<AccountActivation />} />

          {/* 2. 사이드바/헤더/푸터가 있는 페이지 (MainLayout) */}
          {/* 실제로는 MainLayout 내부에서 권한에 따라 Sidebar의 메뉴가 달라지거나 접근 제한을 처리해야 함 */}
          <Route element={<MainLayout />}>
            {/* 기본 리다이렉트 */}
            <Route path="/dashboard" element={<EmployeeDashboard />} />
            
            {/* 관리자/슈퍼관리자 대시보드 */}
            <Route path="/admin-dashboard" element={<AdmDashboard />} />
            <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />
            
            {/* [슈퍼 관리자 전용] */}
            <Route path="/airline-approval" element={<AirlineApprovalManagement />} />
            <Route path="/tenant-management" element={<TenantManagement />} /> {/* [임시 테스트용] */}
            <Route path="/tenant-detail/:tenantId" element={<TenantDetail />} /> {/* [임시 테스트용] */}
            <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} /> {/* 별칭 경로 */}
            
            {/* [게시판] */}
            <Route path="/board" element={<Board />} />
            <Route path="/board/detail" element={<BoardDetail />} />
            <Route path="/qna" element={<QnA />} />
            
            {/* [인사 관리] */}
            <Route path="/employee-list" element={<EmployeeManagement />} />
            <Route path="/employee-list/detail" element={<EmployeeDetail />} />
            <Route path="/dept-manage" element={<DepartmentManagement />} />
            <Route path="/dept-manage/detail" element={<DepartmentDetail />} />
            
            {/* [운항 관리] */}
            <Route path="/flightschedule" element={<FlightSchedule />} />
            <Route path="/flightschedule/:flightId" element={<FlightScheduleDetail />} />
            <Route path="/crew/:crewId" element={<CrewMemberDetail />} />

            {/* [근태 관리] */}
            <Route path="/attendance" element={<EmployeeAttendance />} />
            <Route path="/my-attendance" element={<EmployeeAttendance />} />
            <Route path="/admin-attendance" element={<AdminAttendance />} />
            <Route path="/employee-schedule" element={<AdminAttendance />} />
            <Route path="/vacation" element={<LeaveApply />} />
            <Route path="/approval" element={<LeaveApproval />} />
            
            {/* [건강 관리] */}
            <Route path="/health-dashboard" element={<Dashboard />} />
            <Route path="/stress" element={<Stress/>} />
            <Route path="/employeehealthmanagement" element={<EmployeeHealthManagement/>} />
            <Route path="/employeehealthdetail" element={<EmployeeHealthDetail/>} />
            <Route path="/healthinfosubmission" element={<HealthInfoSubmission/>} />
            <Route path="/healthsubmissionhistory" element={<HealthSubmissionHistory/>} />
            <Route path="/healthprogrammanagement" element={<HealthProgramManagement/>} />   
            <Route path="/healthprogramapply" element={<HealthProgramApply/>} />  
            
            {/* [시스템 관리] */}
            <Route path="/common-code" element={<CommonCodeManagement />} />
            
            {/* [기타] */}
            <Route path="/settings" element={<Settings/>} />
          </Route>

          {/* 404 페이지 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

function App() {
  return (
    <AirlineThemeProvider>
      <ThemedApp />
    </AirlineThemeProvider>
  );
}

export default App;