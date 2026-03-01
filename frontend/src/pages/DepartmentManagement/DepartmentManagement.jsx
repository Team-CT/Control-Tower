import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MainContainer,
  PageHeader,
  TitleSection,
  ActionBar,
  SearchInputWrapper,
  CreateButton,
  GridContainer,
  DepartmentCard,
  CardHeader,
  CardDescription,
  ManagerSection,
  StatsFooter,
} from "./DepartmentManagement.styled";
import { empService } from "../../api/emp/empService"; // ✅ 변경

const getDepartmentIcon = (type) => {
  switch (type) {
    case "CABIN":
      return "✈️";
    case "MAINTENANCE":
      return "🔧";
    default:
      return "🟦";
  }
};

// 간단 디바운스(요청 폭주 방지)
const useDebounced = (value, delay = 300) => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
};

const DepartmentManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const q = useDebounced(searchTerm, 300);

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * ✅ 정책:
   * - "최하위 조직(Teams)"을 직접 거느린 상위 부서만 상세 페이지 진입 허용
   * - 프론트 기준: totalTeams > 0 이면 상세 허용
   *
   * ⚠️ 단, 백엔드가 totalTeams를 목록에서 안 주는 경우가 있다면
   * - 아래 PRECHECK_ON_CLICK를 true로 두면 클릭 시 상세 API 1회 호출해서 subTeams로 판별 후 이동
   */
  const PRECHECK_ON_CLICK = false;

  const handleCardClick = async (dept) => {
    const totalTeams = dept?.stats?.totalTeams ?? 0;

    // 1) 기본(가장 가벼움): 목록 데이터(totalTeams)로 판별
    if (!PRECHECK_ON_CLICK) {
      if (totalTeams <= 0) {
        alert("이 조직은 팀(최하위 조직)을 직접 포함하지 않아 상세 화면을 제공하지 않습니다.");
        return;
      }
      navigate(`/dept-manage/detail/${dept.id}`);
      return;
    }

    // 2) 대안(정확도↑, 트래픽↑): 클릭 시 상세 API 호출로 subTeams 여부 확인
    try {
      setLoading(true);
      const res = await empService.getDepartmentDetail(dept.id); // ✅ 변경
      const teams = res.data?.data?.subTeams ?? [];
      if (teams.length === 0) {
        alert("이 조직은 팀(최하위 조직)을 직접 포함하지 않아 상세 화면을 제공하지 않습니다.");
        return;
      }
      navigate(`/dept-manage/detail/${dept.id}`);
    } catch (e) {
      alert("상세 진입 가능 여부를 확인하지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await empService.getDepartments({ q, page: 0, size: 50 }); // ✅ 변경

      // ✅ ApiResponse 래핑: { success, data, message }
      const page = res.data?.data;

      // Spring Page라면 content
      const content = page?.content ?? [];

      // ✅ 백엔드에서 description/manager 내려주기 시작하면 여기서 바로 바꿀 수 있음
      setDepartments(
        content.map((d) => ({
          id: d.id,
          name: d.name,
          type: "OPERATIONS",
          description: d.description ?? "설명 정보가 아직 등록되지 않았습니다.",
          manager: d.manager ?? { name: "미지정", role: "본부장" },
          stats: {
            totalMembers: d.totalMembers ?? 0,
            totalTeams: d.totalTeams ?? 0,
          },
        }))
      );
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        `부서 목록을 불러오지 못했습니다. (status=${e?.response?.status ?? "?"})`;
      setError(msg);
      console.error("[DEPT][LIST] error:", e?.response?.status, e?.response?.data, e?.config?.url);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <MainContainer>
      <PageHeader>
        <TitleSection>
          <h2>부서 관리</h2>
          <p>조직 구조를 한눈에 파악하고 새로운 부서를 생성하거나 관리하세요.</p>
        </TitleSection>
      </PageHeader>

      <ActionBar>
        <SearchInputWrapper>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="부서명 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInputWrapper>
        <CreateButton>+ 부서 생성</CreateButton>
      </ActionBar>

      {loading && <div style={{ padding: 12 }}>불러오는 중...</div>}
      {error && <div style={{ padding: 12, color: "crimson" }}>{error}</div>}

      <GridContainer>
        {departments.map((dept) => (
          <DepartmentCard key={dept.id} $type={dept.type} onClick={() => handleCardClick(dept)}>
            <CardHeader>
              <div className="icon-box">{getDepartmentIcon(dept.type)}</div>
              <h3>{dept.name}</h3>
            </CardHeader>

            <CardDescription>{dept.description}</CardDescription>

            <ManagerSection>
              <div className="avatar">{(dept.manager?.name ?? "미").charAt(0)}</div>
              <div className="info">
                <span className="role">{dept.manager?.role ?? "본부장"}</span>
                <span className="name">{dept.manager?.name ?? "미지정"}</span>
              </div>
            </ManagerSection>

            <StatsFooter>
              <div className="stat-item">
                <span className="icon">👥</span>
                <span>{dept.stats.totalMembers}명</span>
              </div>
              <div className="stat-item">
                <span className="icon">🏢</span>
                <span>총 {dept.stats.totalTeams}개 팀</span>
              </div>
            </StatsFooter>
          </DepartmentCard>
        ))}
      </GridContainer>
    </MainContainer>
  );
};

export default DepartmentManagement;