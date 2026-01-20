import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./FlightScheduleDetail.styled";

const FlightScheduleDetail = () => {
  const navigate = useNavigate();

  const [selectedFlight] = useState({
    flightNumber: "KE001",
    date: "4월 9일 (수)",
    airline: "대한항공",
    departure: { time: "10:30", code: "ICN", airport: "인천국제공항" },
    arrival: { time: "06:45", code: "LAX", airport: "로스앤젤레스 국제공항" },
    duration: "11시간 15분",
  });

  const crewPositions = [
    {
      id: 1,
      title: "운항 승무원 (2명)",
      members: [
        { id: 1, name: "정혜은", role: "기장", status: "근무 가능", avatar: "👨‍✈️", bgColor: "#8b5cf6" },
        { id: 2, name: "김지우", role: "부기장", status: "휴가", avatar: "👨‍✈️", bgColor: "#8b5cf6" },
      ],
    },
    {
      id: 2,
      title: "객실 승무원 (5명)",
      members: [
        { id: 3, name: "이지연", role: "사무장", status: "근무 가능", avatar: "👩‍✈️", bgColor: "#10b981" },
        { id: 4, name: "정수진", role: "ASSISTANT", status: "휴가", avatar: "👩‍✈️", bgColor: "#10b981" },
        { id: 5, name: "최선영", role: "ASSISTANT", status: "휴가", avatar: "👩‍✈️", bgColor: "#10b981" },
        { id: 6, name: "정보라", role: "ASSISTANT", status: "근무 가능", avatar: "👩‍✈️", bgColor: "#10b981" },
        { id: 7, name: "김혜진", role: "수습", status: "근무 가능", avatar: "👩‍✈️", bgColor: "#3b82f6" },
        { id: 8, name: "윤지영", role: "수습", status: "근무 가능", avatar: "👩‍✈️", bgColor: "#3b82f6" },
      ],
    },
  ];

  return (
    <S.PageContainer>
      {/* 페이지 헤더 */}
      <S.PageHeader>
        <S.HeaderLeft>
          <S.BreadcrumbText>홈 &gt; 비행편 정보 &gt; 상세 정보</S.BreadcrumbText>
          <S.PageTitle>비행편 코드 상세 정보</S.PageTitle>
          <S.PageSubtitle>
            비행편 정보 및 승무원 근무 배정을 관리합니다.
          </S.PageSubtitle>
        </S.HeaderLeft>
      </S.PageHeader>

      {/* 비행편 요약 */}
      <S.FlightSummaryCard>
        <S.FlightSummaryHeader>
          <S.FlightBadge>
            <S.AirlineIcon>✈</S.AirlineIcon>
            <div>
              <S.FlightNumber>{selectedFlight.flightNumber}</S.FlightNumber>
              <S.FlightDate>
                {selectedFlight.date} • {selectedFlight.airline}
              </S.FlightDate>
            </div>
          </S.FlightBadge>
        </S.FlightSummaryHeader>

        <S.FlightRoute>
          <S.RoutePoint>
            <S.RouteTime>{selectedFlight.departure.time}</S.RouteTime>
            <S.RouteCode>{selectedFlight.departure.code}</S.RouteCode>
            <S.RouteAirport>{selectedFlight.departure.airport}</S.RouteAirport>
          </S.RoutePoint>

          <S.RouteIndicator>
            <S.RoutePlaneIcon>✈</S.RoutePlaneIcon>
            <S.RouteLine />
            <S.RouteDuration>{selectedFlight.duration}</S.RouteDuration>
          </S.RouteIndicator>

          <S.RoutePoint>
            <S.RouteTime>{selectedFlight.arrival.time}</S.RouteTime>
            <S.RouteCode>{selectedFlight.arrival.code}</S.RouteCode>
            <S.RouteAirport>{selectedFlight.arrival.airport}</S.RouteAirport>
          </S.RoutePoint>
        </S.FlightRoute>
      </S.FlightSummaryCard>

      {/* 승무원 목록 */}
      {crewPositions.map((position) => (
        <S.CrewSection key={position.id}>
          <S.CrewSectionHeader>
            <S.CrewSectionTitle>{position.title}</S.CrewSectionTitle>
          </S.CrewSectionHeader>

          <S.CrewMemberList>
            {position.members.map((member) => (
              <S.CrewMemberCard
                key={member.id}
                onClick={() => navigate(`/crew/${member.id}`)}
                style={{ cursor: "pointer" }}
              >
                <S.CrewMemberLeft>
                  <S.CrewAvatar $bgColor={member.bgColor}>
                    {member.avatar}
                  </S.CrewAvatar>

                  <S.CrewInfo>
                    <S.CrewName>{member.name}</S.CrewName>

                    <S.CrewMetadata>
                      <S.CrewRole>{member.role}</S.CrewRole>
                      <S.CrewDivider>•</S.CrewDivider>
                      <S.CrewID>EMP-001-0924</S.CrewID>
                    </S.CrewMetadata>
                  </S.CrewInfo>
                </S.CrewMemberLeft>

                <S.CrewMemberRight>
                  <S.CrewStatusBadge $status={member.status}>
                    {member.status}
                  </S.CrewStatusBadge>
                </S.CrewMemberRight>
              </S.CrewMemberCard>
            ))}
          </S.CrewMemberList>
        </S.CrewSection>
      ))}
    </S.PageContainer>
  );
};

export default FlightScheduleDetail;
