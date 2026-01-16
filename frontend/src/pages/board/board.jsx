import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate 추가
import * as S from './board.styled';
import { Search, MessageSquare, Eye, MessageCircle, Heart, Send, X } from 'lucide-react';

const Board = () => {
  const navigate = useNavigate(); // ✅ 훅 사용
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('전체');
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 글쓰기 폼 데이터
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    content: '',
    attachments: ''
  });

  const boardTabs = ['전체', '공지사항', '사건사고'];
  
  const boardList = [
    {
      id: 1,
      category: '공지',
      categoryColor: '#FFE5E5',
      title: '2026년 건강검진 일정 안내',
      author: '인사팀',
      date: '2026-01-10',
      views: 1234,
      comments: 12,
      likes: 45
    },
    {
      id: 2,
      category: '공지',
      categoryColor: '#FFE5E5',
      title: '신규 휴무제 2주 프로그램 안내',
      author: '근태팀',
      date: '2026-01-08',
      views: 856,
      comments: 8,
      likes: 23
    },
    {
      id: 3,
      category: '답변',
      categoryColor: '#E5F3FF',
      title: '비행 일정 변경 관련 문의드립니다',
      author: '김민수',
      date: '2026-01-13',
      views: 142,
      comments: 5,
      likes: 12
    },
    // ... 나머지 데이터 생략 가능하지만 전체 코드 요청하셔서 유지 ...
    {
      id: 4,
      category: '사건사고',
      categoryColor: '#FFF9E5',
      title: '건강 프로그램 참여 이벤트 안내',
      author: '건강관리팀',
      date: '2026-01-12',
      views: 523,
      comments: 28,
      likes: 89
    },
    {
      id: 5,
      category: '답변',
      categoryColor: '#E5F3FF',
      title: '시차 적응 팁 공유합니다',
      author: '이영희',
      date: '2026-01-11',
      views: 267,
      comments: 15,
      likes: 34
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  // ✅ 게시글 클릭 시 상세 페이지로 이동
  const handlePostClick = (id) => {
    navigate(`/board/detail`); // 실제로는 `/board/detail/${id}` 처럼 ID를 넘겨야 함
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    handleCloseModal();
  };

  return (
    <S.PageContainer>
      <S.MainContent>
        <S.ContentWrapper>
          <S.PageHeader>
            <S.PageTitle>
              <MessageSquare size={28} />
              게시판
            </S.PageTitle>
            <S.CreateButton onClick={handleOpenModal}>+ 글쓰기</S.CreateButton>
          </S.PageHeader>

          <S.TabSection>
            {boardTabs.map((tab) => (
              <S.Tab
                key={tab}
                active={activeTab === tab}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </S.Tab>
            ))}
          </S.TabSection>

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
              active={selectedFilter === '최신순'}
              onClick={() => setSelectedFilter('최신순')}
            >
              최신순
            </S.FilterButton>
          </S.SearchSection>

          <S.BoardList>
            {boardList.map((item) => (
              <S.BoardItem 
                key={item.id} 
                onClick={() => handlePostClick(item.id)} // ✅ 클릭 이벤트 추가
              >
                <S.CategoryBadge bgColor={item.categoryColor}>
                  {item.category}
                </S.CategoryBadge>
                <S.BoardContent>
                  <S.BoardTitle>
                    {item.category === '공지' && '📌 '}
                    {item.title}
                  </S.BoardTitle>
                  <S.BoardMetaRow>
                    <S.BoardMeta>
                      <S.MetaItem>
                        <S.MetaIcon>👤</S.MetaIcon>
                        {item.author}
                      </S.MetaItem>
                      <S.MetaItem>
                        <S.MetaIcon>📅</S.MetaIcon>
                        {item.date}
                      </S.MetaItem>
                      <S.MetaItem>
                        <Eye size={14} />
                        {item.views}
                      </S.MetaItem>
                    </S.BoardMeta>
                    <S.BoardStats>
                      <S.StatItem>
                        <MessageCircle size={16} />
                        {item.comments}
                      </S.StatItem>
                      <S.StatItem>
                        <Heart size={16} />
                        {item.likes}
                      </S.StatItem>
                    </S.BoardStats>
                  </S.BoardMetaRow>
                </S.BoardContent>
              </S.BoardItem>
            ))}
          </S.BoardList>

          <S.Pagination>
            <S.PaginationButton disabled>‹</S.PaginationButton>
            <S.PageNumber active>1</S.PageNumber>
            <S.PageNumber>2</S.PageNumber>
            <S.PageNumber>3</S.PageNumber>
            <S.PageNumber>4</S.PageNumber>
            <S.PageNumber>5</S.PageNumber>
            <S.PaginationButton>›</S.PaginationButton>
          </S.Pagination>
        </S.ContentWrapper>
      </S.MainContent>
      
      {/* 글쓰기 모달 부분 생략 없이 유지 */}
      {isModalOpen && (
        <S.ModalOverlay onClick={handleCloseModal}>
          <S.ModalContainer onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle><Send size={24} />새 글 작성</S.ModalTitle>
              <S.CloseButton onClick={handleCloseModal}><X size={24} /></S.CloseButton>
            </S.ModalHeader>
            <S.ModalBody>
              <S.PostForm onSubmit={handleSubmit}>
                <S.FormGroup>
                  <S.FormLabel>카테고리</S.FormLabel>
                  <S.FormSelect name="category" value={formData.category} onChange={handleInputChange} required>
                    <option value="">카테고리 선택</option>
                    <option value="공지">공지</option>
                    <option value="일반">일반</option>
                  </S.FormSelect>
                </S.FormGroup>
                <S.FormGroup>
                  <S.FormLabel>제목</S.FormLabel>
                  <S.FormInput type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="제목 입력" required />
                </S.FormGroup>
                <S.FormGroup>
                  <S.FormLabel>내용</S.FormLabel>
                  <S.FormTextarea name="content" value={formData.content} onChange={handleInputChange} placeholder="내용 입력" rows={10} required />
                </S.FormGroup>
                <S.ModalFooter>
                  <S.CancelButton type="button" onClick={handleCloseModal}>취소</S.CancelButton>
                  <S.SubmitButton type="submit">등록하기</S.SubmitButton>
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