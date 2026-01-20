import React, { useState } from "react";
import * as S from "./CrewMemberDetail.styled";

const CrewMemberDetail = () => {
  const [crewMember] = useState({
    name: "김민수",
    avatar: "김",
    bgColor: "#3b82f6",
    employeeId: "EMP-2024-0547",
    birthDate: "1985-05-12",
    position: "객실 승무원",
    rank: "선임 승무원",
    phoneNumber: "010-1234-5678",
    email: "minsu.kim@koreanair.com",
    address: "서울특별시 강남구 테헤란로 (우편번호)",
    status: "근무 가능",
  });

  const leaveHistory = [
    {
      id: 1,
      type: "연차",
      status: "신청 승인됨",
      startDate: "2026-01-10",
      duration: "3일",
      reason: "비행 후 휴식을 위해요! 휴가가 아주 만족스러워요!",
      date: "2025-01-10",
    },
    {
      id: 2,
      type: "연차",
      status: "신청 승인됨",
      startDate: "2026-01-10",
      duration: "3일",
      reason: "비행 후 휴식을 위해요! 휴가가 만족스러워요!",
      date: "2025-01-10",
    },
  ];

  const [activeTab, setActiveTab] = useState("정보");

  return (
    <S.PageContainer>
      {/* ✅ 컨텐츠 헤더만 (탑바/사이드바는 MainLayout이 담당) */}
      <S.PageHeader>
        <S.HeaderLeft>
          <S.BackButton type="button">←</S.BackButton>

          <div>
            <S.BreadcrumbText>홈 &gt; 직원 페이지 &gt; 직원 상세페이지</S.BreadcrumbText>
            <S.PageTitle>직원 상세 정보</S.PageTitle>
            <S.PageSubtitle>직원 정보 관리</S.PageSubtitle>
          </div>
        </S.HeaderLeft>
      </S.PageHeader>

      {/* Employee Profile Card */}
      <S.ProfileCard>
        <S.ProfileHeader>
          <S.ProfileLeft>
            {/* ✅ bgColor -> $bgColor (DOM prop 새는거 방지) */}
            <S.ProfileAvatar $bgColor={crewMember.bgColor}>
              {crewMember.avatar}
            </S.ProfileAvatar>

            <S.ProfileInfo>
              <S.ProfileName>{crewMember.name}</S.ProfileName>
              <S.ProfileMetadata>
                <S.MetadataItem>
                  <S.MetadataLabel>직급</S.MetadataLabel>
                  <S.MetadataValue>{crewMember.position}</S.MetadataValue>
                </S.MetadataItem>
                <S.MetadataDivider>|</S.MetadataDivider>
                <S.MetadataItem>
                  <S.MetadataLabel>직책</S.MetadataLabel>
                  <S.MetadataValue>{crewMember.rank}</S.MetadataValue>
                </S.MetadataItem>
              </S.ProfileMetadata>
            </S.ProfileInfo>
          </S.ProfileLeft>

          <S.ProfileRight>
            <S.EditButton type="button">✏️ 정보 수정</S.EditButton>
          </S.ProfileRight>
        </S.ProfileHeader>

        <S.ProfileDetails>
          <S.DetailRow>
            <S.DetailItem>
              <S.DetailLabel>사원번호</S.DetailLabel>
              <S.DetailValue>{crewMember.employeeId}</S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailLabel>생년월일</S.DetailLabel>
              <S.DetailValue>{crewMember.birthDate}</S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailLabel>상태</S.DetailLabel>
              {/* ✅ status -> $status */}
              <S.StatusBadge $status={crewMember.status}>
                {crewMember.status}
              </S.StatusBadge>
            </S.DetailItem>
          </S.DetailRow>

          <S.DetailRow>
            <S.DetailItem>
              <S.DetailLabel>이메일</S.DetailLabel>
              <S.DetailValue>{crewMember.email}</S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailLabel>연락처</S.DetailLabel>
              <S.DetailValue>{crewMember.phoneNumber}</S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailLabel>주소</S.DetailLabel>
              <S.DetailValue>{crewMember.address}</S.DetailValue>
            </S.DetailItem>
          </S.DetailRow>
        </S.ProfileDetails>
      </S.ProfileCard>

      {/* Tabs Navigation */}
      <S.TabsContainer>
        {/* ✅ active -> $active */}
        <S.TabButton
          type="button"
          $active={activeTab === "정보"}
          onClick={() => setActiveTab("정보")}
        >
          정보
        </S.TabButton>
      </S.TabsContainer>

      {/* Leave History Section */}
      <S.HistorySection>
        {leaveHistory.map((leave) => (
          <S.LeaveCard key={leave.id}>
            <S.LeaveHeader>
              <S.LeaveIcon>📋</S.LeaveIcon>
              <S.LeaveTitle>{leave.type}</S.LeaveTitle>
              <S.LeaveDate>{leave.date}</S.LeaveDate>
            </S.LeaveHeader>

            <S.LeaveDetails>
              <S.LeaveDetailRow>
                <S.LeaveDetailItem>
                  <S.LeaveDetailLabel>유형</S.LeaveDetailLabel>
                  <S.LeaveDetailValue>{leave.type}</S.LeaveDetailValue>
                </S.LeaveDetailItem>

                <S.LeaveDetailItem>
                  <S.LeaveDetailLabel>상태</S.LeaveDetailLabel>
                  <S.LeaveStatusBadge>{leave.status}</S.LeaveStatusBadge>
                </S.LeaveDetailItem>

                <S.LeaveDetailItem>
                  <S.LeaveDetailLabel>일시</S.LeaveDetailLabel>
                  <S.LeaveDetailValue>{leave.startDate}</S.LeaveDetailValue>
                </S.LeaveDetailItem>

                <S.LeaveDetailItem>
                  <S.LeaveDetailLabel>근무일</S.LeaveDetailLabel>
                  <S.LeaveDurationBadge>{leave.duration}</S.LeaveDurationBadge>
                </S.LeaveDetailItem>
              </S.LeaveDetailRow>

              <S.LeaveReason>
                <S.LeaveReasonLabel>비고</S.LeaveReasonLabel>
                <S.LeaveReasonText>{leave.reason}</S.LeaveReasonText>
              </S.LeaveReason>
            </S.LeaveDetails>
          </S.LeaveCard>
        ))}
      </S.HistorySection>
    </S.PageContainer>
  );
};

export default CrewMemberDetail;
