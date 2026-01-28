import React, { useState, useEffect } from 'react';
import * as S from './CompanyRegistrationManagement.styled';
import { airlineApplyService } from '../../../api/airline-apply/services';

const CompanyRegistrationManagement = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  // 데이터 로드
  useEffect(() => {
    fetchApplications();
  }, []);

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
        verificationStatus: app.verificationStatus ? '완치' : '불일치',
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

  const handleViewDetail = (application) => {
    setSelectedApplication(application);
    setModalType(application.status);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
    setModalType(null);
  };

  const handleApprove = async () => {
    try {
      await airlineApplyService.approveApplication(selectedApplication.id);
      alert('승인되었습니다.');
      fetchApplications();
      handleCloseModal();
    } catch (err) {
      console.error('승인 실패:', err);
      alert('승인 처리에 실패했습니다.');
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
                <S.TableHeader>도메인 검증</S.TableHeader>
                <S.TableHeader>상태</S.TableHeader>
                <S.TableHeader>작업</S.TableHeader>
              </S.TableRow>
            </S.TableHead>
            <S.TableBody>
              {applications.length === 0 ? (
                <S.TableRow>
                  <S.TableCell colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
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
                      <S.StatusBadge status={app.verificationStatus}>
                        {app.verificationStatus === '완치' ? '✓ 일치' : '✗ 불일치'}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>
                      <S.DocumentStatusBadge status={app.documentStatus}>
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
          />
        )}

        {modalType === 'rejected' && selectedApplication && (
          <RejectedModal
            application={selectedApplication}
            onClose={handleCloseModal}
          />
        )}
      </S.ContentWrapper>
    </S.MainContainer>
  );
};

// Pending Modal Component
const PendingModal = ({ application, onClose, onApprove, onReject }) => {
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
              <S.ProgressCount>4/4</S.ProgressCount>
            </S.ProgressHeader>
            <S.ProgressBar progress={100} />
            <S.ProgressStepsGrid>
              <S.ProgressStep completed>
                <S.StepIcon>✓</S.StepIcon>
                <S.StepLabel>이메일 도메인 검증</S.StepLabel>
                <S.StepDescription>이메일 도메인이 확인되었습니다.</S.StepDescription>
              </S.ProgressStep>
              <S.ProgressStep completed>
                <S.StepIcon>✓</S.StepIcon>
                <S.StepLabel>필수 서류 제출</S.StepLabel>
                <S.StepDescription>모든 필수 서류가 제출되었습니다.</S.StepDescription>
              </S.ProgressStep>
              <S.ProgressStep completed>
                <S.StepIcon>✓</S.StepIcon>
                <S.StepLabel>이메일 확인 유효성</S.StepLabel>
                <S.StepDescription>이메일 확인이 완료되었습니다.</S.StepDescription>
              </S.ProgressStep>
              <S.ProgressStep completed>
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
              <S.InfoLabel>신청 일시</S.InfoLabel>
              <S.InfoValue>📅 {application.date}</S.InfoValue>
            </S.InfoItem>
          </S.InfoSection>

          {/* Domain Verification */}
          <S.VerificationBox>
            <S.VerificationHeader>
              <S.VerificationIcon>ℹ️</S.VerificationIcon>
              <S.VerificationTitle>도메인 검증</S.VerificationTitle>
            </S.VerificationHeader>
            <S.VerificationMessage success>
              ✓ 이메일 도메인과 항공사명이 일치합니다.
            </S.VerificationMessage>
          </S.VerificationBox>

          {/* Attached Documents */}
          <S.DocumentSection>
            <S.DocumentTitle>첨부 서류</S.DocumentTitle>
            <S.DocumentList>
              <S.DocumentItem>
                <S.DocumentIcon>📄</S.DocumentIcon>
                <S.DocumentName>사업자등록증.pdf</S.DocumentName>
                <S.DownloadLink href="#">⬇ 다운로드</S.DownloadLink>
              </S.DocumentItem>
              <S.DocumentItem>
                <S.DocumentIcon>📄</S.DocumentIcon>
                <S.DocumentName>재직서.pdf</S.DocumentName>
                <S.DownloadLink href="#">⬇ 다운로드</S.DownloadLink>
              </S.DocumentItem>
            </S.DocumentList>
          </S.DocumentSection>

          {/* Current Status */}
          <S.StatusSection>
            <S.StatusLabel>현재 상태</S.StatusLabel>
            <S.StatusBadgeLarge status="pending">
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
const ApprovedModal = ({ application, onClose }) => {
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
              <S.InfoLabel>신청 일시</S.InfoLabel>
              <S.InfoValue>📅 {application.date}</S.InfoValue>
            </S.InfoItem>
          </S.InfoSection>

          <S.VerificationBox>
            <S.VerificationHeader>
              <S.VerificationIcon>ℹ️</S.VerificationIcon>
              <S.VerificationTitle>도메인 검증</S.VerificationTitle>
            </S.VerificationHeader>
            <S.VerificationMessage success>
              ✓ 이메일 도메인과 항공사명이 일치합니다.
            </S.VerificationMessage>
          </S.VerificationBox>

          <S.DocumentSection>
            <S.DocumentTitle>첨부 서류</S.DocumentTitle>
            <S.DocumentList>
              <S.DocumentItem>
                <S.DocumentIcon>📄</S.DocumentIcon>
                <S.DocumentName>사업자등록증.pdf</S.DocumentName>
                <S.DownloadLink href="#">⬇ 다운로드</S.DownloadLink>
              </S.DocumentItem>
            </S.DocumentList>
          </S.DocumentSection>

          <S.StatusSection>
            <S.StatusLabel>현재 상태</S.StatusLabel>
            <S.StatusBadgeLarge status="approved">
              ✓ 승인됨
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
              <S.InfoLabel>신청 일시</S.InfoLabel>
              <S.InfoValue>📅 {application.date}</S.InfoValue>
            </S.InfoItem>
          </S.InfoSection>

          <S.VerificationBox error>
            <S.VerificationHeader>
              <S.VerificationIcon>ℹ️</S.VerificationIcon>
              <S.VerificationTitle>도메인 검증</S.VerificationTitle>
            </S.VerificationHeader>
            <S.VerificationMessage error>
              ✗ 이메일 도메인과 항공사명이 일치하지 않습니다. 검토가 필요합니다.
            </S.VerificationMessage>
          </S.VerificationBox>

          <S.DocumentSection>
            <S.DocumentTitle>첨부 서류</S.DocumentTitle>
            <S.DocumentList>
              <S.DocumentItem>
                <S.DocumentIcon>📄</S.DocumentIcon>
                <S.DocumentName>사업자등록증.pdf</S.DocumentName>
                <S.DownloadLink href="#">⬇ 다운로드</S.DownloadLink>
              </S.DocumentItem>
            </S.DocumentList>
          </S.DocumentSection>

          <S.StatusSection>
            <S.StatusLabel>현재 상태</S.StatusLabel>
            <S.StatusBadgeLarge status="rejected">
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

export default CompanyRegistrationManagement;