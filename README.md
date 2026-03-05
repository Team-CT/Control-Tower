# ✈️ Control Tower — 항공사 전용 HR SaaS 솔루션

> **불규칙한 스케줄을 소화하는 운항·객실 승무원과 지상직 직원을 통합 관리하며,  
> 항공 안전을 위한 피로도·스트레스를 관리하고 스케줄링을 자동화한 항공사 전용 HR 플랫폼**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.10-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat-square&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![AWS](https://img.shields.io/badge/AWS-EC2%20%7C%20S3%20%7C%20Redis-FF9900?style=flat-square&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)

---

## 📌 프로젝트 소개

항공업계는 교대 근무, 야간 비행, 국제선 시차 등 **불규칙한 근무 환경**이 필연적으로 동반됩니다.  
**Control Tower**는 이러한 환경에서 발생하는 **인력 관리 혼선과 피로 누적 문제**를 해결하기 위해 설계된 항공사 특화 HR SaaS입니다.

비행 스케줄·근태·건강 데이터를 하나의 플랫폼에서 통합 관리하며,  
관리자는 직원의 피로도·스트레스 지수를 실시간으로 모니터링하고,  
AI 기반 자동 스케줄링으로 안전하고 효율적인 인력 운용을 실현합니다.

---

## 🎯 프로젝트 목표

| 문제 | 해결 방향 |
|------|-----------|
| 불규칙한 근무로 인한 인력 관리 혼선 | 비행 스케줄 기반 자동 스케줄링 |
| 피로·스트레스 누적으로 인한 안전 위협 | 피로도·스트레스 지수 통합 모니터링 |
| 다양한 직군(운항·객실·지상직) 통합 관리 부재 | 직군별 맞춤 HR 기능 제공 |
| 분산된 근태·건강·스케줄 데이터 | 단일 플랫폼 통합 관리 |

---

## 📷 주요 화면

| 대시보드 | 비행 스케줄 | 건강 관리 |
|----------|-------------|-----------|
| 관리자·직원 맞춤 대시보드 | 스케줄 자동 배정 및 조회 | 건강 설문·프로그램 관리 |

---

## ✨ 주요 기능

### 👥 인사 관리
- 직원 등록 / 조회 / 수정 / 부서 관리
- 직군별(운항·객실·지상직) 맞춤 정보 관리
- 계정 활성화 및 권한 관리 (슈퍼관리자 / 관리자 / 직원)

### ✈️ 비행 스케줄 관리
- 비행 스케줄 등록·수정·삭제
- 직원 스케줄 자동 배정 (AI 기반)
- 스케줄 충돌·피로도 초과 자동 감지

### 🕐 근태 관리
- 출·퇴근 기록 (QR / 위치 기반 출근)
- 근태 이의제기 및 승인 워크플로우
- 휴가 신청·승인·잔여일수 관리

### 🏥 건강 관리
- 피로도·스트레스 설문 주기적 수집
- 건강 정보 제출 및 이력 조회
- 건강 증진 프로그램 신청·관리
- 건강 대시보드 (관리자용 통계)

### 💬 커뮤니케이션
- 실시간 채팅 (WebSocket / STOMP)
- AI 챗봇 (OpenAI 연동)
- 사내 게시판 / Q&A
- 실시간 알림 (SSE)

### 📊 대시보드 & 리포트
- 관리자: 전체 인력 현황, 피로도 통계, 스케줄 현황
- 직원: 본인 스케줄·근태·건강 요약

---

## 🛠️ 기술 스택

### Backend
| 분류 | 기술 |
|------|------|
| Framework | Spring Boot 3.5.10, Spring Security |
| Language | Java 17 |
| ORM | Spring Data JPA |
| Database | MySQL 8.0, Redis |
| Auth | JWT (jjwt 0.12.3) |
| Storage | AWS S3 (SDK 2.25.0) |
| AI | Spring AI + OpenAI |
| Real-time | WebSocket, STOMP, SSE |
| Email | Spring Mail |
| PDF | Apache PDFBox, OpenHTMLtoPDF |
| Build | Gradle |

### Frontend
| 분류 | 기술 |
|------|------|
| Framework | React 19, Vite 7 |
| Routing | React Router DOM v7 |
| 상태관리 | Zustand |
| HTTP | Axios |
| 스타일 | Styled-Components |
| 차트 | Chart.js, React-ChartJS-2 |
| 아이콘 | Lucide React, React Icons |
| Real-time | SockJS, STOMP.js |

### DevOps & Infra
| 분류 | 기술 |
|------|------|
| Cloud | AWS EC2, S3 |
| Cache | Redis |
| CI/CD | GitHub |
| 배포 도메인 | controltower.kr |

---

## 🏗️ 프로젝트 구조

```
Control Tower/
├── backend/                        # Spring Boot 백엔드
│   └── src/main/java/com/kh/ct/
│       ├── domain/
│       │   ├── attendance/         # 근태 관리
│       │   ├── auth/               # 인증 (JWT, Security)
│       │   ├── board/              # 게시판
│       │   ├── chat/               # 실시간 채팅
│       │   ├── chatbot/            # AI 챗봇
│       │   ├── code/               # 공통 코드
│       │   ├── emp/                # 직원 관리
│       │   ├── health/             # 건강 관리
│       │   ├── schedule/           # 비행 스케줄
│       │   └── support/            # 고객 지원
│       └── global/                 # 전역 설정 (보안, 예외, 공통)
│
└── frontend/                       # React 프론트엔드
    └── src/
        ├── api/                    # API 서비스 레이어
        ├── pages/                  # 40여개 페이지 컴포넌트
        │   ├── FlightSchedule/     # 비행 스케줄
        │   ├── EmployeeSchedule/   # 직원 스케줄
        │   ├── AdminAttendance/    # 근태 관리 (관리자)
        │   ├── EmployeeHealthManagement/ # 건강 관리
        │   ├── StressSurvey/       # 스트레스 설문
        │   ├── AdmDashboard/       # 관리자 대시보드
        │   └── EmployeeDashboard/  # 직원 대시보드
        ├── components/             # 공통 컴포넌트
        ├── layout/                 # 레이아웃
        ├── store/                  # Zustand 스토어
        └── hooks/                  # 커스텀 훅
```

---

## 🚀 로컬 실행 방법

### 사전 요구사항
- Java 17+
- Node.js 18+
- MySQL 8.0
- Redis

### Backend 실행

```bash
cd backend

# application_secret.yaml 설정 (DB, JWT, S3, OpenAI 키 등)
# src/main/resources/application_secret.yaml 작성 필요

./gradlew bootRun
```

> **필수 환경변수** (`application_secret.yaml`)
> - MySQL DB 연결 정보
> - JWT Secret Key
> - AWS S3 Access Key / Secret Key / Bucket Name
> - OpenAI API Key
> - Redis 연결 정보
> - SMTP 메일 설정

### Frontend 실행

```bash
cd frontend

npm install

# 개발 환경 실행
npm run dev

# 프로덕션 빌드
npm run build
```

> `.env` 파일 설정:
> ```env
> VITE_API_BASE_URL=http://localhost:8080
> ```

---

## 👤 사용자 권한 체계

| 권한 | 역할 |
|------|------|
| `SUPER_ADMIN` | 슈퍼관리자 — 항공사 등록, 전체 시스템 관리 |
| `ADMIN` | 관리자 — 직원·스케줄·근태·건강 관리 |
| `USER` | 일반 직원 — 본인 스케줄·근태·건강 조회 및 신청 |

---

## 🔐 보안

- **JWT 기반 인증** — Access Token + Refresh Token (Redis 저장)
- **Spring Security** — URL 기반 권한 제어
- **HTTPS** 배포 (controltower.kr)
- **AWS S3** — 파일 업로드 보안 관리

---

## 🌐 배포

| 항목 | 내용 |
|------|------|
| 서비스 URL | https://controltower.kr |
| Backend | AWS EC2 (Spring Boot JAR) |
| Frontend | AWS EC2 (Nginx + React 정적 빌드) |
| DB | AWS RDS (MySQL) |
| Cache | AWS ElastiCache (Redis) |
| Storage | AWS S3 |

---

## 👨‍👩‍👧‍👦 팀원 소개

| 이름 | GitHub | 이메일 | 역할 |
|------|--------|--------|------|
| 전수환 | [![GitHub](https://img.shields.io/badge/GitHub-000?style=flat&logo=github&logoColor=white)](https://github.com/junsh96) | [junsh96@gmail.com](mailto:junsh96@gmail.com) | 조장 |
| 신한서 | [![GitHub](https://img.shields.io/badge/GitHub-000?style=flat&logo=github&logoColor=white)](https://github.com/hanseo-lab) | [hanseo.lab@gmail.com](mailto:hanseo.lab@gmail.com) | 형상관리자 |
| 유재현 | [![GitHub](https://img.shields.io/badge/GitHub-000?style=flat&logo=github&logoColor=white)](https://github.com/yoo-j-h) | [gusdlcjstk10@gmail.com](mailto:gusdlcjstk10@gmail.com) | DB관리자 |
| 김지우 | [![GitHub](https://img.shields.io/badge/GitHub-000?style=flat&logo=github&logoColor=white)](https://github.com/ziukim) | [hjiwoogim@gmail.com](mailto:hjiwoogim@gmail.com) | 이슈관리자 |
| 장우빈 | [![GitHub](https://img.shields.io/badge/GitHub-000?style=flat&logo=github&logoColor=white)](https://github.com/wkddnqls) | [jwb57863@naver.com](mailto:jwb57863@naver.com) | 일정관리자 |
| 전원희 | [![GitHub](https://img.shields.io/badge/GitHub-000?style=flat&logo=github&logoColor=white)](https://github.com/jeonwonhee) | [wonhee0121@g.eulji.ac.kr](mailto:wonhee0121@g.eulji.ac.kr) | QA, 문서관리자 |

---

## 📄 라이선스

This project is for educational and portfolio purposes.  
© 2026 Control Tower Team. All rights reserved.