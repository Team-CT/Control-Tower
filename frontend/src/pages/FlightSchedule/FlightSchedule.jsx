import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./FlightSchedule.styled";

const FlightSchedule = () => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("4월 9일 (수)");
  const [departureCity, setDepartureCity] = useState("ICN");
  const [arrivalCity, setArrivalCity] = useState("LAX");

  const flightList = [
    {
      id: 1,
      flightNumber: "KE001",
      departure: { time: "10:30", code: "ICN", airport: "인천국제공항" },
      arrival: { time: "06:45", code: "LAX", airport: "로스앤젤레스 국제공항" },
      duration: "11시간 15분",
      status: "정상",
      crewAssigned: true,
    },
    {
      id: 2,
      flightNumber: "KE002",
      departure: { time: "14:20", code: "ICN", airport: "인천국제공항" },
      arrival: { time: "09:10", code: "JFK", airport: "뉴욕 JFK 공항" },
      duration: "13시간 50분",
      status: "정상",
      crewAssigned: true,
    },
    {
      id: 3,
      flightNumber: "KE003",
      departure: { time: "18:00", code: "ICN", airport: "인천국제공항" },
      arrival: { time: "22:30", code: "HND", airport: "하네다 공항" },
      duration: "2시간 30분",
      status: "정상",
      crewAssigned: true,
    },
  ];

  return (
    <S.PageContainer>
      {/* Page Header */}
      <S.PageHeader>
        <S.HeaderLeft>
          <S.BreadcrumbText>홈 &gt; 비행편 정보</S.BreadcrumbText>
          <S.PageTitle>비행편 정보</S.PageTitle>
          <S.PageSubtitle>
            비행편 정보 및 승무원 근무 배정을 관리합니다.
          </S.PageSubtitle>
        </S.HeaderLeft>
      </S.PageHeader>

      {/* Search Filter Section */}
      <S.FilterSection>
        <S.FilterGroup>
          <S.FilterLabel>조회 기준</S.FilterLabel>
          <S.FilterButtonGroup>
            <S.FilterButton type="button" $active>
              날짜별
            </S.FilterButton>
            <S.FilterButton type="button">노선별</S.FilterButton>
          </S.FilterButtonGroup>
        </S.FilterGroup>

        <S.FilterGroup>
          <S.FilterLabel>날짜 선택</S.FilterLabel>
          <S.DateInput type="text" value={selectedDate} readOnly />
        </S.FilterGroup>

        <S.FilterGroup>
          <S.FilterLabel>출발지</S.FilterLabel>
          <S.CitySelect
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
          >
            <option value="ICN">ICN - 인천</option>
          </S.CitySelect>
        </S.FilterGroup>

        <S.FilterGroup>
          <S.FilterLabel>도착지</S.FilterLabel>
          <S.CitySelect
            value={arrivalCity}
            onChange={(e) => setArrivalCity(e.target.value)}
          >
            <option value="LAX">LAX - 로스앤젤레스</option>
            <option value="JFK">JFK - 뉴욕</option>
            <option value="HND">HND - 도쿄</option>
          </S.CitySelect>
        </S.FilterGroup>

        <S.SearchButton type="button">검색</S.SearchButton>
      </S.FilterSection>

      {/* Flight List */}
      <S.FlightListContainer>
        {flightList.map((flight) => (
          <S.FlightCard
            key={flight.id}
            onClick={() => navigate(`/flightschedule/${flight.id}`)}
            style={{ cursor: "pointer" }}
          >
            <S.CardHeader>
              <S.FlightBadge>
                <S.AirlineIcon>✈</S.AirlineIcon>
                <div>
                  <S.FlightNumber>{flight.flightNumber}</S.FlightNumber>
                  <S.FlightDate>4월 9일 (수) • 대한항공</S.FlightDate>
                </div>
              </S.FlightBadge>

              <S.StatusBadgeGroup>
                <S.StatusBadge $status="normal">
                  운항 {flight.status}
                </S.StatusBadge>
                <S.StatusBadge $status="assigned">
                  승무원 배정
                </S.StatusBadge>
              </S.StatusBadgeGroup>
            </S.CardHeader>

            <S.FlightRoute>
              <S.RoutePoint>
                <S.RouteTime>{flight.departure.time}</S.RouteTime>
                <S.RouteCode>{flight.departure.code}</S.RouteCode>
                <S.RouteAirport>{flight.departure.airport}</S.RouteAirport>
              </S.RoutePoint>

              <S.RouteIndicator>
                <S.AirplaneIcon>✈</S.AirplaneIcon>
                <S.RouteLine />
                <S.RouteDuration>{flight.duration}</S.RouteDuration>
              </S.RouteIndicator>

              <S.RoutePoint>
                <S.RouteTime>{flight.arrival.time}</S.RouteTime>
                <S.RouteCode>{flight.arrival.code}</S.RouteCode>
                <S.RouteAirport>{flight.arrival.airport}</S.RouteAirport>
              </S.RoutePoint>
            </S.FlightRoute>
          </S.FlightCard>
        ))}
      </S.FlightListContainer>
    </S.PageContainer>
  );
};

export default FlightSchedule;
