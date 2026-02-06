import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./FlightScheduleDetail.styled";
import { flightScheduleService } from "../../api/flightSchedule/services";
import { airportService } from "../../api/airport/services";
import { empService } from "../../api/emp/services";
import useAuthStore from "../../store/authStore";

const FlightScheduleDetail = () => {
  const navigate = useNavigate();
  const { flightId } = useParams();

  const { getRole } = useAuthStore();
  const userRole = getRole();
  const isAdmin = userRole === 'AIRLINE_ADMIN' || userRole === 'ADMIN' || userRole === 'SUPER_ADMIN';
  
  const [flightDetail, setFlightDetail] = useState(null);
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 승무원 추가 모달 관련 상태
  const [showAddCrewModal, setShowAddCrewModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

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

  // 승무원 추가 모달 열기
  const handleOpenAddCrewModal = async (role) => {
    console.log('승무원 추가 모달 열기 - 역할:', role);
    console.log('전달받은 role 값:', role);
    console.log('crewMembers 원본 데이터:', flightDetail?.crewMembers);
    
    setSelectedRole(role);
    setShowAddCrewModal(true);
    setSelectedEmployeeId('');
    
    try {
      // role이 대문자로 전달되어야 함 (PILOT, CABIN_CREW 등)
      const roleUpper = role ? role.toUpperCase() : null;
      console.log('직원 목록 조회 요청 - role (대문자 변환):', roleUpper);
      
      // 해당 역할의 직원 목록 조회 (role 필드로 조회)
      const response = await empService.getEmployees({ role: roleUpper });
      console.log('직원 목록 조회 응답:', response);
      
      const employees = response.data?.data || response.data || [];
      console.log('직원 목록:', employees);
      console.log('직원 수:', employees.length);
      console.log('각 직원의 role 필드:', employees.map(e => ({ empId: e.empId, role: e.role, job: e.job })));
      
      // 이미 배정된 직원 제외
      const assignedEmpIds = (flightDetail?.crewMembers || []).map(m => m.empId);
      console.log('배정된 직원 ID 목록:', assignedEmpIds);
      
      const available = employees.filter(emp => !assignedEmpIds.includes(emp.empId));
      console.log('추가 가능한 직원:', available);
      console.log('추가 가능한 직원 수:', available.length);
      
      setAvailableEmployees(available);
    } catch (error) {
      console.error('직원 목록 조회 실패:', error);
      console.error('에러 상세:', error.response?.data || error.message);
      alert(`직원 목록을 불러오는데 실패했습니다: ${error.response?.data?.message || error.message}`);
    }
  };
  
  // 승무원 추가
  const handleAddCrewMember = async () => {
    if (!selectedEmployeeId) {
      alert('직원을 선택해주세요.');
      return;
    }
    
    try {
      const flyScheduleId = Number(flightId);
      await flightScheduleService.addCrewMember(flyScheduleId, selectedEmployeeId);
      alert('승무원이 추가되었습니다.');
      setShowAddCrewModal(false);
      setSelectedEmployeeId('');
      loadFlightDetail(); // 목록 새로고침
    } catch (error) {
      console.error('승무원 추가 실패:', error);
      alert(error.response?.data?.message || '승무원 추가에 실패했습니다.');
    }
  };
  
  // 승무원 삭제
  const handleRemoveCrewMember = async (empId, empName, e) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
    
    if (!confirm(`정말로 "${empName}" 승무원을 삭제하시겠습니까?`)) {
      return;
    }
    
    try {
      const flyScheduleId = Number(flightId);
      await flightScheduleService.removeCrewMember(flyScheduleId, empId);
      alert('승무원이 삭제되었습니다.');
      loadFlightDetail(); // 목록 새로고침
    } catch (error) {
      console.error('승무원 삭제 실패:', error);
      alert(error.response?.data?.message || '승무원 삭제에 실패했습니다.');
    }
  };
  
  // 크루 멤버를 역할별로 그룹화
  const groupCrewByRole = (crewMembers) => {
    if (!crewMembers || crewMembers.length === 0) return [];

    const roleGroups = {};

    
    console.log('크루 멤버 그룹화 시작 - crewMembers:', crewMembers);
    
    crewMembers.forEach((member) => {
      // member.role은 실제 역할 필드 (PILOT, CABIN_CREW 등) - 백엔드에서 emp.getRole().name()으로 설정됨
      // member.job은 직업 필드 (예: "기장", "부기장", "승무원" 등)
      const role = member.role || '기타'; // 실제 역할 필드 사용
      const job = member.job || '';
      const roleStyle = getRoleStyle(role);

      // 역할별 그룹화
      
      console.log('멤버 처리:', {
        empId: member.empId,
        empName: member.empName,
        role: member.role, // 실제 역할 필드 (PILOT, CABIN_CREW 등)
        job: member.job // 직업 필드
      });
      
      // 역할별 그룹화 (role 필드 사용 - job이 아님!)
      if (!roleGroups[role]) {
        roleGroups[role] = [];
      }

      roleGroups[role].push({
        empId: member.empId,
        name: member.empName,
        role: job || getRoleName(role), // 화면에 표시할 역할명 (job 또는 한글 역할명)
        roleKey: role, // 실제 역할 키 (PILOT, CABIN_CREW 등) - API 호출에 사용
        status: '근무 가능',
        avatar: roleStyle.avatar,
        bgColor: roleStyle.bgColor
      });
    });
    
    console.log('그룹화 결과:', roleGroups);

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
        crewPositions.map((position) => {
          // 역할 키 찾기 (첫 번째 멤버의 roleKey 사용)
          const roleKey = position.members[0]?.roleKey || 'PILOT';
          
          return (
          <S.CrewSection key={position.id}>
            <S.CrewSectionHeader>
              <S.CrewSectionTitle>{position.title}</S.CrewSectionTitle>
              {isAdmin && (
                <S.AddCrewButton onClick={() => handleOpenAddCrewModal(roleKey)}>
                  + 승무원 추가
                </S.AddCrewButton>
              )}
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
                    {isAdmin && (
                      <S.DeleteCrewButton
                        onClick={(e) => handleRemoveCrewMember(member.empId, member.name, e)}
                        title="승무원 삭제"
                      >
                        🗑️
                      </S.DeleteCrewButton>
                    )}
                  </S.CrewMemberRight>
                </S.CrewMemberCard>
              ))}
            </S.CrewMemberList>
          </S.CrewSection>
          );
        })
      ) : (
        <S.CrewSection>
          <S.CrewSectionHeader>
            <S.CrewSectionTitle>배정된 승무원이 없습니다</S.CrewSectionTitle>
            {isAdmin && (
              <S.AddCrewButton onClick={() => handleOpenAddCrewModal('PILOT')}>
                + 승무원 추가
              </S.AddCrewButton>
            )}
          </S.CrewSectionHeader>
        </S.CrewSection>
      )}
      
      {/* 승무원 추가 모달 */}
      {showAddCrewModal && (
        <S.ModalOverlay onClick={() => setShowAddCrewModal(false)}>
          <S.ModalContainer onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>승무원 추가</S.ModalTitle>
              <S.CloseButton onClick={() => setShowAddCrewModal(false)}>×</S.CloseButton>
            </S.ModalHeader>
            <S.ModalContent>
              <S.FormGroup>
                <S.FormLabel>직원 선택 *</S.FormLabel>
                <S.EmployeeSelect
                  value={selectedEmployeeId}
                  onChange={(e) => setSelectedEmployeeId(e.target.value)}
                >
                  <option value="">직원을 선택하세요</option>
                  {availableEmployees.map((emp) => {
                    // @JsonProperty("emp_name")로 인해 JSON에서는 emp_name으로 옴
                    const empName = emp.emp_name || emp.empName || '이름 없음';
                    const job = emp.job || getRoleName(emp.role) || '직급 없음';
                    console.log('직원 옵션 렌더링:', { empId: emp.emp_id || emp.empId, empName, job, emp });
                    return (
                      <option key={emp.emp_id || emp.empId} value={emp.emp_id || emp.empId}>
                        {job} / {empName}
                      </option>
                    );
                  })}
                </S.EmployeeSelect>
              </S.FormGroup>
              {availableEmployees.length === 0 && (
                <S.EmptyMessage>
                  추가 가능한 직원이 없습니다.
                </S.EmptyMessage>
              )}
            </S.ModalContent>
            <S.FormActions>
              <S.CancelButton onClick={() => setShowAddCrewModal(false)}>취소</S.CancelButton>
              <S.SubmitButton onClick={handleAddCrewMember} disabled={!selectedEmployeeId}>
                추가
              </S.SubmitButton>
            </S.FormActions>
          </S.ModalContainer>
        </S.ModalOverlay>
      )}
    </S.PageContainer>
  );
};

export default FlightScheduleDetail;
