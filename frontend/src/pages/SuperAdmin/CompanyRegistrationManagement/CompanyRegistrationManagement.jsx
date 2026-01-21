import React, { useState } from 'react';
import * as S from './CompanyRegistrationManagement.styled';

const CompanyRegistrationManagement = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalType, setModalType] = useState(null); // 'pending', 'approved', 'rejected'

  // TODO: Zustand state mapping
  const applications = [
    {
      id: 1,
      date: '2026-01-20 14:30',
      airlineName: '대한항공',
      country: '대한민국',
      email: 'hr.manager@koreanair.com',
      verificationStatus: '완치',
      documentStatus: '대기',
      status: 'pending'
    },
    {
      id: 2,
      date: '2026-01-19 09:15',
      airlineName: '아시아나항공',
      country: '대한민국',
      email: 'contact@flyasiana.com',
      verificationStatus: '완치',
      documentStatus: '승인',
      status: 'approved'
    },
    {
      id: 3,
      date: '2026-01-18 16:45',
      airlineName: 'Singapore Airlines',
      country: 'Singapore',
      email: 'hr@singaporeair.com',
      verificationStatus: '완치',
      documentStatus: '대기',
      status: 'pending'
    },
    {
      id: 4,
      date: '2026-01-17 11:20',
      airlineName: 'Emirates',
      country: 'UAE',
      email: 'admin@gmail.com',
      verificationStatus: '불일치',
      documentStatus: '반려',
      status: 'rejected'
    },
    {
      id: 5,
      date: '2026-01-16 13:55',
      airlineName: '제주항공',
      country: '대한민국',
      email: 'hr@jejuair.net',
      verificationStatus: '완치',
      documentStatus: '승인',
      status: 'approved'
    }
  ];

  const handleViewDetail = (application) => {
    setSelectedApplication(application);
    setModalType(application.status);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
    setModalType(null);
  };

  const handleApprove = () => {
    // TODO: Zustand action - approve application
    console.log('Approved:', selectedApplication);
    handleCloseModal();
  };

  const handleReject = () => {
    // TODO: Zustand action - reject application
    console.log('Rejected:', selectedApplication);
    handleCloseModal();
  };

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
            <S.SearchInput placeholder="항공사명, 이메일, 국가 검색..." />
          </S.SearchInputWrapper>
        </S.SearchSection>

        <S.TableContainer>
          <S.Table>
            <S.TableHead>
              <S.TableRow>
                <S.TableHeader>신청 일시</S.TableHeader>
                <S.TableHeader>항공사명</S.TableHeader>
                <S.TableHeader>국가</S.TableHeader>
                <S.TableHeader>담당자 이메일</S.TableHeader>
                <S.TableHeader>도메인 검증</S.TableHeader>
                <S.TableHeader>상태</S.TableHeader>
                <S.TableHeader>작업</S.TableHeader>
              </S.TableRow>
            </S.TableHead>
            <S.TableBody>
              {applications.map((app) => (
                <S.TableRow key={app.id}>
                  <S.TableCell>{app.date}</S.TableCell>
                  <S.TableCell>
                    <S.AirlineName>{app.airlineName}</S.AirlineName>
                  </S.TableCell>
                  <S.TableCell>{app.country}</S.TableCell>
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
              ))}
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
            <S.InfoGrid>
              <S.InfoItem>
                <S.InfoLabel>항공사명</S.InfoLabel>
                <S.InfoValue>🌐 {application.airlineName}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>국가</S.InfoLabel>
                <S.InfoValue>{application.country}</S.InfoValue>
              </S.InfoItem>
            </S.InfoGrid>

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
            <S.InfoGrid>
              <S.InfoItem>
                <S.InfoLabel>항공사명</S.InfoLabel>
                <S.InfoValue>🌐 {application.airlineName}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>국가</S.InfoLabel>
                <S.InfoValue>{application.country}</S.InfoValue>
              </S.InfoItem>
            </S.InfoGrid>

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
            <S.InfoGrid>
              <S.InfoItem>
                <S.InfoLabel>항공사명</S.InfoLabel>
                <S.InfoValue>🌐 {application.airlineName}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>국가</S.InfoLabel>
                <S.InfoValue>{application.country}</S.InfoValue>
              </S.InfoItem>
            </S.InfoGrid>

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