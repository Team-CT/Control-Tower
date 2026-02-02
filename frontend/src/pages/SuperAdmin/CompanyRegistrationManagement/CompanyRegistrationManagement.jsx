import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './CompanyRegistrationManagement.styled';
import { airlineApplyService } from '../../../api/airline-apply/services';
import { accountActivationService } from '../../../api/account-activation/services';

const CompanyRegistrationManagement = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showAdminIdModal, setShowAdminIdModal] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [activationLink, setActivationLink] = useState('');
  const [showActivationLinkModal, setShowActivationLinkModal] = useState(false);

  // 데이터 로드
  useEffect(() => {
    fetchApplications();
  }, []);

  // 검색어 변경 시 자동 검색 (디바운스 적용)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchApplications();
    }, 300); // 300ms 디바운스

    return () => clearTimeout(timer);
  }, [searchKeyword]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await airlineApplyService.getApplications(searchKeyword);
      
      // 백엔드 데이터를 프론트엔드 형식으로 변환
      const formattedData = response.data.map(app => ({
        id: app.id,
        date: formatDate(app.date),
        airlineName: app.airlineName,
        email: app.email,
        documentStatus: formatDocumentStatus(app.documentStatus),
        status: app.status
      }));
      
      setApplications(formattedData);
    } catch (err) {
      console.error('데이터 로드 실패:', err);
      setError('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchSubmit = () => {
    fetchApplications();
  };

  const handleViewDetail = async (application) => {
    try {
      const response = await airlineApplyService.getApplicationDetail(application.id);
      setSelectedApplication(response.data);
      setModalType(application.status);
      // 승인된 경우 활성화 링크도 설정
      if (application.status === 'approved' && response.data.activationLink) {
        setActivationLink(response.data.activationLink);
      }
    } catch (err) {
      console.error('상세 정보 로드 실패:', err);
      alert('상세 정보를 불러오는데 실패했습니다.');
    }
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
    setModalType(null);
  };

  const handleApprove = () => {
    // 아이디 입력 모달 표시
    setShowAdminIdModal(true);
  };

  const handleConfirmApprove = async () => {
    if (!adminId || adminId.trim() === '') {
      alert('관리자 아이디를 입력해주세요.');
      return;
    }

    try {
      const response = await airlineApplyService.approveApplicationWithLink(selectedApplication.id, adminId);
      setActivationLink(response.data.activationLink);
      setShowAdminIdModal(false);
      setAdminId('');
      setShowActivationLinkModal(true);
      fetchApplications();
    } catch (err) {
      console.error('승인 실패:', err);
      const errorMessage = err.response?.data?.message || '승인 처리에 실패했습니다.';
      alert(errorMessage);
    }
  };

  const handleCancelAdminIdModal = () => {
    setShowAdminIdModal(false);
    setAdminId('');
  };

  const handleRegenerateLink = async (applicationId) => {
    try {
      const response = await accountActivationService.regenerateLink(applicationId);
      // 상세 정보 다시 로드하여 새로운 링크 가져오기
      const detailResponse = await airlineApplyService.getApplicationDetail(applicationId);
      const updatedApplication = {
        ...selectedApplication,
        ...detailResponse.data,
        activationLink: response.data.activationLink
      };
      setSelectedApplication(updatedApplication);
      setActivationLink(response.data.activationLink);
      return response.data;
    } catch (err) {
      console.error('링크 재발급 실패:', err);
      throw err;
    }
  };

  const handleReject = async () => {
    const reason = prompt('반려 사유를 입력해주세요:');
    if (!reason) {
      alert('반려 사유는 필수입니다.');
      return;
    }

    try {
      await airlineApplyService.rejectApplication(selectedApplication.id, reason);
      alert('반려되었습니다.');
      fetchApplications();
      handleCloseModal();
    } catch (err) {
      console.error('반려 실패:', err);
      alert('반려 처리에 실패했습니다.');
    }
  };

  // 날짜 포맷 변환 함수
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // 문서 상태 포맷 변환 함수
  const formatDocumentStatus = (status) => {
    if (status === 'PENDING') return '대기';
    if (status === 'APPROVED') return '승인';
    if (status === 'REJECTED') return '반려';
    return status;
  };

  if (loading) {
    return (
      <S.MainContainer>
        <S.ContentWrapper>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>데이터를 불러오는 중...</p>
          </div>
        </S.ContentWrapper>
      </S.MainContainer>
    );
  }

  if (error) {
    return (
      <S.MainContainer>
        <S.ContentWrapper>
          <div style={{ textAlign: 'center', padding: '50px', color: '#dc2626' }}>
            <p>{error}</p>
            <button onClick={fetchApplications} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
              다시 시도
            </button>
          </div>
        </S.ContentWrapper>
      </S.MainContainer>
    );
  }

  return (
    <S.MainContainer>
      <S.ContentWrapper>
        <S.PageHeader>
          <S.PageTitle>가입 신청 관리</S.PageTitle>
          <S.PageDescription>
            항공사 가입 신청을 검토하고 승인/반려 처리할 수 있습니다.
          </S.PageDescription>
        </S.PageHeader>

        <S.SearchSection>
          <S.SearchInputWrapper>
            <S.SearchIcon>🔍</S.SearchIcon>
            <S.SearchInput 
              placeholder="항공사명, 이메일 검색..." 
              value={searchKeyword}
              onChange={handleSearch}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
            />
          </S.SearchInputWrapper>
        </S.SearchSection>

        <S.TableContainer>
          <S.Table>
            <S.TableHead>
              <S.TableRow>
                <S.TableHeader>신청 일시</S.TableHeader>
                <S.TableHeader>항공사명</S.TableHeader>
                <S.TableHeader>담당자 이메일</S.TableHeader>
                <S.TableHeader>상태</S.TableHeader>
                <S.TableHeader>작업</S.TableHeader>
              </S.TableRow>
            </S.TableHead>
            <S.TableBody>
              {applications.length === 0 ? (
                <S.TableRow>
                  <S.TableCell colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
                    신청 내역이 없습니다.
                  </S.TableCell>
                </S.TableRow>
              ) : (
                applications.map((app) => (
                  <S.TableRow key={app.id}>
                    <S.TableCell>{app.date}</S.TableCell>
                    <S.TableCell>
                      <S.AirlineName>{app.airlineName}</S.AirlineName>
                    </S.TableCell>
                    <S.TableCell>{app.email}</S.TableCell>
                    <S.TableCell>
                      <S.DocumentStatusBadge $status={app.documentStatus}>
                        {app.documentStatus === '대기' && '⏱ 대기'}
                        {app.documentStatus === '승인' && '✓ 승인'}
                        {app.documentStatus === '반려' && '✗ 반려'}
                      </S.DocumentStatusBadge>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ViewDetailButton onClick={() => handleViewDetail(app)}>
                        👁 상세보기
                      </S.ViewDetailButton>
                    </S.TableCell>
                  </S.TableRow>
                ))
              )}
            </S.TableBody>
          </S.Table>
        </S.TableContainer>

        {/* Modals */}
        {modalType === 'pending' && selectedApplication && (
          <PendingModal
            application={selectedApplication}
            onClose={handleCloseModal}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}

        {modalType === 'approved' && selectedApplication && (
          <ApprovedModal
            application={selectedApplication}
            onClose={handleCloseModal}
            onRegenerateLink={handleRegenerateLink}
          />
        )}

        {modalType === 'rejected' && selectedApplication && (
          <RejectedModal
            application={selectedApplication}
            onClose={handleCloseModal}
          />
        )}

        {/* Admin ID Input Modal */}
        {showAdminIdModal && (
          <AdminIdInputModal
            adminId={adminId}
            setAdminId={setAdminId}
            onConfirm={handleConfirmApprove}
            onCancel={handleCancelAdminIdModal}
          />
        )}

        {/* Activation Link Modal */}
        {showActivationLinkModal && (
          <ActivationLinkModal
            activationLink={activationLink}
            onClose={() => {
              setShowActivationLinkModal(false);
              handleCloseModal();
            }}
          />
        )}
      </S.ContentWrapper>
    </S.MainContainer>
  );
};

// Pending Modal Component
const PendingModal = ({ application, onClose, onApprove, onReject }) => {
  // 완료된 단계 수 계산
  const completedSteps = 3; // 필수 서류 제출, 이메일 확인, 사업자 등록증 확인

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>가입 신청 상세 정보</S.ModalTitle>
          <S.CloseButton onClick={onClose}>✕</S.CloseButton>
        </S.ModalHeader>

        <S.ModalContent>
          {/* Progress Section */}
          <S.ProgressSection>
            <S.ProgressHeader>
              <S.ProgressIcon>⏱</S.ProgressIcon>
              <S.ProgressTitle>검증 절차</S.ProgressTitle>
              <S.ProgressCount>{completedSteps}/3</S.ProgressCount>
            </S.ProgressHeader>
            <S.ProgressBar $progress={(completedSteps / 3) * 100} />
            <S.ProgressStepsGrid>
              <S.ProgressStep $completed={true}>
                <S.StepIcon>✓</S.StepIcon>
                <S.StepLabel>필수 서류 제출</S.StepLabel>
                <S.StepDescription>모든 필수 서류가 제출되었습니다.</S.StepDescription>
              </S.ProgressStep>
              <S.ProgressStep $completed={true}>
                <S.StepIcon>✓</S.StepIcon>
                <S.StepLabel>이메일 확인 유효성</S.StepLabel>
                <S.StepDescription>이메일 확인이 완료되었습니다.</S.StepDescription>
              </S.ProgressStep>
              <S.ProgressStep $completed={true}>
                <S.StepIcon>✓</S.StepIcon>
                <S.StepLabel>사업자 등록증 확인</S.StepLabel>
                <S.StepDescription>사업자 등록증이 검토되었습니다.</S.StepDescription>
              </S.ProgressStep>
            </S.ProgressStepsGrid>
          </S.ProgressSection>

          {/* Company Information */}
          <S.InfoSection>
            <S.InfoItem>
              <S.InfoLabel>항공사명</S.InfoLabel>
              <S.InfoValue>🌐 {application.airlineName}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>담당자 이메일</S.InfoLabel>
              <S.InfoValue>{application.email}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>담당자 이름</S.InfoLabel>
              <S.InfoValue>👤 {application.managerName || '미입력'}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>담당자 전화번호</S.InfoLabel>
              <S.InfoValue>📞 {application.managerPhone || '미입력'}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>신청 일시</S.InfoLabel>
              <S.InfoValue>📅 {application.date}</S.InfoValue>
            </S.InfoItem>
          </S.InfoSection>

          {/* Attached Documents */}
          <S.DocumentSection>
            <S.DocumentTitle>첨부 서류</S.DocumentTitle>
            <S.DocumentList>
              {application.documents && application.documents.length > 0 ? (
                application.documents.map((doc, index) => (
                  <S.DocumentItem key={index}>
                    <S.DocumentIcon>📄</S.DocumentIcon>
                    <S.DocumentName>{doc.fileName}</S.DocumentName>
                    <S.DownloadLink 
                      href={`http://localhost:8001/api/file/download?path=${encodeURIComponent(doc.filePath)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      👁 보기
                    </S.DownloadLink>
                  </S.DocumentItem>
                ))
              ) : (
                <p style={{ color: '#999', textAlign: 'center' }}>첨부된 서류가 없습니다.</p>
              )}
            </S.DocumentList>
          </S.DocumentSection>

          {/* Current Status */}
          <S.StatusSection>
            <S.StatusLabel>현재 상태</S.StatusLabel>
            <S.StatusBadgeLarge $status="pending">
              ⏱ 대기 중
            </S.StatusBadgeLarge>
          </S.StatusSection>
        </S.ModalContent>

        <S.ModalFooter>
          <S.RejectButton onClick={onReject}>반려</S.RejectButton>
          <S.ApproveButton onClick={onApprove}>✓ 승인</S.ApproveButton>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

// Approved Modal Component
const ApprovedModal = ({ application, onClose, onRegenerateLink }) => {
  const navigate = useNavigate();
  const [regenerating, setRegenerating] = useState(false);
  const [currentLink, setCurrentLink] = useState(application.activationLink);

  // application.activationLink가 변경되면 currentLink도 업데이트
  useEffect(() => {
    setCurrentLink(application.activationLink);
  }, [application.activationLink]);

  const handleViewTenant = () => {
    if (application.airlineId) {
      navigate(`/super-admin/tenants/${application.airlineId}`);
    } else {
      alert('테넌트 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleCopyLink = () => {
    const linkToCopy = currentLink || application.activationLink;
    if (linkToCopy) {
      navigator.clipboard.writeText(linkToCopy).then(() => {
        alert('링크가 클립보드에 복사되었습니다.');
      }).catch(() => {
        alert('링크 복사에 실패했습니다.');
      });
    }
  };

  const handleRegenerateLink = async () => {
    if (!window.confirm('활성화 링크를 재발급하시겠습니까? 기존 링크는 더 이상 사용할 수 없습니다.')) {
      return;
    }

    try {
      setRegenerating(true);
      const result = await onRegenerateLink(application.id);
      // 새 링크로 상태 업데이트
      if (result && result.activationLink) {
        setCurrentLink(result.activationLink);
      }
      alert('활성화 링크가 재발급되었습니다.');
    } catch (err) {
      console.error('링크 재발급 실패:', err);
      const errorMessage = err.response?.data?.message || '링크 재발급에 실패했습니다.';
      alert(errorMessage);
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>가입 신청 상세 정보</S.ModalTitle>
          <S.CloseButton onClick={onClose}>✕</S.CloseButton>
        </S.ModalHeader>

        <S.ModalContent>
          <S.InfoSection>
            <S.InfoItem>
              <S.InfoLabel>항공사명</S.InfoLabel>
              <S.InfoValue>🌐 {application.airlineName}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>담당자 이메일</S.InfoLabel>
              <S.InfoValue>{application.email}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>담당자 이름</S.InfoLabel>
              <S.InfoValue>👤 {application.managerName || '미입력'}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>담당자 전화번호</S.InfoLabel>
              <S.InfoValue>📞 {application.managerPhone || '미입력'}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>신청 일시</S.InfoLabel>
              <S.InfoValue>📅 {application.date}</S.InfoValue>
            </S.InfoItem>
          </S.InfoSection>

          {/* Activation Link Section */}
          <S.InfoSection>
            <S.InfoItem>
              <S.InfoLabel>활성화 링크</S.InfoLabel>
              {(currentLink || application.activationLink) ? (
                <>
                  <div style={{ 
                    display: 'flex', 
                    gap: '10px', 
                    alignItems: 'center',
                    marginTop: '8px'
                  }}>
                    <input
                      type="text"
                      value={currentLink || application.activationLink}
                      readOnly
                      style={{
                        flex: 1,
                        padding: '10px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: '#f9fafb'
                      }}
                    />
                    <button
                      onClick={handleCopyLink}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      복사
                    </button>
                    <button
                      onClick={handleRegenerateLink}
                      disabled={regenerating}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: regenerating ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                        opacity: regenerating ? 0.6 : 1
                      }}
                    >
                      {regenerating ? '재발급 중...' : '재발급'}
                    </button>
                  </div>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                    ℹ️ 이 링크를 항공사 관리자에게 전달하여 계정 활성화를 완료하도록 안내하세요.
                  </p>
                </>
              ) : (
                <>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
                    활성화 링크가 없습니다. 재발급 버튼을 클릭하여 새 링크를 생성하세요.
                  </p>
                  <button
                    onClick={handleRegenerateLink}
                    disabled={regenerating}
                    style={{
                      marginTop: '12px',
                      padding: '10px 20px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: regenerating ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      opacity: regenerating ? 0.6 : 1
                    }}
                  >
                    {regenerating ? '재발급 중...' : '링크 재발급'}
                  </button>
                </>
              )}
            </S.InfoItem>
          </S.InfoSection>

          <S.DocumentSection>
            <S.DocumentTitle>첨부 서류</S.DocumentTitle>
            <S.DocumentList>
              {application.documents && application.documents.length > 0 ? (
                application.documents.map((doc, index) => (
                  <S.DocumentItem key={index}>
                    <S.DocumentIcon>📄</S.DocumentIcon>
                    <S.DocumentName>{doc.fileName}</S.DocumentName>
                    <S.DownloadLink 
                      href={`http://localhost:8001/api/file/download?path=${encodeURIComponent(doc.filePath)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      👁 보기
                    </S.DownloadLink>
                  </S.DocumentItem>
                ))
              ) : (
                <p style={{ color: '#999', textAlign: 'center' }}>첨부된 서류가 없습니다.</p>
              )}
            </S.DocumentList>
          </S.DocumentSection>

          <S.StatusSection>
            <S.StatusLabel>현재 상태</S.StatusLabel>
            <S.StatusBadgeLarge $status="approved">
              ✓ 승인됨
            </S.StatusBadgeLarge>
          </S.StatusSection>
        </S.ModalContent>

        <S.ModalFooter>
          {application.airlineId && (
            <S.ApproveButton onClick={handleViewTenant} style={{ marginRight: '10px' }}>
              🏢 테넌트 상세보기
            </S.ApproveButton>
          )}
          <S.CloseOnlyButton onClick={onClose}>닫기</S.CloseOnlyButton>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

// Rejected Modal Component
const RejectedModal = ({ application, onClose }) => {
  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>가입 신청 상세 정보</S.ModalTitle>
          <S.CloseButton onClick={onClose}>✕</S.CloseButton>
        </S.ModalHeader>

        <S.ModalContent>
          <S.InfoSection>
            <S.InfoItem>
              <S.InfoLabel>항공사명</S.InfoLabel>
              <S.InfoValue>🌐 {application.airlineName}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>담당자 이메일</S.InfoLabel>
              <S.InfoValue>{application.email}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>담당자 이름</S.InfoLabel>
              <S.InfoValue>👤 {application.managerName || '미입력'}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>담당자 전화번호</S.InfoLabel>
              <S.InfoValue>📞 {application.managerPhone || '미입력'}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>신청 일시</S.InfoLabel>
              <S.InfoValue>📅 {application.date}</S.InfoValue>
            </S.InfoItem>
          </S.InfoSection>

          <S.DocumentSection>
            <S.DocumentTitle>첨부 서류</S.DocumentTitle>
            <S.DocumentList>
              {application.documents && application.documents.length > 0 ? (
                application.documents.map((doc, index) => (
                  <S.DocumentItem key={index}>
                    <S.DocumentIcon>📄</S.DocumentIcon>
                    <S.DocumentName>{doc.fileName}</S.DocumentName>
                    <S.DownloadLink 
                      href={`http://localhost:8001/api/file/download?path=${encodeURIComponent(doc.filePath)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      👁 보기
                    </S.DownloadLink>
                  </S.DocumentItem>
                ))
              ) : (
                <p style={{ color: '#999', textAlign: 'center' }}>첨부된 서류가 없습니다.</p>
              )}
            </S.DocumentList>
          </S.DocumentSection>

          {application.cancelReason && (
            <S.InfoSection>
              <S.InfoItem>
                <S.InfoLabel>반려 사유</S.InfoLabel>
                <S.InfoValue style={{ color: '#dc2626' }}>{application.cancelReason}</S.InfoValue>
              </S.InfoItem>
            </S.InfoSection>
          )}

          <S.StatusSection>
            <S.StatusLabel>현재 상태</S.StatusLabel>
            <S.StatusBadgeLarge $status="rejected">
              ✗ 반려됨
            </S.StatusBadgeLarge>
          </S.StatusSection>
        </S.ModalContent>

        <S.ModalFooter>
          <S.CloseOnlyButton onClick={onClose}>닫기</S.CloseOnlyButton>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

// Admin ID Input Modal Component
const AdminIdInputModal = ({ adminId, setAdminId, onConfirm, onCancel }) => {
  return (
    <S.ModalOverlay onClick={onCancel}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
        <S.ModalHeader>
          <S.ModalTitle>관리자 아이디 입력</S.ModalTitle>
          <S.CloseButton onClick={onCancel}>✕</S.CloseButton>
        </S.ModalHeader>

        <S.ModalContent>
          <S.InfoSection>
            <S.InfoItem>
              <S.InfoLabel>항공사 최고 관리자 아이디</S.InfoLabel>
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="아이디를 입력하세요"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px',
                  marginTop: '8px'
                }}
                onKeyPress={(e) => e.key === 'Enter' && onConfirm()}
              />
            </S.InfoItem>
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
              ℹ️ 입력한 아이디로 항공사 관리자 계정이 생성됩니다.
            </p>
          </S.InfoSection>
        </S.ModalContent>

        <S.ModalFooter>
          <S.RejectButton onClick={onCancel}>취소</S.RejectButton>
          <S.ApproveButton onClick={onConfirm}>✓ 확인</S.ApproveButton>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

// Activation Link Modal Component
const ActivationLinkModal = ({ activationLink, onClose }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(activationLink).then(() => {
      alert('링크가 클립보드에 복사되었습니다.');
    }).catch(() => {
      alert('링크 복사에 실패했습니다.');
    });
  };

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <S.ModalHeader>
          <S.ModalTitle>계정 활성화 링크</S.ModalTitle>
          <S.CloseButton onClick={onClose}>✕</S.CloseButton>
        </S.ModalHeader>

        <S.ModalContent>
          <S.InfoSection>
            <S.InfoItem>
              <S.InfoLabel>활성화 링크</S.InfoLabel>
              <div style={{ 
                display: 'flex', 
                gap: '10px', 
                alignItems: 'center',
                marginTop: '8px'
              }}>
                <input
                  type="text"
                  value={activationLink}
                  readOnly
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '14px',
                    backgroundColor: '#f9fafb'
                  }}
                />
                <button
                  onClick={handleCopyLink}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  복사
                </button>
              </div>
            </S.InfoItem>
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '12px' }}>
              ℹ️ 이 링크를 항공사 관리자에게 전달하여 계정 활성화를 완료하도록 안내하세요.
            </p>
          </S.InfoSection>
        </S.ModalContent>

        <S.ModalFooter>
          <S.CloseOnlyButton onClick={onClose}>닫기</S.CloseOnlyButton>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default CompanyRegistrationManagement;