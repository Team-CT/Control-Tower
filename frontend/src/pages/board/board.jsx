import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Board.styled';
import { Search, MessageSquare, Eye, Send, X } from 'lucide-react';

// ✅ 공통 axios 인스턴스 사용
import api, { uploadApi } from '../../api/axios'; 
// ↑ 경로는 프로젝트에 맞게 조정

const Board = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // --- [1] 상태 관리 ---
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('최신순');

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 페이징
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // 폼/파일
  const [formData, setFormData] = useState({ category: '', title: '', content: '' });
  const [selectedFiles, setSelectedFiles] = useState([]);

  // --- [2] API 호출 로직 ---
  const fetchPosts = useCallback(async (category, page = 0, keyword = '') => {
    try {
      setLoading(true);

      // ✅ axios params 사용 (배포 안전)
      const params = { page };
      if (category !== '전체') params.category = category;
      if (keyword) params.keyword = keyword;

      // ✅ baseURL은 config에서 DEV/PROD 자동 분기됨
      // 예: DEV는 /api 로 프록시, PROD는 https://api.yoojh.store/api
      const res = await api.get('/board/list', { params });

      const data = res.data || {};
      setBoardList(data.content || []);
      setTotalPages(data.totalPages || 0);
      setCurrentPage(data.number || 0);

    } catch (error) {
      console.error('게시글 로드 실패:', error);

      const status = error?.response?.status;
      if (status === 401) {
        alert('로그인이 필요합니다. 다시 로그인해 주세요.');
      } else if (status === 403) {
        alert('접근 권한이 없습니다.');
      } else {
        alert('게시글을 불러오지 못했습니다.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // 초기 로드 및 탭 변경
  useEffect(() => {
    fetchPosts(activeTab, 0, searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // --- [3] 이벤트 핸들러 ---
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = () => setIsModalOpen(true);

  const resetModal = () => {
    setFormData({ category: '', title: '', content: '' });
    setSelectedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetModal();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPosts(activeTab, 0, searchQuery);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // empId는 여전히 필요(작성자 저장용)
    let empId = null;
    try {
      const storageData = JSON.parse(localStorage.getItem('auth-storage'));
      empId = storageData?.state?.emp?.empId;
    } catch {}

    if (!empId) {
      alert('사원 정보가 없습니다. 다시 로그인해 주세요.');
      return;
    }

    // ✅ FormData 구성
    const formDataObj = new FormData();
    formDataObj.append('category', formData.category);
    formDataObj.append('title', formData.title);
    formDataObj.append('content', formData.content);
    formDataObj.append('writerId', empId);

    selectedFiles.forEach((file) => {
      formDataObj.append('files', file);
    });

    try {
      // ✅ 업로드 전용 인스턴스 사용 (Content-Type 강제 금지)
      const res = await uploadApi.post('/board/write', formDataObj);

      // 백엔드가 200/201 등으로 내려오는 경우 대응
      if (res.status >= 200 && res.status < 300) {
        alert('등록되었습니다.');
        handleCloseModal();
        fetchPosts(activeTab, 0, '');
      } else {
        alert('등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('글쓰기 실패:', error);

      const status = error?.response?.status;
      if (status === 401) alert('로그인이 필요합니다.');
      else if (status === 403) alert('권한이 없습니다.');
      else alert('글 등록에 실패했습니다.');
    }
  };

  // --- [4] 렌더링 ---
  return (
    <S.PageContainer>
      <S.MainContent>
        <S.ContentWrapper>

          <S.PageHeader>
            <S.PageTitle><MessageSquare size={28} /> 게시판</S.PageTitle>
            <S.CreateButton onClick={handleOpenModal}>+ 글쓰기</S.CreateButton>
          </S.PageHeader>

          <S.TabSection>
            {['전체', '공지사항', '사건사고'].map((tab) => (
              <S.Tab
                key={tab}
                $active={activeTab === tab}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </S.Tab>
            ))}
          </S.TabSection>

          <S.SearchSection>
            <S.SearchForm onSubmit={handleSearch}>
              <S.SearchInput
                placeholder="제목, 내용 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <S.SearchButton type="submit"><Search size={20} /></S.SearchButton>
            </S.SearchForm>

            <S.FilterButton
              $active={selectedFilter === '최신순'}
              onClick={() => fetchPosts(activeTab, 0, searchQuery)}
            >
              최신순
            </S.FilterButton>
          </S.SearchSection>

          <S.BoardList>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '50px' }}>데이터 로딩 중...</div>
            ) : boardList.length > 0 ? (
              boardList.map((item) => (
                <S.BoardItem
                  key={item.boardId}
                  onClick={() => navigate(`/board/detail/${item.boardId}`)}
                >
                  <S.CategoryBadge>{item.boardType}</S.CategoryBadge>
                  <S.BoardContent>
                    <S.BoardTitle>{item.boardTitle}</S.BoardTitle>
                    <S.BoardMetaRow>
                      <S.BoardMeta>
                        <S.MetaItem>👤 {item.writerName}</S.MetaItem>
                        <S.MetaItem>📅 {item.createDate}</S.MetaItem>
                        <S.MetaItem><Eye size={14} /> {item.boardCount}</S.MetaItem>
                      </S.BoardMeta>
                    </S.BoardMetaRow>
                  </S.BoardContent>
                </S.BoardItem>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '50px' }}>게시글이 존재하지 않습니다.</div>
            )}
          </S.BoardList>

          <S.Pagination>
            <S.PaginationButton
              onClick={() => fetchPosts(activeTab, currentPage - 1, searchQuery)}
              disabled={currentPage === 0}
            >‹</S.PaginationButton>

            {[...Array(totalPages)].map((_, idx) => (
              <S.PageNumber
                key={idx}
                $active={currentPage === idx}
                onClick={() => fetchPosts(activeTab, idx, searchQuery)}
              >
                {idx + 1}
              </S.PageNumber>
            ))}

            <S.PaginationButton
              onClick={() => fetchPosts(activeTab, currentPage + 1, searchQuery)}
              disabled={currentPage + 1 >= totalPages}
            >›</S.PaginationButton>
          </S.Pagination>

        </S.ContentWrapper>
      </S.MainContent>

      {isModalOpen && (
        <S.ModalOverlay onClick={handleCloseModal}>
          <S.ModalContainer onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle><Send size={24} /> 새 글 작성</S.ModalTitle>
              <S.CloseButton onClick={handleCloseModal}><X size={24} /></S.CloseButton>
            </S.ModalHeader>

            <S.ModalBody>
              <S.PostForm onSubmit={handleSubmit}>
                <S.FormGroup>
                  <S.FormLabel>카테고리</S.FormLabel>
                  <S.FormSelect
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">선택하세요</option>
                    <option value="공지사항">공지사항</option>
                    <option value="사건사고">사건사고</option>
                  </S.FormSelect>
                </S.FormGroup>

                <S.FormGroup>
                  <S.FormLabel>제목</S.FormLabel>
                  <S.FormInput
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </S.FormGroup>

                <S.FormGroup>
                  <S.FormLabel>내용</S.FormLabel>
                  <S.FormTextarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={10}
                    required
                  />
                </S.FormGroup>

                <S.FormGroup>
                  <S.FormLabel>파일 첨부</S.FormLabel>
                  <S.FormInput
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
                  />
                  <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                    {selectedFiles.map((file, index) => (
                      <div key={index}>📎 {file.name}</div>
                    ))}
                  </div>
                </S.FormGroup>

                <S.ModalFooter>
                  <S.CancelButton type="button" onClick={handleCloseModal}>취소</S.CancelButton>
                  <S.SubmitButton type="submit">등록</S.SubmitButton>
                </S.ModalFooter>
              </S.PostForm>
            </S.ModalBody>
          </S.ModalContainer>
        </S.ModalOverlay>
      )}
    </S.PageContainer>
  );
};

export default Board;