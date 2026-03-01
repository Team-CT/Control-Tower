import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MainContainer,
  BackButton,
  ContentWrapper,
  InfoCard,
  CardHeader,
  ActionGroup,
  StatsGrid,
  StatItem,
  TabNavigation,
  TabItem,
  TableSection,
  SectionHeader,
  TeamTable,
  TableHeader,
  TableRow,
  StatusBadge,
} from "./DepartmentDetail.styled";
import { empService } from "../../api/emp/empService";

const DepartmentDetail = () => {
  const navigate = useNavigate();
  const { deptId } = useParams();

  const [activeTab, setActiveTab] = useState("teams");
  const [deptInfo, setDeptInfo] = useState(null);
  const [subTeams, setSubTeams] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * ✅ 상세 제공 정책:
   * - 이 화면은 "최하위 조직(Teams)"을 직접 거느린 상위 부서만 보여준다.
   * - 상세 API 응답에서 subTeams가 0개면 상세 대상이 아님 → 안내 처리
   */
  const fetchDetail = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await empService.getDepartmentDetail(deptId);
      const payload = res.data?.data; // ApiResponse 래핑

      const info = payload?.deptInfo ?? null;
      const teams = payload?.subTeams ?? [];

      // ✅ 방어 로직: subTeams가 없으면 상세 제공 X
      if (info && teams.length === 0) {
        setDeptInfo(null);
        setSubTeams([]);
        setError(
          "이 부서는 팀(최하위 조직)을 직접 포함하지 않아 상세 화면을 제공하지 않습니다."
        );
        return;
      }

      setDeptInfo(info);
      setSubTeams(teams);
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        "부서 상세를 불러오지 못했습니다.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!deptId) return;
    fetchDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deptId]);

  return (
    <MainContainer>
      <BackButton onClick={() => navigate("/dept-manage")}>
        ← 부서 목록으로 돌아가기
      </BackButton>
      {loading && <div style={{ padding: 12 }}>불러오는 중...</div>}

      {error && (
        <div style={{ padding: 12, color: "crimson" }}>
          {error}
          <div style={{ marginTop: 8 }}>
            <button
              onClick={() => navigate("/dept-manage")}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #ddd",
                cursor: "pointer",
              }}
            >
              목록으로 이동
            </button>
          </div>
        </div>
      )}

      {!loading && !error && deptInfo && (
        <ContentWrapper>
          <InfoCard>
            <CardHeader>
              <div className="title-group">
                
                <div>
                  {/* ✅ 영문명(engName) 제거: 없는 정보는 UI에서 아예 안 보여주기 */}
                  <h1>{deptInfo.name}</h1>
                </div>
              </div>

              {/* ✅ 연결 안 된 버튼/없는 기능은 디자인적으로 제거(필요하면 다시 살릴 수 있음) */}
              {/* <ActionGroup>
                <button className="secondary">정보 수정</button>
                <button className="primary">+ 팀원 배정</button>
              </ActionGroup> */}
              <ActionGroup />
            </CardHeader>

            {/* ✅ 실데이터 중심으로 축소: manager / totalMembers만 유지 */}
            <StatsGrid>
              <StatItem>
                <span className="label">부서장</span>
                <strong className="value">{deptInfo.manager ?? "-"}</strong>
              </StatItem>
              <StatItem>
                <span className="label">총 인원</span>
                <strong className="value">{deptInfo.totalMembers ?? 0}명</strong>
              </StatItem>
            </StatsGrid>
          </InfoCard>

          {/* ✅ budget 탭 삭제 (없는 기능을 탭에 남겨두면 UX가 산만해짐) */}
          <TabNavigation>
            <TabItem
              $isActive={activeTab === "teams"}
              onClick={() => setActiveTab("teams")}
            >
              하위 조직 (Teams)
            </TabItem>
            <TabItem
              $isActive={activeTab === "members"}
              onClick={() => setActiveTab("members")}
            >
              구성원 목록
            </TabItem>
          </TabNavigation>

          {/* ✅ teams 탭에서만 팀 목록 보여주기 */}
          {activeTab === "teams" && (
            <TableSection>
              <SectionHeader>
                <h3>소속 팀 목록 ({subTeams.length}개)</h3>

                {/* ✅ 팀 추가도 아직 미연동이면 삭제가 더 깔끔 (원하면 주석 해제) */}
                {/* <button className="add-btn">+ 팀 추가</button> */}
              </SectionHeader>

              <TeamTable>
                <TableHeader>
                  <div className="col-id">No</div>
                  <div className="col-name">팀 명</div>
                  <div className="col-leader">팀장</div>
                  <div className="col-count">인원</div>
                  <div className="col-action">관리</div>
                </TableHeader>

                {subTeams.map((team, index) => (
                  <TableRow key={team.id ?? index}>
                    <div className="col-id">{index + 1}</div>
                    <div className="col-name">{team.name}</div>
                    <div className="col-leader">{team.leader ?? "-"}</div>
                    <div className="col-count">
                      <StatusBadge>{team.count ?? 0}명</StatusBadge>
                    </div>
                    <div className="col-action">
                      <span className="link">상세</span>
                    </div>
                  </TableRow>
                ))}
              </TeamTable>
            </TableSection>
          )}

          {/* ✅ members 탭은 이후 확장 (탭을 남길지 여부는 네 정책에 따라) */}
          {activeTab === "members" && (
            <div style={{ padding: 12 }}>구성원 목록 (구현 예정)</div>
          )}
        </ContentWrapper>
      )}
    </MainContainer>
  );
};

export default DepartmentDetail;