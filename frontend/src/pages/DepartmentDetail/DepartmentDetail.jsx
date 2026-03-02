import React, { useEffect, useMemo, useState } from "react";
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

/* =========================
 *  공용 Modal / Field
 * ========================= */
const Modal = ({ open, title, children, onClose, disabled }) => {
  if (!open) return null;
  return (
    <div
      onMouseDown={() => {
        if (disabled) return;
        onClose?.();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 720,
          background: "#fff",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
        }}
      >
        <div
          style={{
            padding: "16px 18px",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>{title}</h3>
          <button
            onClick={() => !disabled && onClose?.()}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "transparent",
              cursor: disabled ? "not-allowed" : "pointer",
              fontSize: 18,
              opacity: disabled ? 0.5 : 1,
            }}
            aria-label="close"
            title="닫기"
          >
            ×
          </button>
        </div>
        <div style={{ padding: 18 }}>{children}</div>
      </div>
    </div>
  );
};

const Field = ({ label, children, hint }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <div style={{ fontSize: 13, fontWeight: 900, color: "rgba(0,0,0,0.65)" }}>
      {label}
    </div>
    {children}
    {hint ? <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>{hint}</div> : null}
  </div>
);

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.14)",
  outline: "none",
  fontSize: 14,
};

const btn = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.14)",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 900,
};

const btnPrimary = {
  ...btn,
  border: "none",
  background: "#111827",
  color: "#fff",
};

const btnDanger = {
  ...btn,
  border: "none",
  background: "#b42318",
  color: "#fff",
};

const textBtn = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontWeight: 900,
  padding: "6px 8px",
};

const textBtnDanger = {
  ...textBtn,
  color: "#b42318",
};

const DepartmentDetail = () => {
  const navigate = useNavigate();
  const { deptId } = useParams();

  const [activeTab, setActiveTab] = useState("teams");
  const [deptInfo, setDeptInfo] = useState(null);
  const [subTeams, setSubTeams] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // ===== 있는 정보만 유틸 =====
  const isPresent = (v) => {
    if (v === null || v === undefined) return false;
    if (typeof v === "string") return v.trim().length > 0;
    return true;
  };

  const getManagerText = (m) => {
    if (!isPresent(m)) return null;
    if (typeof m === "string") return m.trim() || null;
    if (typeof m === "object") {
      if (isPresent(m?.name)) return String(m.name).trim();
    }
    return null;
  };

  const deptName = useMemo(
    () => (isPresent(deptInfo?.name) ? deptInfo.name : "부서 상세"),
    [deptInfo]
  );

  const statItems = useMemo(() => {
    if (!deptInfo) return [];
    const items = [];

    const managerText = getManagerText(deptInfo.manager);
    if (isPresent(managerText)) items.push({ label: "부서장", value: managerText });

    const totalMembersRaw = deptInfo.totalMembers;
    if (totalMembersRaw !== null && totalMembersRaw !== undefined && totalMembersRaw !== "") {
      const n = Number(totalMembersRaw);
      items.push({
        label: "총 인원",
        value: Number.isFinite(n) ? `${n}명` : String(totalMembersRaw),
      });
    }
    return items;
  }, [deptInfo]);

  const tabs = useMemo(() => [{ key: "teams", label: "하위 조직(Departments)" }], []);

  // ===== fetch =====
  const fetchDetail = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await empService.getDepartmentDetail(deptId);
      const payload = res.data?.data;
      setDeptInfo(payload?.deptInfo ?? null);
      setSubTeams(Array.isArray(payload?.subTeams) ? payload.subTeams : []);
    } catch (e) {
      setError(e?.response?.data?.message || "부서 상세를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!deptId) return;
    fetchDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deptId]);

  // =========================
  // 하위부서(팀) 추가/수정/삭제 모달
  // =========================
  const [teamCreateOpen, setTeamCreateOpen] = useState(false);
  const [teamEditOpen, setTeamEditOpen] = useState(false);
  const [teamDeleteOpen, setTeamDeleteOpen] = useState(false);

  const [targetTeam, setTargetTeam] = useState(null);

  // create
  const [tName, setTName] = useState("");
  const [tLeaderEmpId, setTLeaderEmpId] = useState("");

  // edit
  const [uTName, setUTName] = useState("");
  const [uTLeaderEmpId, setUTLeaderEmpId] = useState("");

  const resetCreate = () => {
    setTName("");
    setTLeaderEmpId("");
  };

  const openEdit = (team) => {
    setTargetTeam(team);
    setUTName(isPresent(team?.name) ? team.name : "");
    setUTLeaderEmpId("");
    setTeamEditOpen(true);
  };

  const openDelete = (team) => {
    setTargetTeam(team);
    setTeamDeleteOpen(true);
  };

  // ✅ (팀=Department) 생성: POST /api/departments
  const createTeam = async () => {
    const name = tName.trim();
    if (!name) return alert("하위부서명을 입력하세요.");

    const payload = {
      departmentName: name,
      parentDepartmentId: Number(deptId),
      managerEmpId: tLeaderEmpId.trim() ? tLeaderEmpId.trim() : null,
      description: null,
    };

    try {
      setSaving(true);
      await empService.createDepartment(payload);
      setTeamCreateOpen(false);
      resetCreate();
      await fetchDetail();
      alert("하위부서가 추가되었습니다.");
    } catch (e) {
      alert(e?.response?.data?.message || "하위부서 추가에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  // ✅ 수정: PUT /api/departments/{teamId}
  const updateTeam = async () => {
    if (!targetTeam?.id) return;
    const name = uTName.trim();
    if (!name) return alert("하위부서명은 비워둘 수 없습니다.");

    const payload = {
      departmentName: name,
      managerEmpId: uTLeaderEmpId.trim() ? uTLeaderEmpId.trim() : null,
      description: null,
      empCount: null, // 백엔드에서 막는 정책이라 의미없지만, 보내지 않는 게 더 깔끔함
    };

    // empCount는 보내지 말자(완전 제거)
    delete payload.empCount;

    try {
      setSaving(true);
      await empService.updateDepartment(targetTeam.id, payload);
      setTeamEditOpen(false);
      setTargetTeam(null);
      await fetchDetail();
      alert("하위부서 정보가 수정되었습니다.");
    } catch (e) {
      alert(e?.response?.data?.message || "하위부서 수정에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  // ✅ 삭제(비활성화): DELETE /api/departments/{teamId}
  const deleteTeam = async () => {
    if (!targetTeam?.id) return;
    try {
      setSaving(true);
      await empService.deactivateDepartment(targetTeam.id);
      setTeamDeleteOpen(false);
      setTargetTeam(null);
      await fetchDetail();
      alert("하위부서가 비활성화되었습니다.");
    } catch (e) {
      alert(
        e?.response?.data?.message ||
          "하위부서 비활성화에 실패했습니다. (하위부서/활성직원 존재 여부를 확인하세요.)"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // 하위부서 상세 모달 + 구성원 관리
  // =========================
  const [teamDetailOpen, setTeamDetailOpen] = useState(false);

  const [teamMembers, setTeamMembers] = useState([]);
  const [memberEmpId, setMemberEmpId] = useState("");
  const [memberLoading, setMemberLoading] = useState(false);
  const [memberError, setMemberError] = useState("");

  // ✅ 백엔드 members API가 존재한다는 전제로 동작
  const openTeamDetail = async (team) => {
    setTargetTeam(team);
    setTeamDetailOpen(true);
    setTeamMembers([]);
    setMemberEmpId("");
    setMemberError("");

    if (!team?.id) return;
    try {
      setMemberLoading(true);
      // 팀(=하위부서) 직속 구성원만 보고 싶으니 includeChildren=false
      const res = await empService.getDepartmentMembers(team.id, { includeChildren: false });
      const list = res.data?.data ?? [];
      setTeamMembers(Array.isArray(list) ? list : []);
    } catch (e) {
      setMemberError(e?.response?.data?.message || "구성원 목록을 불러오지 못했습니다.");
    } finally {
      setMemberLoading(false);
    }
  };

  const refreshMembers = async () => {
    if (!targetTeam?.id) return;
    try {
      setMemberLoading(true);
      setMemberError("");
      const res = await empService.getDepartmentMembers(targetTeam.id, { includeChildren: false });
      const list = res.data?.data ?? [];
      setTeamMembers(Array.isArray(list) ? list : []);
    } catch (e) {
      setMemberError(e?.response?.data?.message || "구성원 목록을 불러오지 못했습니다.");
    } finally {
      setMemberLoading(false);
    }
  };

  const addMember = async () => {
    if (!targetTeam?.id) return;
    const empId = memberEmpId.trim();
    if (!empId) return alert("추가할 EmpId를 입력하세요.");

    try {
      setSaving(true);
      await empService.addDepartmentMember(targetTeam.id, empId);
      setMemberEmpId("");
      await refreshMembers();
      await fetchDetail(); // count 갱신
      alert("구성원이 추가되었습니다.");
    } catch (e) {
      alert(e?.response?.data?.message || "구성원 추가에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const removeMember = async (empId) => {
    if (!targetTeam?.id) return;
    if (!empId) return;
    if (!window.confirm(`EmpId=${empId} 를 부서에서 제거할까요?`)) return;

    try {
      setSaving(true);
      await empService.removeDepartmentMember(targetTeam.id, empId);
      await refreshMembers();
      await fetchDetail();
      alert("구성원이 제거되었습니다.");
    } catch (e) {
      alert(e?.response?.data?.message || "구성원 제거에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  // ===== 렌더 =====
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
              style={{ ...btn, padding: "8px 12px", borderRadius: 8 }}
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
                  <h1>{deptName}</h1>
                </div>
              </div>
              <ActionGroup />
            </CardHeader>

            {statItems.length > 0 ? (
              <StatsGrid>
                {statItems.map((it) => (
                  <StatItem key={it.label}>
                    <span className="label">{it.label}</span>
                    <strong className="value">{it.value}</strong>
                  </StatItem>
                ))}
              </StatsGrid>
            ) : (
              <div style={{ padding: 12, color: "rgba(0,0,0,0.55)" }}>
                표시할 요약 정보가 없습니다.
              </div>
            )}
          </InfoCard>

          <TabNavigation>
            {tabs.map((t) => (
              <TabItem
                key={t.key}
                $isActive={activeTab === t.key}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </TabItem>
            ))}
          </TabNavigation>

          {activeTab === "teams" && (
            <TableSection>
              <SectionHeader
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <h3 style={{ margin: 0 }}>하위부서 목록 ({subTeams.length}개)</h3>
                <button
                  style={btnPrimary}
                  onClick={() => {
                    resetCreate();
                    setTeamCreateOpen(true);
                  }}
                >
                  + 하위부서 추가
                </button>
              </SectionHeader>

              {subTeams.length === 0 ? (
                <div style={{ padding: 14, color: "rgba(0,0,0,0.60)" }}>
                  하위부서가 없습니다. 우측 상단에서 하위부서를 추가할 수 있습니다.
                </div>
              ) : (
                <TeamTable>
                  <TableHeader>
                    <div className="col-id">No</div>
                    <div className="col-name">부서 명</div>
                    <div className="col-leader">담당자</div>
                    <div className="col-count">인원</div>
                  </TableHeader>

                  {subTeams.map((team, index) => {
                    const teamName = isPresent(team?.name) ? team.name : "-";
                    const leaderText = isPresent(team?.leader) ? team.leader : "-";
                    const countNum = Number(team?.count);
                    const countText = Number.isFinite(countNum) ? `${countNum}명` : "0명";

                    return (
                      <TableRow
                        key={team?.id ?? index}
                        style={{ cursor: "pointer" }}
                        onClick={() => openTeamDetail(team)}
                        title="클릭하여 하위부서 상세 보기"
                      >
                        <div className="col-id">{index + 1}</div>
                        <div className="col-name" style={{ fontWeight: 900 }}>
                          {teamName}
                        </div>
                        <div className="col-leader">{leaderText}</div>
                        <div className="col-count">
                          <StatusBadge>{countText}</StatusBadge>
                        </div>

                        <div
                          className="col-action"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 6,
                          }}
                        >
                          <button style={textBtn} onClick={() => openEdit(team)}>
                            편집
                          </button>
                          <button style={textBtnDanger} onClick={() => openDelete(team)}>
                            비활성화
                          </button>
                        </div>
                      </TableRow>
                    );
                  })}
                </TeamTable>
              )}
            </TableSection>
          )}
        </ContentWrapper>
      )}

      {!loading && !error && !deptInfo && (
        <div style={{ padding: 12, color: "rgba(0,0,0,0.60)" }}>
          표시할 부서 정보가 없습니다.
        </div>
      )}

      {/* 하위부서 추가 모달 */}
      <Modal
        open={teamCreateOpen}
        title="하위부서 추가"
        onClose={() => setTeamCreateOpen(false)}
        disabled={saving}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="부서 명 *">
            <input
              value={tName}
              onChange={(e) => setTName(e.target.value)}
              placeholder="예) 객실운영팀"
              style={inputStyle}
              disabled={saving}
            />
          </Field>
          <Field label="담당자 EmpId(선택)" hint="담당자는 managerEmpId로 통일합니다.">
            <input
              value={tLeaderEmpId}
              onChange={(e) => setTLeaderEmpId(e.target.value)}
              placeholder="예) crew01"
              style={inputStyle}
              disabled={saving}
            />
          </Field>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button style={btn} onClick={() => setTeamCreateOpen(false)} disabled={saving}>
              취소
            </button>
            <button style={btnPrimary} onClick={createTeam} disabled={saving}>
              {saving ? "저장 중..." : "추가"}
            </button>
          </div>
        </div>
      </Modal>

      {/* 하위부서 편집 모달 */}
      <Modal
        open={teamEditOpen}
        title={`하위부서 수정${targetTeam?.name ? ` - ${targetTeam.name}` : ""}`}
        onClose={() => setTeamEditOpen(false)}
        disabled={saving}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="부서 명 *">
            <input
              value={uTName}
              onChange={(e) => setUTName(e.target.value)}
              placeholder="부서 명"
              style={inputStyle}
              disabled={saving}
            />
          </Field>
          <Field label="담당자 EmpId(선택)" hint='비우면 "변경하지 않음" 정책을 권장합니다.'>
            <input
              value={uTLeaderEmpId}
              onChange={(e) => setUTLeaderEmpId(e.target.value)}
              placeholder="예) crew01"
              style={inputStyle}
              disabled={saving}
            />
          </Field>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button style={btn} onClick={() => setTeamEditOpen(false)} disabled={saving}>
              취소
            </button>
            <button style={btnPrimary} onClick={updateTeam} disabled={saving}>
              {saving ? "저장 중..." : "저장"}
            </button>
          </div>
        </div>
      </Modal>

      {/* 하위부서 비활성화 모달 */}
      <Modal
        open={teamDeleteOpen}
        title="하위부서 비활성화"
        onClose={() => setTeamDeleteOpen(false)}
        disabled={saving}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ lineHeight: 1.6, color: "rgba(0,0,0,0.78)" }}>
            <div style={{ fontWeight: 900, marginBottom: 6 }}>
              [{targetTeam?.name ?? "-"}] 하위부서를 비활성화할까요?
            </div>
            <div style={{ fontSize: 14 }}>
              비활성화는 소프트 삭제입니다. 일반 목록에서 제외되며 데이터는 삭제되지 않습니다.
              <br />
              하위부서 또는 활성 직원이 존재하면 백엔드 정책상 거절될 수 있습니다.
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button style={btn} onClick={() => setTeamDeleteOpen(false)} disabled={saving}>
              취소
            </button>
            <button style={btnDanger} onClick={deleteTeam} disabled={saving}>
              {saving ? "처리 중..." : "비활성화"}
            </button>
          </div>
        </div>
      </Modal>

      {/* 하위부서 상세 모달 + 구성원 관리 */}
      <Modal
        open={teamDetailOpen}
        title={`하위부서 상세${targetTeam?.name ? ` - ${targetTeam.name}` : ""}`}
        onClose={() => setTeamDetailOpen(false)}
        disabled={saving}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: 12,
              padding: 14,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 900, color: "rgba(0,0,0,0.65)" }}>부서 명</div>
              <div style={{ fontWeight: 900 }}>{targetTeam?.name ?? "-"}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 900, color: "rgba(0,0,0,0.65)" }}>담당자</div>
              <div style={{ fontWeight: 900 }}>{targetTeam?.leader ?? "-"}</div>
            </div>
          </div>

          <div style={{ fontWeight: 900, fontSize: 15 }}>구성원</div>

          <Field label="EmpId로 추가">
            <div style={{ display: "flex", gap: 10 }}>
              <input
                value={memberEmpId}
                onChange={(e) => setMemberEmpId(e.target.value)}
                placeholder="예) emp01"
                style={inputStyle}
                disabled={saving}
              />
              <button style={btnPrimary} onClick={addMember} disabled={saving}>
                {saving ? "처리..." : "추가"}
              </button>
            </div>
          </Field>

          {memberLoading && <div style={{ color: "rgba(0,0,0,0.55)" }}>불러오는 중...</div>}
          {memberError && <div style={{ color: "crimson" }}>{memberError}</div>}

          {!memberLoading && !memberError && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {teamMembers.length === 0 ? (
                <div style={{ color: "rgba(0,0,0,0.60)" }}>구성원이 없습니다.</div>
              ) : (
                teamMembers.map((m, idx) => {
                  const empId = m?.empId ?? "";
                  const empName = m?.empName ?? "";
                  const label = empName ? `${empName} (${empId})` : empId;

                  return (
                    <div
                      key={empId || idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 10,
                        padding: "10px 12px",
                        border: "1px solid rgba(0,0,0,0.10)",
                        borderRadius: 10,
                      }}
                    >
                      <div style={{ fontWeight: 900 }}>{label || "-"}</div>
                      <button
                        style={{
                          ...textBtnDanger,
                          padding: "6px 10px",
                          borderRadius: 8,
                          border: "1px solid rgba(180,35,24,0.35)",
                        }}
                        disabled={saving || !empId}
                        onClick={() => removeMember(empId)}
                      >
                        제거
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button
              style={btn}
              disabled={saving}
              onClick={() => {
                setTeamDetailOpen(false);
                if (targetTeam) openEdit(targetTeam);
              }}
            >
              정보 수정
            </button>
            <button
              style={btnDanger}
              disabled={saving}
              onClick={() => {
                setTeamDetailOpen(false);
                if (targetTeam) openDelete(targetTeam);
              }}
            >
              비활성화
            </button>
          </div>
        </div>
      </Modal>
    </MainContainer>
  );
};

export default DepartmentDetail;