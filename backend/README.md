# ✈️ Control Tower — Backend

Spring Boot 기반 항공사 전용 HR SaaS 백엔드 서버입니다.  
JWT 인증, 실시간 WebSocket 통신, AI 챗봇, 스케줄 자동 배정 등 핵심 비즈니스 로직을 처리합니다.

---

## 🛠️ 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Spring Boot 3.5.10 |
| Language | Java 17 |
| ORM | Spring Data JPA (Hibernate) |
| DB | MySQL 8.0 (AWS RDS) |
| Cache | Redis (AWS ElastiCache) |
| Auth | Spring Security + JWT (jjwt 0.12.3) |
| AI | Spring AI + OpenAI GPT-4o-mini |
| Real-time | WebSocket, STOMP, SSE |
| Storage | AWS S3 (SDK 2.25.0) |
| Email | Spring Mail (Gmail SMTP) |
| PDF | Apache PDFBox, OpenHTMLtoPDF |
| Build | Gradle |

---

## 📁 패키지 구조

```
src/main/java/com/kh/ct/
├── CtApplication.java          # 메인 클래스
├── domain/                     # 도메인별 비즈니스 로직
│   ├── attendance/             # 근태 관리 (출퇴근·이의제기·휴가)
│   ├── auth/                   # 인증·인가 (JWT, 계정 활성화)
│   ├── board/                  # 사내 게시판
│   ├── chat/                   # 실시간 채팅 (WebSocket)
│   ├── chatbot/                # AI 챗봇 (OpenAI)
│   ├── code/                   # 공통 코드 관리
│   ├── emp/                    # 직원 관리 (프로필·부서·직급)
│   ├── health/                 # 건강·피로도·스트레스 관리
│   ├── schedule/               # 비행 스케줄·직원 배정
│   └── support/                # 고객 지원 (Q&A)
└── global/                     # 전역 설정
    ├── config/                 # Security, WebSocket, S3, CORS 설정
    ├── exception/              # 공통 예외 처리
    ├── jwt/                    # JWT 필터·유틸
    └── util/                   # 공통 유틸리티
```

각 도메인은 아래 계층 구조를 따릅니다:
```
domain/
└── {도메인명}/
    ├── controller/   # REST API 엔드포인트
    ├── service/      # 비즈니스 로직
    ├── repository/   # JPA Repository
    ├── entity/       # JPA 엔티티
    └── dto/          # 요청·응답 DTO
```

---

## ⚙️ 환경 설정

### 프로파일 구성
| 프로파일 | 용도 |
|----------|------|
| `dev` | 로컬 개발 (localhost MySQL, Redis SSL) |
| `prod` | 운영 (AWS RDS, ElastiCache) |
| `test` | 테스트 (H2 인메모리) |

기본값은 `prod`로 설정되어 있으며, 실행 시 `-Dspring.profiles.active=dev`로 변경합니다.

### application_secret.yaml 설정 (필수)

`src/main/resources/application_secret.yaml` 파일을 아래 형식으로 작성하세요.  
이 파일은 `.gitignore`에 포함되어 있어 절대 커밋되지 않습니다.

```yaml
# MySQL
DATASOURCE_URL: jdbc:mysql://localhost:3306/ct?useSSL=false&serverTimezone=Asia/Seoul&characterEncoding=UTF-8
DATASOURCE_USERNAME: ct
DATASOURCE_PASSWORD: your_password

# JWT
JWT_SECRET: your-jwt-secret-key-at-least-256-bits

# Redis
VALKEY_HOST: localhost
VALKEY_PORT: 6379

# AWS S3
aws:
  s3:
    access-key: YOUR_ACCESS_KEY
    secret-key: YOUR_SECRET_KEY
    bucket: your-bucket-name
    region: ap-northeast-2

# OpenAI
APIKEY: sk-your-openai-api-key

# Gmail SMTP
SPRING_MAIL_USERNAME: your-email@gmail.com
SPRING_MAIL_PASSWORD: your-app-password
```

---

## 🚀 실행 방법

### 사전 요구사항
- Java 17+
- MySQL 8.0
- Redis (로컬 또는 AWS ElastiCache)

### 로컬 실행 (개발 환경)

```bash
# 개발 프로파일로 실행
./gradlew bootRun --args='--spring.profiles.active=dev'
```

### 빌드 후 실행

```bash
./gradlew build
java -jar build/libs/ct-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

### 서버 포트
기본 포트: **8001**  
변경 시: `SERVER_PORT` 환경변수로 설정

---

## 🔐 인증 흐름

```
1. POST /api/auth/login → Access Token + Refresh Token 발급
2. 모든 API 요청 헤더에 Authorization: Bearer {accessToken} 포함
3. Access Token 만료 시 POST /api/auth/refresh 로 재발급
4. Refresh Token은 Redis에 저장 (만료 시 재로그인 필요)
```

### 권한 체계

| 권한 | 역할 |
|------|------|
| `ROLE_SUPER_ADMIN` | 슈퍼관리자 — 항공사 등록, 전체 관리 |
| `ROLE_ADMIN` | 관리자 — 직원·스케줄·근태·건강 관리 |
| `ROLE_USER` | 일반 직원 — 본인 정보 조회 및 신청 |

---

## 📡 주요 API 도메인

| 접두사 | 도메인 |
|--------|--------|
| `/api/auth` | 로그인, 토큰 갱신, 계정 활성화 |
| `/api/emp` | 직원 조회·등록·수정 |
| `/api/schedule` | 비행 스케줄·직원 배정 |
| `/api/attendance` | 근태·휴가·이의제기 |
| `/api/health` | 건강 정보·피로도·스트레스 설문 |
| `/api/board` | 사내 게시판 |
| `/api/chat` | 채팅방 관리 |
| `/api/chatbot` | AI 챗봇 |
| `/api/notifications` | SSE 실시간 알림 |
| `/api/code` | 공통 코드 |

---

## 🗄️ DB 스키마

JPA `ddl-auto: update` 설정으로 엔티티 기반 자동 스키마 관리를 사용합니다.  
초기 데이터는 `src/main/resources/data.sql` 을 참고하세요.

---

## 📦 파일 업로드

- **로컬 개발**: `ct_uploads/` 폴더에 저장 (`FILE_UPLOAD_PATH` 환경변수)
- **운영**: AWS S3 버킷에 업로드 (최대 파일 20MB, 요청 100MB)
