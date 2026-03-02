import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./EmployeeManagement.styled";
import { Search, Plus, MoreHorizontal, Phone } from "lucide-react";
import { empService } from "../../api/emp/empService"; // ✅ 네 서비스 경로에 맞춰

const EmployeeManagement = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("전체");

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const departments = ["전체", "인사팀", "운항팀", "객실승무팀", "정비팀", "IT지원팀"];

  // ✅ 로그인 유저의 airlineId로 교체 권장
  const airlineId = 1;

  const extractArray = (res) => {
    const root = res?.data;
    const payload = root?.data ?? root;
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.content)) return payload.content;
    return [];
  };

  const normalizeEmp = (emp) => ({
    // ✅ crewId는 상세 페이지로 넘길 핵심 값
    crewId: emp?.empId ?? emp?.emp_id, // 보통 empId(문자열 PK) 기반일 가능성 높음
    empNo: emp?.empNo ?? emp?.emp_no,
    empName: emp?.empName ?? emp?.emp_name,
    departmentName: emp?.departmentName ?? emp?.department_name,
    job: emp?.job ?? emp?.emp_job ?? emp?.position,
    phone: emp?.phone ?? emp?.emp_phone,
    email: emp?.email ?? emp?.emp_email,
    empStatus: emp?.empStatus ?? emp?.emp_status,
    startDate: emp?.startDate ?? emp?.start_date,
  });

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        airlineId,
        q: null,
        departmentId: null,
        empStatus: null,
        page: 0,
        size: 1000,
        sort: "empName,asc",
      };

      const res = await empService.getEmployeesForManagement(params);
      const rawList = extractArray(res);
      setEmployees(rawList.map(normalizeEmp));
    } catch (e) {
      console.error("직원 목록 조회 실패:", e);
      setError(e);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airlineId]);

  const filteredEmployees = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return employees.filter((emp) => {
      const deptOk =
        selectedDept === "전체" ||
        (emp.departmentName ?? "").trim() === selectedDept.trim();

      const searchOk =
        q.length === 0 ||
        (emp.empName ?? "").toLowerCase().includes(q) ||
        String(emp.empNo ?? "").toLowerCase().includes(q) ||
        (emp.departmentName ?? "").toLowerCase().includes(q);

      return deptOk && searchOk;
    });
  }, [employees, selectedDept, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  // ✅ 여기만 바꾸면 라우터와 100% 일치
  const handleRowClick = (crewId) => {
    if (!crewId) return;
    navigate(`/crew/${crewId}`);
  };

  return (
    <S.PageContainer>
      <S.ContentWrapper>
        <S.PageHeader>
          <S.HeaderLeft>
            <S.PageTitle>직원 관리</S.PageTitle>
            <S.EmployeeCount>총 {filteredEmployees.length}명</S.EmployeeCount>
          </S.HeaderLeft>
          <S.AddButton>
            <Plus size={20} />
            직원 등록
          </S.AddButton>
        </S.PageHeader>

        <S.FilterSection>
          <S.SearchForm onSubmit={handleSearch}>
            <Search size={20} color="#999" />
            <S.SearchInput
              placeholder="이름, 사번, 부서 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </S.SearchForm>

          <S.FilterGroup>
            {departments.map((dept) => (
              <S.FilterButton
                key={dept}
                $active={selectedDept === dept}
                onClick={() => setSelectedDept(dept)}
              >
                {dept}
              </S.FilterButton>
            ))}
          </S.FilterGroup>
        </S.FilterSection>

        {error && (
          <div style={{ padding: 12, color: "crimson" }}>
            에러 발생: {String(error?.message ?? error)}
          </div>
        )}

        <S.TableContainer>
          <S.Table>
            <thead>
              <tr>
                <S.Th>프로필</S.Th>
                <S.Th>사번</S.Th>
                <S.Th>이름</S.Th>
                <S.Th>부서</S.Th>
                <S.Th>직급</S.Th>
                <S.Th>연락처</S.Th>
                <S.Th>상태</S.Th>
                <S.Th>입사일</S.Th>
                <S.Th width="50px"></S.Th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} style={{ padding: 20 }}>
                    로딩중...
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: 20 }}>
                    결과가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <S.Tr
                    key={emp.crewId ?? `${emp.empNo}-${emp.empName}`}
                    onClick={() => handleRowClick(emp.crewId)}
                    style={{ cursor: "pointer" }}
                  >
                    <S.Td>
                      <S.ProfileImage color="#4A90E2">
                        {(emp.empName || "?").charAt(0)}
                      </S.ProfileImage>
                    </S.Td>

                    <S.Td>{emp.empNo ?? "-"}</S.Td>

                    <S.Td>
                      <S.NameInfo>
                        <S.Name>{emp.empName ?? "-"}</S.Name>
                        {emp.email ? <S.Email>{emp.email}</S.Email> : null}
                      </S.NameInfo>
                    </S.Td>

                    <S.Td>
                      <S.DepartmentBadge>{emp.departmentName ?? "-"}</S.DepartmentBadge>
                    </S.Td>

                    <S.Td>{emp.job ?? "-"}</S.Td>

                    <S.Td>
                      <S.ContactInfo>
                        <Phone size={14} /> {emp.phone ?? "-"}
                      </S.ContactInfo>
                    </S.Td>

                    <S.Td>
                      <S.StatusBadge $status={emp.empStatus}>
                        {emp.empStatus ?? "-"}
                      </S.StatusBadge>
                    </S.Td>

                    <S.Td>
                      {emp.startDate ? String(emp.startDate).slice(0, 10) : "-"}
                    </S.Td>

                    <S.Td>
                      <S.MoreButton onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal size={20} />
                      </S.MoreButton>
                    </S.Td>
                  </S.Tr>
                ))
              )}
            </tbody>
          </S.Table>
        </S.TableContainer>
      </S.ContentWrapper>
    </S.PageContainer>
  );
};

export default EmployeeManagement;