import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../api/axios';
import * as S from './QnA.styled';
import { useTheme } from 'styled-components'; // Import useTheme
import {
  Search, MessageSquare, CheckCircle2,
  Clock, Mail
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const QnA = () => {
  const theme = useTheme(); // Get theme context
  const { getRole, emp } = useAuthStore();
  
  // role 상태를 별도로 관리하여 emp가 로드된 후 업데이트
  const [userRole, setUserRole] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // emp가 로드되면 role 업데이트
  useEffect(() => {
    const role = getRole() || emp?.role;
    setUserRole(role);
    setIsAdmin(role === 'AIRLINE_ADMIN' || role === 'SUPER_ADMIN');
    console.log('QnA - userRole:', role, 'emp:', emp, 'isAdmin:', role === 'AIRLINE_ADMIN' || role === 'SUPER_ADMIN');
  }, [getRole, emp]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const [qnaList, setQnaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // ✅ 통합 모달: modalType으로 제어
  const [modalType, setModalType] = useState(null); // 'QUESTION' | 'EMAIL' | null
  
  // ✅ 통합 폼 상태: modalType에 따라 title/subject 필드명만 다르게 사용
  const [formData, setFormData] = useState({ 
    title: '',  // QUESTION용
    subject: '', // EMAIL용
    content: ''  // 공통
  });
  const [currentPage, setCurrentPage] = useState(0); // 백엔드는 0번부터 시작
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // 2. API 호출 로직

  const fetchQuestions = useCallback(async () => {
    try {
      setIsLoading(true);
      // 백엔드 엔드포인트에 page와 size 전달
      const response = await axios.get(`/api/questions?page=${currentPage}&size=10`);

      // Page 객체에서 content(목록)와 totalPages(전체 페이지) 추출
      const { content, totalPages } = response.data;

      setQnaList(content || []);
      setTotalPages(totalPages || 1);

      console.log("📦 받은 데이터:", response.data);
    } catch (error) {
      console.error("데이터를 불러오는데 실패했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]); // 페이지 바뀔 때마다 실행

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);



  const filteredList = qnaList.filter((item) => {
    const query = searchQuery.toLowerCase();

    // 제목, 내용, 작성자 이름 중 검색어가 포함된 것이 있는지 확인
    return (
      item.questionTitle?.toLowerCase().includes(query) ||
      item.questionContent?.toLowerCase().includes(query) ||
      item.questionerName?.toLowerCase().includes(query)
    );
  });

  // 2. handleSearch 함수는 이제 엔터를 쳤을 때 새로고침 방지만 하면 됩니다.
  const handleSearch = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    // 실제 필터링은 위에서 실시간(filteredList)으로 일어납니다.
  };

  // ✅ 토큰 가져오기 공통 함수
  const getAuthToken = () => {
    const storageData = localStorage.getItem('auth-storage');
    if (!storageData) {
      alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
      return null;
    }

    const parsedData = JSON.parse(storageData);
    const token = parsedData.state?.token;

    if (!token) {
      alert("유효한 토큰이 없습니다. 다시 로그인해주세요.");
      return null;
    }

    return token;
  };

  // ✅ 질문하기 등록
  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!formData.content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await axios.post('/api/questions', {
        title: formData.title,
        content: formData.content
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      alert("글이 성공적으로 등록되었습니다.");
      setModalType(null);
      setFormData({ title: '', subject: '', content: '' });
      fetchQuestions();
    } catch (error) {
      console.error("등록 실패 상세:", error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "등록 중 오류가 발생했습니다.";
      alert(errorMessage);
    }
  };

  // ✅ 이메일 문의 모달 열기 (prefill API 호출 제거)
  const handleOpenEmailModal = () => {
    setFormData({ title: '', subject: '', content: '' });
    setModalType('EMAIL');
  };

  // ✅ 이메일 문의 발송
  const handleSendEmail = async (e) => {
    e.preventDefault();

    if (!formData.subject.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!formData.content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await axios.post('/api/support/email/send', {
        subject: formData.subject,
        content: formData.content
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.data.success) {
        alert("이메일이 성공적으로 발송되었습니다.");
        setModalType(null);
        setFormData({ title: '', subject: '', content: '' });
      } else {
        const errorMessage = response.data.message || "이메일 발송에 실패했습니다.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("이메일 발송 실패:", error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "이메일 발송 중 오류가 발생했습니다.";
      alert(errorMessage);
    }
  };

  return (
    <S.PageContainer>
      <S.MainContent>
        <S.ContentWrapper>
          <S.PageHeader>
            <S.PageTitle>
              <MessageSquare size={28} />
              Q&A
            </S.PageTitle>
            <S.ButtonGroup>
              {!isAdmin && (
                <S.EmailButton onClick={handleOpenEmailModal}>
                  <Mail size={16} style={{ marginRight: '6px' }} />
                  이메일 문의
                </S.EmailButton>
              )}
              <S.CreateButton onClick={() => {
                setFormData({ title: '', subject: '', content: '' });
                setModalType('QUESTION');
              }}>+ 글쓰기</S.CreateButton>
            </S.ButtonGroup>
          </S.PageHeader>

          {/* ✅ 통합 모달: modalType에 따라 제목/필드/핸들러 변경 */}
          {modalType && (
            <S.ModalOverlay onClick={() => setModalType(null)}>
              <S.ModalContainer onClick={(e) => e.stopPropagation()}>
                <S.ModalHeader>
                  <h3>{modalType === 'QUESTION' ? '질문하기' : '이메일 문의'}</h3>
                  <button onClick={() => setModalType(null)}>×</button>
                </S.ModalHeader>
                <S.ModalBody onSubmit={modalType === 'QUESTION' ? handleCreatePost : handleSendEmail}>
                  <S.FormGroup>
                    <label>제목</label>
                    <input
                      type="text"
                      placeholder={modalType === 'QUESTION' ? '제목을 입력하세요' : '문의 제목을 입력하세요'}
                      value={modalType === 'QUESTION' ? formData.title : formData.subject}
                      onChange={(e) => {
                        if (modalType === 'QUESTION') {
                          setFormData({ ...formData, title: e.target.value });
                        } else {
                          setFormData({ ...formData, subject: e.target.value });
                        }
                      }}
                      maxLength={modalType === 'EMAIL' ? 200 : undefined}
                    />
                  </S.FormGroup>
                  <S.FormGroup>
                    <label>내용</label>
                    <textarea
                      placeholder={modalType === 'QUESTION' ? '내용을 상세히 입력해주세요' : '문의 내용을 상세히 입력해주세요'}
                      rows="10"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      maxLength={modalType === 'EMAIL' ? 5000 : undefined}
                    />
                  </S.FormGroup>
                  <S.ModalFooter>
                    <S.CancelButton type="button" onClick={() => setModalType(null)}>취소</S.CancelButton>
                    <S.SubmitButton type="submit">
                      {modalType === 'QUESTION' ? '등록하기' : '발송하기'}
                    </S.SubmitButton>
                  </S.ModalFooter>
                </S.ModalBody>
              </S.ModalContainer>
            </S.ModalOverlay>
          )}


          <S.SearchSection>
            <S.SearchForm onSubmit={handleSearch}>
              <S.SearchInput
                type="text"
                placeholder="제목, 내용, 작성자를 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <S.SearchButton type="submit">
                <Search size={20} />
              </S.SearchButton>
            </S.SearchForm>
            <S.FilterButton
              $active={selectedFilter === '최신순'}
              onClick={() => setSelectedFilter('최신순')}
            >
              최신순
            </S.FilterButton>
          </S.SearchSection>
          <S.QnaList>
            {filteredList.map((item) => (
              <S.QnaItem key={item.questionId}
                onClick={() => navigate(`/qna/${item.questionId}`)}>
                <S.CategoryBadge
                  $bgColor={item.answered ? theme.status.success : theme.status.warning}
                  $textColor={item.answered ? theme.text.inverse : theme.text.primary}
                >
                  {/* 상태에 따른 아이콘 렌더링 */}
                  {item.answered ? (
                    <CheckCircle2 size={14} style={{ marginRight: '4px' }} />
                  ) : (
                    <Clock size={14} style={{ marginRight: '4px' }} />
                  )}
                  {item.answered ? '답변완료' : '답변대기'}
                </S.CategoryBadge>

                <S.QnaContent>
                  <S.QnaTitle>{item.questionTitle}</S.QnaTitle>
                  <S.QnaMetaRow>
                    <S.QnaMeta>
                      <S.MetaItem>
                        <S.MetaIcon>👤</S.MetaIcon>
                        {item.questionerName}
                      </S.MetaItem>
                      <S.MetaItem>
                        <S.MetaIcon>📅</S.MetaIcon>
                        {item.createDate ? item.createDate.split('T')[0] : '-'}
                      </S.MetaItem>
                    </S.QnaMeta>
                  </S.QnaMetaRow>
                </S.QnaContent>
              </S.QnaItem>
            ))}
          </S.QnaList>
          {/* 페이지네이션 버튼 동적 생성 */}
          <S.Pagination>
            <S.PaginationButton
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
            >‹</S.PaginationButton>

            {[...Array(totalPages)].map((_, i) => (
              <S.PageNumber
                key={i}
                $active={currentPage === i}
                onClick={() => setCurrentPage(i)}
              >
                {i + 1}
              </S.PageNumber>
            ))}

            <S.PaginationButton
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
              disabled={currentPage >= totalPages - 1}
            >›</S.PaginationButton>
          </S.Pagination>
        </S.ContentWrapper>
      </S.MainContent>
    </S.PageContainer>
  );
};

export default QnA;