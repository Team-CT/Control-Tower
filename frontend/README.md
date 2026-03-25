# ✈️ Control Tower — Frontend

React 19 + Vite 기반 항공사 전용 HR SaaS 프론트엔드입니다.  
관리자·직원 대시보드, 비행 스케줄 관리, 근태·건강 관리 등 전체 UI를 제공합니다.

---

## 🛠️ 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | React 19, Vite 7 |
| 라우팅 | React Router DOM v7 |
| 상태관리 | Zustand |
| HTTP 통신 | Axios |
| 스타일링 | Styled-Components v6 |
| 차트 | Chart.js, React-ChartJS-2 |
| 아이콘 | Lucide React, React Icons |
| 실시간 통신 | SockJS, @stomp/stompjs |
| 빌드 | Vite 7 |
| 린트 | ESLint + Prettier |

---

## 📁 프로젝트 구조

```
src/
├── App.jsx                    # 라우터 설정 (전체 페이지 라우팅)
├── main.jsx                   # 앱 진입점
│
├── api/                       # API 서비스 레이어
│   ├── axios.js               # Axios 인스턴스 (baseURL, 인터셉터)
│   ├── attendance/            # 근태 API
│   ├── auth/                  # 인증 API
│   ├── emp/                   # 직원 API
│   ├── flightSchedule/        # 비행 스케줄 API
│   ├── health/                # 건강 관리 API
│   └── notification/          # 알림 API
│
├── pages/                     # 페이지 컴포넌트 (40개)
│   ├── Landing/               # 랜딩 페이지
│   ├── Login/                 # 로그인
│   ├── AdmDashboard/          # 관리자 대시보드
│   ├── EmployeeDashboard/     # 직원 대시보드
│   ├── FlightSchedule/        # 비행 스케줄 관리
│   ├── EmployeeSchedule/      # 직원 스케줄 조회
│   ├── StaffScheduleAssignment/ # 스케줄 배정
│   ├── AdminAttendance/       # 근태 관리 (관리자)
│   ├── EmployeeAttendance/    # 근태 조회 (직원)
│   ├── EmployeeHealthManagement/ # 건강 관리 (관리자)
│   ├── HealthInfoSubmission/  # 건강 정보 제출
│   ├── StressSurvey/          # 스트레스 설문
│   ├── HealthDashboard/       # 건강 대시보드
│   ├── EmployeeManagement/    # 직원 관리
│   ├── DepartmentManagement/  # 부서 관리
│   ├── Board/                 # 게시판
│   ├── QnA/                   # Q&A
│   ├── SuperAdmin/            # 슈퍼관리자
│   └── ...
│
├── components/                # 공통 컴포넌트
├── layout/                    # 레이아웃 (Sidebar, Header 등)
├── store/                     # Zustand 전역 상태
├── hooks/                     # 커스텀 훅 (SSE 알림 등)
├── styles/                    # 글로벌 스타일, 테마
├── constants/                 # 상수 정의
├── utils/                     # 유틸리티 함수
├── ChatBot/                   # AI 챗봇 컴포넌트
└── Chat/                      # 실시간 채팅 컴포넌트
```

---

## ⚙️ 환경 설정

### .env 파일 설정

```env
# 개발 환경 (.env)
VITE_API_BASE_URL=http://localhost:8001
```

```env
# 운영 환경 (.env.production)
VITE_API_BASE_URL=https://controltower.kr
```

### Axios 기본 설정

- `baseURL`: `/api` (Vite 프록시를 통해 백엔드로 전달)
- 요청 인터셉터: JWT Access Token 자동 첨부
- 응답 인터셉터: 401 시 Refresh Token으로 자동 재발급 후 재요청

---

## 🚀 실행 방법

### 사전 요구사항
- Node.js 18+
- npm 또는 yarn

### 개발 서버 실행

```bash
npm install
npm run dev
```

개발 서버: `http://localhost:5173`  
Vite 프록시를 통해 `/api` 요청을 `http://localhost:8001`로 포워딩합니다.

### 프로덕션 빌드

```bash
npm run build
# dist/ 폴더에 정적 파일 생성
```

### 코드 검사

```bash
npm run lint
```

---

## 🗺️ 주요 라우팅

| 경로 | 페이지 | 권한 |
|------|--------|------|
| `/` | 랜딩 | 공개 |
| `/login` | 로그인 | 공개 |
| `/adm-dashboard` | 관리자 대시보드 | ADMIN |
| `/emp-dashboard` | 직원 대시보드 | USER |
| `/flight-schedule` | 비행 스케줄 | ADMIN |
| `/employee-schedule` | 내 스케줄 | USER |
| `/staff-schedule-assignment` | 스케줄 배정 | ADMIN |
| `/admin-attendance` | 근태 관리 | ADMIN |
| `/employee-attendance` | 내 근태 | USER |
| `/health-dashboard` | 건강 대시보드 | ADMIN |
| `/health-info-submission` | 건강 정보 제출 | USER |
| `/stress-survey` | 스트레스 설문 | USER |
| `/employee-management` | 직원 관리 | ADMIN |
| `/department-management` | 부서 관리 | ADMIN |
| `/board` | 게시판 | 인증 사용자 |
| `/super-admin` | 슈퍼관리자 | SUPER_ADMIN |

---

## 💬 실시간 기능

### WebSocket (채팅)
- `SockJS` + `STOMP.js` 사용
- `/ws` 엔드포인트로 연결
- 채팅방별 메시지 구독 및 발행

### SSE (알림)
- `/api/notifications/stream` 으로 서버 이벤트 구독
- `useNotificationSSE` 커스텀 훅으로 전역 관리

---

## 🎨 스타일 가이드

- **Styled-Components**: 컴포넌트 단위 스타일링
- **GlobalStyle**: 전역 CSS 초기화 및 공통 변수 정의
- **반응형**: 주요 화면 기준 반응형 레이아웃 적용
