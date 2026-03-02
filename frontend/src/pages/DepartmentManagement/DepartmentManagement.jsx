import React, { useEffect, useMemo, useState } from "react";
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
import { empService } from "../../api/emp/empService";

// 아이콘은 현재 dept.type이 사실상 고정이라 유지(원하면 제거 가능)
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

/* =========================
 *  Modal (간단 구현)
 * ========================= */
const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;
  return (
    <div
      onMouseDown={onClose}
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
          maxWidth: 560,
          background: "#fff",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
        }}
      >
        <div
          style={{
            padding: "18px 20px",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "transparent",
              cursor: "pointer",
              fontSize: 18,
            }}
            aria-label="close"
            title="닫기"
          >
            ×
          </button>
        </div>

        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
};

const Field = ({ label, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <span style={{ fontSize: 13, fontWeight: 800, color: "rgba(0,0,0,0.65)" }}>
      {label}
    </span>
    {children}
  </div>
);

const DepartmentManagement = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const q = useDebounced(searchTerm, 300);

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  //  Modal State
  // =========================
  const [menuOpenId, setMenuOpenId] = useState(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deactivateOpen, setDeactivateOpen] = useState(false);

  const [targetDept, setTargetDept] = useState(null);

  // create form
  const [cName, setCName] = useState("");
  const [cParentId, setCParentId] = useState(""); // "" -> null
  const [cManagerEmpId, setCManagerEmpId] = useState("");
  const [cDesc, setCDesc] = useState("");

  // edit form
  const [uName, setUName] = useState("");
  const [uManagerEmpId, setUManagerEmpId] = useState("");
  const [uDesc, setUDesc] = useState("");

  const [saving, setSaving] = useState(false);

  // 상위부서 선택용(현재 화면은 최상위 부서 목록이므로 parent 후보는 “최상위 부서”들만 일단 제공)
  // 필요하면 별도 API로 전체 부서 트리 내려받아도 됨.
  const parentOptions = useMemo(() => {
    return departments.map((d) => ({ id: d.id, name: d.name }));
  }, [departments]);

  const resetCreateForm = () => {
    setCName("");
    setCParentId("");
    setCManagerEmpId("");
    setCDesc("");
  };

  const openEditModal = (dept) => {
    setTargetDept(dept);
    setUName(dept?.name ?? "");
    // 백엔드 목록 응답 manager는 {name, role} 형태라 empId가 없음
    // 그래서 수정 모달에선 "부서장 EmpId"를 직접 입력하도록 설계(가장 단순/확실)
    setUManagerEmpId("");
    setUDesc(dept?.description ?? "");
    setEditOpen(true);
  };

  const openDeactivateModal = (dept) => {
    setTargetDept(dept);
    setDeactivateOpen(true);
  };

  // =========================
  //  Navigation / Click Policy
  // =========================
  // ✅ 변경 핵심: 최하위 부서(팀 0개)여도 항상 디테일로 이동
  const handleCardClick = (dept) => {
    navigate(`/dept-manage/detail/${dept.id}`);
  };

  // =========================
  //  Fetch list
  // =========================
  const fetchDepartments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await empService.getDepartments({ q, page: 0, size: 50 });

      // ApiResponse 래핑: { success, data, message }
      const page = res.data?.data;
      const content = page?.content ?? [];

      setDepartments(
        content.map((d) => ({
          id: d.id,
          name: d.name,
          type: "OPERATIONS",
          description: d.description ?? "설명 정보가 아직 등록되지 않았습니다.",
          manager: d.manager ?? { name: "미지정", role: "" },
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

  // =========================
  //  CRUD actions
  // =========================
  const handleCreate = async () => {
    // 최소 검증
    const name = cName.trim();
    if (!name) {
      alert("부서명을 입력하세요.");
      return;
    }

    const payload = {
      departmentName: name,
      parentDepartmentId: cParentId ? Number(cParentId) : null,
      managerEmpId: cManagerEmpId.trim() ? cManagerEmpId.trim() : null,
      description: cDesc.trim() ? cDesc.trim() : null,
    };

    try {
      setSaving(true);
      await empService.createDepartment(payload);
      setCreateOpen(false);
      resetCreateForm();
      await fetchDepartments();
      alert("부서가 생성되었습니다.");
    } catch (e) {
      const msg = e?.response?.data?.message || "부서 생성에 실패했습니다.";
      alert(msg);
      console.error("[DEPT][CREATE] error:", e?.response?.status, e?.response?.data);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!targetDept?.id) return;

    const payload = {
      departmentName: uName.trim() ? uName.trim() : null,
      // empCount는 백엔드에서 직접 수정 막는 정책이므로 보내지 않음
      managerEmpId: uManagerEmpId.trim() ? uManagerEmpId.trim() : null, // 비우면 변경 안 함. "해제"를 원하면 백엔드 정책에 따라 ""로 보내는 방식도 가능
      description: uDesc.trim() ? uDesc.trim() : null,
    };

    // ✅ UX: 부서명 비우면 저장 막기
    if (!payload.departmentName) {
      alert("부서명은 비워둘 수 없습니다.");
      return;
    }

    try {
      setSaving(true);
      await empService.updateDepartment(targetDept.id, payload);
      setEditOpen(false);
      setTargetDept(null);
      setUManagerEmpId("");
      await fetchDepartments();
      alert("부서 정보가 수정되었습니다.");
    } catch (e) {
      const msg = e?.response?.data?.message || "부서 수정에 실패했습니다.";
      alert(msg);
      console.error("[DEPT][UPDATE] error:", e?.response?.status, e?.response?.data);
    } finally {
      setSaving(false);
    }
  };

  const handleDeactivate = async () => {
    if (!targetDept?.id) return;
    try {
      setSaving(true);
      await empService.deactivateDepartment(targetDept.id);
      setDeactivateOpen(false);
      setTargetDept(null);
      await fetchDepartments();
      alert("부서가 비활성화되었습니다.");
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        "부서 비활성화에 실패했습니다. (하위 부서/활성 직원 존재 여부를 확인하세요.)";
      alert(msg);
      console.error("[DEPT][DEACTIVATE] error:", e?.response?.status, e?.response?.data);
    } finally {
      setSaving(false);
    }
  };

  // 바깥 클릭하면 카드 메뉴 닫기
  useEffect(() => {
    const onClick = () => setMenuOpenId(null);
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

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

        <CreateButton
          onClick={() => {
            resetCreateForm();
            setCreateOpen(true);
          }}
        >
          + 부서 생성
        </CreateButton>
      </ActionBar>

      {loading && <div style={{ padding: 12 }}>불러오는 중...</div>}
      {error && <div style={{ padding: 12, color: "crimson" }}>{error}</div>}

      <GridContainer>
        {departments.map((dept) => (
          <DepartmentCard
            key={dept.id}
            $type={dept.type}
            onClick={() => handleCardClick(dept)}
            style={{ position: "relative" }}
          >
            {/* 우측 상단 ⋯ 메뉴 */}
            <div style={{ position: "absolute", top: 14, right: 14, zIndex: 5 }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpenId((prev) => (prev === dept.id ? null : dept.id));
                }}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,0.10)",
                  background: "rgba(255,255,255,0.85)",
                  cursor: "pointer",
                  fontSize: 18,
                  lineHeight: "34px",
                }}
                title="메뉴"
              >
                ⋯
              </button>

              {menuOpenId === dept.id && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    marginTop: 8,
                    width: 160,
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.10)",
                    borderRadius: 12,
                    boxShadow: "0 12px 26px rgba(0,0,0,0.12)",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => {
                      setMenuOpenId(null);
                      openEditModal(dept);
                    }}
                    style={menuBtnStyle}
                  >
                    ✏️ 수정
                  </button>

                  <button
                    onClick={() => {
                      setMenuOpenId(null);
                      openDeactivateModal(dept);
                    }}
                    style={{ ...menuBtnStyle, color: "#b42318" }}
                  >
                    ⛔ 비활성화
                  </button>
                </div>
              )}
            </div>

            <CardHeader>
              <div className="icon-box">{getDepartmentIcon(dept.type)}</div>
              <h3>{dept.name}</h3>
            </CardHeader>

            <CardDescription>{dept.description}</CardDescription>

            <ManagerSection>
              <div className="avatar">{(dept.manager?.name ?? "미").charAt(0)}</div>
              <div className="info">
                {/* role은 백엔드가 내려주는 값이 없으면 빈 문자열일 수 있음 */}
                <span className="role">{dept.manager?.role || "부서장"}</span>
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

      {/* =========================
          Create Modal
         ========================= */}
      <Modal
        open={createOpen}
        title="부서 생성"
        onClose={() => {
          if (saving) return;
          setCreateOpen(false);
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="부서명 *">
            <input
              value={cName}
              onChange={(e) => setCName(e.target.value)}
              placeholder="예) 운항본부"
              style={inputStyle}
              disabled={saving}
            />
          </Field>

          <Field label="상위 부서(선택)">
            <select
              value={cParentId}
              onChange={(e) => setCParentId(e.target.value)}
              style={inputStyle}
              disabled={saving}
            >
              <option value="">(없음) 최상위 부서</option>
              {parentOptions.map((p) => (
                <option key={p.id} value={String(p.id)}>
                  {p.name}
                </option>
              ))}
            </select>
            <span style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>
              현재 화면은 최상위 부서 목록이라, 상위 부서 후보도 최상위 부서 기준으로만 제공합니다.
            </span>
          </Field>

          <Field label="부서장 EmpId(선택)">
            <input
              value={cManagerEmpId}
              onChange={(e) => setCManagerEmpId(e.target.value)}
              placeholder="예) hr01"
              style={inputStyle}
              disabled={saving}
            />
            <span style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>
              백엔드에서는 활성 직원(empStatus=Y)만 부서장으로 지정됩니다.
            </span>
          </Field>

          <Field label="부서 설명(선택)">
            <textarea
              value={cDesc}
              onChange={(e) => setCDesc(e.target.value)}
              placeholder="부서 역할/주요 업무를 간단히 작성"
              style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
              disabled={saving}
            />
          </Field>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 6 }}>
            <button onClick={() => setCreateOpen(false)} disabled={saving} style={secondaryBtnStyle}>
              취소
            </button>
            <button onClick={handleCreate} disabled={saving} style={primaryBtnStyle}>
              {saving ? "저장 중..." : "생성"}
            </button>
          </div>
        </div>
      </Modal>

      {/* =========================
          Edit Modal
         ========================= */}
      <Modal
        open={editOpen}
        title={`부서 수정${targetDept?.name ? ` - ${targetDept.name}` : ""}`}
        onClose={() => {
          if (saving) return;
          setEditOpen(false);
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="부서명 *">
            <input
              value={uName}
              onChange={(e) => setUName(e.target.value)}
              placeholder="부서명"
              style={inputStyle}
              disabled={saving}
            />
          </Field>

          <Field label="부서장 EmpId(선택)">
            <input
              value={uManagerEmpId}
              onChange={(e) => setUManagerEmpId(e.target.value)}
              placeholder="예) hr01 (비우면 변경하지 않음)"
              style={inputStyle}
              disabled={saving}
            />
            <span style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>
              현재 목록 응답에는 부서장 EmpId가 없어서, 수정 시 EmpId를 직접 입력하도록 구성했습니다.
              “부서장 해제” UX까지 원하면 백엔드 정책과 함께 맞춰서 개선 가능합니다.
            </span>
          </Field>

          <Field label="부서 설명(선택)">
            <textarea
              value={uDesc}
              onChange={(e) => setUDesc(e.target.value)}
              placeholder="부서 설명"
              style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
              disabled={saving}
            />
          </Field>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 6 }}>
            <button onClick={() => setEditOpen(false)} disabled={saving} style={secondaryBtnStyle}>
              취소
            </button>
            <button onClick={handleUpdate} disabled={saving} style={primaryBtnStyle}>
              {saving ? "저장 중..." : "저장"}
            </button>
          </div>
        </div>
      </Modal>

      {/* =========================
          Deactivate Modal
         ========================= */}
      <Modal
        open={deactivateOpen}
        title="부서 비활성화"
        onClose={() => {
          if (saving) return;
          setDeactivateOpen(false);
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ lineHeight: 1.6, color: "rgba(0,0,0,0.78)" }}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>
              [{targetDept?.name ?? "-"}] 부서를 비활성화할까요?
            </div>
            <div style={{ fontSize: 14 }}>
              비활성화는 소프트 삭제입니다. 일반 목록에서 제외되며, 데이터는 삭제되지 않습니다.
              <br />
              단, 백엔드 정책상 <b>하위 부서가 있거나</b> <b>활성 직원이 소속된 경우</b> 비활성화가
              거절됩니다.
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button onClick={() => setDeactivateOpen(false)} disabled={saving} style={secondaryBtnStyle}>
              취소
            </button>
            <button onClick={handleDeactivate} disabled={saving} style={{ ...dangerBtnStyle }}>
              {saving ? "처리 중..." : "비활성화"}
            </button>
          </div>
        </div>
      </Modal>
    </MainContainer>
  );
};

// ===== 스타일 유틸(컴포넌트 파일 내 간단 정의) =====
const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.14)",
  outline: "none",
  fontSize: 14,
};

const primaryBtnStyle = {
  padding: "10px 16px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  fontWeight: 800,
  background: "#111827",
  color: "#fff",
};

const secondaryBtnStyle = {
  padding: "10px 16px",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.14)",
  cursor: "pointer",
  fontWeight: 800,
  background: "#fff",
  color: "#111827",
};

const dangerBtnStyle = {
  padding: "10px 16px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  fontWeight: 800,
  background: "#b42318",
  color: "#fff",
};

const menuBtnStyle = {
  width: "100%",
  padding: "10px 12px",
  background: "#fff",
  border: "none",
  cursor: "pointer",
  textAlign: "left",
  fontWeight: 800,
};

export default DepartmentManagement;