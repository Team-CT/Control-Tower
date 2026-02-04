import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./FlightScheduleDetail.styled";
import { flightScheduleService } from "../../api/flightSchedule/services";
import { airportService } from "../../api/airport/services";

const FlightScheduleDetail = () => {
  const navigate = useNavigate();
  const { flightId } = useParams();

  const [flightDetail, setFlightDetail] = useState(null);
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 비행편 상세 정보 조회
  useEffect(() => {
    if (flightId) {
      loadFlightDetail();
      loadAirports();
    }
  }, [flightId]);

  const loadFlightDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      // flightId를 숫자로 변환 (URL 파라미터는 문자열)
      const flyScheduleId = Number(flightId);

      if (isNaN(flyScheduleId)) {
        throw new Error(`유효하지 않은 비행편 ID: ${flightId}`);
      }

      console.log('비행편 상세 조회 요청 - flyScheduleId:', flyScheduleId);

      const response = await flightScheduleService.getFlightScheduleDetail(flyScheduleId);
      const data = response.data?.data || response.data;

      console.log('비행편 상세 조회 응답:', data);
      console.log('크루 멤버 데이터:', data?.crewMembers);
      console.log('크루 멤버 수:', data?.crewMembers?.length || 0);

      setFlightDetail(data);
    } catch (error) {
      console.error('비행편 상세 조회 실패:', error);
      console.error('에러 상세:', error.response?.data || error.message);
      setError('비행편 정보를 불러오는데 실패했습니다.');
      alert(`비행편 정보를 불러오는데 실패했습니다: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadAirports = async () => {
    try {
      const response = await airportService.getAirports();
      const airportList = response.data?.data || response.data || [];
      setAirports(airportList);
    } catch (error) {
      console.error('공항 목록 조회 실패:', error);
    }
  };
  console.log("현재 URL flightId =", flightId);
  // 공항 코드로 공항명 찾기
  const getAirportName = (airportCode) => {
    if (!airportCode) return '';
    const airport = airports.find(a => a.airportCode === airportCode);
    return airport ? (airport.airportName || airport.cityName || airportCode) : airportCode;
  };

  // 날짜 포맷팅
  const formatDate = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayName = days[date.getDay()];
    return `${month}월 ${day}일 (${dayName})`;
  };

  // 역할 한글 변환
  const getRoleName = (role) => {
    const roleMap = {
      'PILOT': '조종사',
      'CABIN_CREW': '객실승무원',
      'MAINTENANCE': '정비사',
      'GROUND_STAFF': '지상직',
      'AIRLINE_ADMIN': '항공사 관리자',
      'ADMIN': '관리자',
      'SUPER_ADMIN': '최상위 관리자'
    };
    return roleMap[role] || role;
  };

  // 역할별 그룹 제목
  const getGroupTitle = (role, count) => {
    const titleMap = {
      'PILOT': '운항 승무원',
      'CABIN_CREW': '객실 승무원',
      'MAINTENANCE': '정비 승무원',
      'GROUND_STAFF': '지상 승무원'
    };
    return `${titleMap[role] || getRoleName(role)} (${count}명)`;
  };

  // 역할별 아이콘 및 색상
  const getRoleStyle = (role) => {
    const styleMap = {
      'PILOT': { avatar: '👨‍✈️', bgColor: '#8b5cf6' },
      'CABIN_CREW': { avatar: '👩‍✈️', bgColor: '#10b981' },
      'MAINTENANCE': { avatar: '🔧', bgColor: '#3b82f6' },
      'GROUND_STAFF': { avatar: '👷', bgColor: '#f59e0b' }
    };
    return styleMap[role] || { avatar: '👤', bgColor: '#6b7280' };
  };

  // 크루 멤버를 역할별로 그룹화
  const groupCrewByRole = (crewMembers) => {
    if (!crewMembers || crewMembers.length === 0) return [];

    const roleGroups = {};

    crewMembers.forEach((member) => {
      const role = member.role || '기타';
      const job = member.job || '';
      const roleStyle = getRoleStyle(role);

      // 역할별 그룹화
      if (!roleGroups[role]) {
        roleGroups[role] = [];
      }

      roleGroups[role].push({
        empId: member.empId,
        name: member.empName,
        role: job || getRoleName(role),
        status: '근무 가능',
        avatar: roleStyle.avatar,
        bgColor: roleStyle.bgColor
      });
    });

    // 그룹을 배열로 변환 (우선순위: PILOT > CABIN_CREW > 기타)
    const groups = [];
    const priorityOrder = ['PILOT', 'CABIN_CREW', 'MAINTENANCE', 'GROUND_STAFF'];

    // 우선순위 순서대로 그룹 추가
    priorityOrder.forEach((role) => {
      if (roleGroups[role] && roleGroups[role].length > 0) {
        groups.push({
          id: groups.length + 1,
          title: getGroupTitle(role, roleGroups[role].length),
          members: roleGroups[role]
        });
      }
    });

    // 나머지 역할 추가
    Object.keys(roleGroups).forEach((role) => {
      if (!priorityOrder.includes(role) && roleGroups[role].length > 0) {
        groups.push({
          id: groups.length + 1,
          title: getGroupTitle(role, roleGroups[role].length),
          members: roleGroups[role]
        });
      }
    });

    return groups;
  };

  if (loading) {
    return (
      <S.PageContainer>
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          로딩 중...
        </div>
      </S.PageContainer>
    );
  }

  if (error || !flightDetail) {
    return (
      <S.PageContainer>
        <div style={{ padding: '40px', textAlign: 'center', color: '#dc2626' }}>
          {error || '비행편 정보를 찾을 수 없습니다.'}
        </div>
      </S.PageContainer>
    );
  }

  const crewPositions = groupCrewByRole(flightDetail.crewMembers || []);
  const departureAirportName = getAirportName(flightDetail.departure);
  const destinationAirportName = getAirportName(flightDetail.destination);

  return (
    <S.PageContainer>
      {/* 페이지 헤더 */}
      <S.PageHeader>
        <S.HeaderLeft>
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
              <S.FlightNumber>{flightDetail.flightNumber}</S.FlightNumber>
              <S.FlightDate>
                {formatDate(flightDetail.flyStartTime)} • {flightDetail.airlineName || '항공사'}
              </S.FlightDate>
            </div>
          </S.FlightBadge>
        </S.FlightSummaryHeader>

        <S.FlightRoute>
          <S.RoutePoint>
            <S.RouteTime>{flightDetail.departureTime || ''}</S.RouteTime>
            <S.RouteCode>{flightDetail.departure}</S.RouteCode>
            <S.RouteAirport>{departureAirportName}</S.RouteAirport>
          </S.RoutePoint>

          <S.RouteIndicator>
            <S.RoutePlaneIcon>✈</S.RoutePlaneIcon>
            <S.RouteLine />
            <S.RouteDuration>{flightDetail.duration || ''}</S.RouteDuration>
          </S.RouteIndicator>

          <S.RoutePoint>
            <S.RouteTime>{flightDetail.arrivalTime || ''}</S.RouteTime>
            <S.RouteCode>{flightDetail.destination}</S.RouteCode>
            <S.RouteAirport>{destinationAirportName}</S.RouteAirport>
          </S.RoutePoint>
        </S.FlightRoute>
      </S.FlightSummaryCard>

      {/* 승무원 목록 */}
      {crewPositions.length > 0 ? (
        crewPositions.map((position) => (
          <S.CrewSection key={position.id}>
            <S.CrewSectionHeader>
              <S.CrewSectionTitle>{position.title}</S.CrewSectionTitle>
            </S.CrewSectionHeader>

            <S.CrewMemberList>
              {position.members.map((member, index) => (
                <S.CrewMemberCard
                  key={member.empId || index}
                  onClick={() => navigate(`/crew/${member.empId}`)}
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
                        <S.CrewID>{member.empId}</S.CrewID>
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
        ))
      ) : (
        <S.CrewSection>
          <S.CrewSectionHeader>
            <S.CrewSectionTitle>배정된 승무원이 없습니다</S.CrewSectionTitle>
          </S.CrewSectionHeader>
        </S.CrewSection>
      )}
    </S.PageContainer>
  );
};

export default FlightScheduleDetail;
