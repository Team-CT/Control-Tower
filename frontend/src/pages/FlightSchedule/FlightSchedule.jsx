import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./FlightSchedule.styled";
import { flightScheduleService } from "../../api/flightSchedule/services";
import { airportService } from "../../api/airport/services";
import useAuthStore from "../../store/authStore";

const FlightSchedule = () => {
  const navigate = useNavigate();
  const { getRole, emp } = useAuthStore();
  const userRole = getRole();
  const isAdmin = userRole === 'AIRLINE_ADMIN' || userRole === 'ADMIN' || userRole === 'SUPER_ADMIN';
  const airlineId = emp?.airlineId;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [departureCity, setDepartureCity] = useState("all");
  const [arrivalCity, setArrivalCity] = useState("all");
  const [flightList, setFlightList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [airports, setAirports] = useState([]);
  const [availableDepartures, setAvailableDepartures] = useState([]);
  const [availableDestinations, setAvailableDestinations] = useState([]);

  // 비행편 목록 조회 (날짜 변경 시 자동 검색)
  useEffect(() => {
    loadFlightSchedules();
  }, [selectedDate]);

  // 비행편 목록이 변경되면 출발지/도착지 목록 업데이트
  useEffect(() => {
    updateAvailableAirports();
  }, [flightList]);

  const loadFlightSchedules = async () => {
    try {
      setLoading(true);
      const params = {};

      // 관리자인 경우 항공사 ID 추가
      if (isAdmin && airlineId) {
        params.airlineId = airlineId;
      }

      // 날짜 필터 추가 (선택한 날짜의 00:00:00 ~ 23:59:59)
      if (selectedDate) {
        const startDate = new Date(selectedDate);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(selectedDate);
        endDate.setHours(23, 59, 59, 999);

        // ISO 8601 형식으로 변환
        params.startDate = startDate.toISOString();
        params.endDate = endDate.toISOString();
      }

      // 출발지/도착지 필터 ("all"이 아닐 때만 파라미터 추가)
      if (departureCity && departureCity !== "all") {
        params.departure = departureCity;
      }
      if (arrivalCity && arrivalCity !== "all") {
        params.destination = arrivalCity;
      }

      const response = await flightScheduleService.getFlightSchedules(params);
      const flights = response.data?.data || response.data || [];
      setFlightList(flights);
    } catch (error) {
      console.error('비행편 목록 조회 실패:', error);
      alert('비행편 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 비행편 목록에서 출발지/도착지 추출
  const updateAvailableAirports = async () => {
    try {
      // 먼저 공항 목록 조회
      const airportResponse = await airportService.getAirports();
      const airportList = airportResponse.data?.data || airportResponse.data || [];
      setAirports(airportList);

      // 비행편 목록에서 출발지/도착지 추출
      const departures = [...new Set(flightList.map(flight => flight.departure).filter(Boolean))];
      const destinations = [...new Set(flightList.map(flight => flight.destination).filter(Boolean))];

      // 공항 정보와 매칭하여 정렬
      const departureAirports = departures
        .map(code => airportList.find(airport => airport.airportCode === code))
        .filter(Boolean)
        .sort((a, b) => (a.airportName || a.airportCode).localeCompare(b.airportName || b.airportCode));

      const destinationAirports = destinations
        .map(code => airportList.find(airport => airport.airportCode === code))
        .filter(Boolean)
        .sort((a, b) => (a.airportName || a.airportCode).localeCompare(b.airportName || b.airportCode));

      setAvailableDepartures(departureAirports);
      setAvailableDestinations(destinationAirports);
    } catch (error) {
      console.error('공항 정보 업데이트 실패:', error);
    }
  };

  const handleSearch = () => {
    loadFlightSchedules();
  };

  // 날짜 포맷팅
  const formatDate = (date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayName = days[date.getDay()];
    return `${month}월 ${day}일 (${dayName})`;
  };

  // 비행 상태 한글 변환
  const getStatusText = (status) => {
    const statusMap = {
      'DELAYED': '지연',
      'CANCELLED': '취소',
      'DEPARTED': '출발',
      'ARRIVED': '도착',
      'ASSIGNING': '배정중',
      'ASSIGNED': '배정완료'
    };
    return statusMap[status] || status;
  };

  // ✅ 필터링 로직: 관리자는 전체, 직원은 본인 배정 비행편만
  const displayedFlights = isAdmin
    ? flightList
    : flightList.filter(flight => flight.isAssignedToMe);

  return (
    <S.PageContainer>
      {/* Page Header */}
      <S.PageHeader>
        <S.HeaderLeft>
          <S.PageTitle>{isAdmin ? '전체 비행편 및 크루 관리' : '나의 비행 일정'}</S.PageTitle>
          <S.PageSubtitle>
            {isAdmin
              ? '모든 비행편의 운항 정보와 배정된 크루 현황을 관리합니다.'
              : '내가 배정된 비행 일정을 확인하고 상세 정보를 조회합니다.'}
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
          <S.DateInput
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
          />
        </S.FilterGroup>

        <S.FilterGroup>
          <S.FilterLabel>출발지</S.FilterLabel>
          <S.CitySelect
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
          >
            <option value="all">전체</option>
            {availableDepartures.map((airport) => (
              <option key={airport.airportCode} value={airport.airportCode}>
                {airport.airportCode} - {airport.airportName || airport.cityName || airport.airportCode}
              </option>
            ))}
          </S.CitySelect>
        </S.FilterGroup>

        <S.FilterGroup>
          <S.FilterLabel>도착지</S.FilterLabel>
          <S.CitySelect
            value={arrivalCity}
            onChange={(e) => setArrivalCity(e.target.value)}
          >
            <option value="all">전체</option>
            {availableDestinations.map((airport) => (
              <option key={airport.airportCode} value={airport.airportCode}>
                {airport.airportCode} - {airport.airportName || airport.cityName || airport.airportCode}
              </option>
            ))}
          </S.CitySelect>
        </S.FilterGroup>

        <S.SearchButton type="button" onClick={handleSearch}>검색</S.SearchButton>
      </S.FilterSection>

      {/* Flight List */}
      <S.FlightListContainer>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
            로딩 중...
          </div>
        ) : displayedFlights.length > 0 ? (
          displayedFlights.map((flight) => {
            // flyScheduleId 확인 및 로그
            if (!flight.flyScheduleId) {
              console.warn('비행편에 flyScheduleId가 없습니다:', flight);
            }

            return (
              <S.FlightCard
                key={flight.flyScheduleId}
                onClick={() => {
                  console.log('비행편 클릭 - flyScheduleId:', flight.flyScheduleId);
                  navigate(`/flightschedule/${flight.flyScheduleId}`);
                }}
                style={{ cursor: "pointer" }}
              >
                <S.CardHeader>
                  <S.FlightBadge>
                    <S.AirlineIcon>✈</S.AirlineIcon>
                    <div>
                      <S.FlightNumber>
                        {flight.flightNumber}
                        {!isAdmin && flight.isAssignedToMe && (
                          <span style={{ fontSize: '0.8em', marginLeft: '8px', color: '#4a90e2' }}>● 배정됨</span>
                        )}
                      </S.FlightNumber>
                      <S.FlightDate>
                        {formatDate(new Date(flight.flyStartTime))} • {flight.airlineName || '항공사'}
                      </S.FlightDate>
                    </div>
                  </S.FlightBadge>

                  <S.StatusBadgeGroup>
                    <S.StatusBadge $status="normal">
                      운항 {getStatusText(flight.flightStatus)}
                    </S.StatusBadge>
                    {flight.crewAssigned && (
                      <S.StatusBadge $status="assigned">
                        승무원 배정
                      </S.StatusBadge>
                    )}
                  </S.StatusBadgeGroup>
                </S.CardHeader>

                <S.FlightRoute>
                  <S.RoutePoint>
                    <S.RouteTime>{flight.departureTime}</S.RouteTime>
                    <S.RouteCode>{flight.departure}</S.RouteCode>
                    <S.RouteAirport>{flight.departure}</S.RouteAirport>
                  </S.RoutePoint>

                  <S.RouteIndicator>
                    <S.AirplaneIcon>✈</S.AirplaneIcon>
                    <S.RouteLine />
                    <S.RouteDuration>{flight.duration}</S.RouteDuration>
                  </S.RouteIndicator>

                  <S.RoutePoint>
                    <S.RouteTime>{flight.arrivalTime}</S.RouteTime>
                    <S.RouteCode>{flight.destination}</S.RouteCode>
                    <S.RouteAirport>{flight.destination}</S.RouteAirport>
                  </S.RoutePoint>
                </S.FlightRoute>
              </S.FlightCard>
            );
          })
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
            배정된 비행 일정이 없거나 조회 결과가 없습니다.
          </div>
        )}
      </S.FlightListContainer>
    </S.PageContainer>
  );
};

export default FlightSchedule;
