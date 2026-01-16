import React, { useState } from 'react';
import * as S from './styled';
import { Search, MessageSquare, Eye, MessageCircle, Heart, X, Send } from 'lucide-react';

const Board = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('전체');
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    content: '',
    attachments: ''
  });

  // TODO: Zustand state mapping
  const boardTabs = ['전체', '공지사항', '일반', '이벤트'];
  
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
    {
      id: 4,
      category: '이벤트',
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
    },
    {
      id: 6,
      category: '답변',
      categoryColor: '#E5F3FF',
      title: '휴가 상황 관련 문의',
      author: '박상수',
      date: '2026-01-10',
      views: 189,
      comments: 7,
      likes: 9
    },
    {
      id: 7,
      category: '답변',
      categoryColor: '#E5F3FF',
      title: '승무원 복지 프로그램 추천합니다',
      author: '최우수',
      date: '2026-01-09',
      views: 312,
      comments: 22,
      likes: 56
    },
    {
      id: 8,
      category: '답변',
      categoryColor: '#E5F3FF',
      title: '비행 중 건강 관리 방법',
      author: '최지영',
      date: '2026-01-09',
      views: 445,
      comments: 18,
      likes: 42
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search logic with Zustand
    console.log('Searching for:', searchQuery);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // TODO: Filter posts by tab with Zustand
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      category: '',
      title: '',
      content: '',
      attachments: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit post with Zustand
    console.log('Form submitted:', formData);
    handleCloseModal();
  };

  return (
    <S.PageContainer>
      <S.Sidebar>
        <S.Logo>
          <S.LogoIcon>✈️</S.LogoIcon>
          <S.LogoText>
            <div>SkyHR</div>
            <S.LogoSubtext>Airline HR SaaS System</S.LogoSubtext>
          </S.LogoText>
        </S.Logo>

        <S.NavSection>
          <S.NavItem>
            <S.NavIcon>🏠</S.NavIcon>
            <span>대시보드</span>
          </S.NavItem>
        </S.NavSection>

        <S.NavDivider>직원 관리</S.NavDivider>
        <S.NavSection>
          <S.NavItem>
            <S.NavIcon>👥</S.NavIcon>
            <span>직원 목록</span>
          </S.NavItem>
          <S.NavItem>
            <S.NavIcon>👤</S.NavIcon>
            <span>부서 관리</span>
          </S.NavItem>
        </S.NavSection>

        <S.NavDivider>근태 관리</S.NavDivider>
        <S.NavSection>
          <S.NavItem>
            <S.NavIcon>📋</S.NavIcon>
            <span>근태 현황</span>
          </S.NavItem>
          <S.NavItem>
            <S.NavIcon>📅</S.NavIcon>
            <span>휴가 신청</span>
          </S.NavItem>
          <S.NavItem>
            <S.NavIcon>⏰</S.NavIcon>
            <span>승인 관리</span>
          </S.NavItem>
        </S.NavSection>

        <S.NavDivider>지원 센터</S.NavDivider>
        <S.NavSection>
          <S.NavItem active>
            <S.NavIcon>📰</S.NavIcon>
            <span>게시판</span>
          </S.NavItem>
          <S.NavItem>
            <S.NavIcon>❓</S.NavIcon>
            <span>Q&A</span>
          </S.NavItem>
          <S.NavItem>
            <S.NavIcon>⚙️</S.NavIcon>
            <span>설정</span>
          </S.NavItem>
        </S.NavSection>
      </S.Sidebar>

      <S.MainContent>
        <S.Header>
          <S.Breadcrumb>
            <S.BreadcrumbItem>홈</S.BreadcrumbItem>
            <S.BreadcrumbSeparator>›</S.BreadcrumbSeparator>
            <S.BreadcrumbItem active>게시판</S.BreadcrumbItem>
          </S.Breadcrumb>

          <S.HeaderRight>
            <S.SearchIconButton>
              <Search size={20} />
            </S.SearchIconButton>
            <S.NotificationBadge>
              <S.NotificationIcon>🔔</S.NotificationIcon>
              <S.Badge>1</S.Badge>
            </S.NotificationBadge>
            <S.UserProfile>
              <S.UserAvatar>김</S.UserAvatar>
              <S.UserInfo>
                <S.UserName>김민수</S.UserName>
                <S.UserRole>직원 관리자</S.UserRole>
              </S.UserInfo>
            </S.UserProfile>
          </S.HeaderRight>
        </S.Header>

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
              <S.BoardItem key={item.id}>
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

      {/* 글쓰기 모달 */}
      {isModalOpen && (
        <S.ModalOverlay onClick={handleCloseModal}>
          <S.ModalContainer onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>
                <Send size={24} />
                새 글 작성
              </S.ModalTitle>
              <S.CloseButton onClick={handleCloseModal}>
                <X size={24} />
              </S.CloseButton>
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
                    <option value="">카테고리 선택</option>
                    <option value="공지">공지</option>
                    <option value="일반">일반</option>
                    <option value="이벤트">이벤트</option>
                  </S.FormSelect>
                </S.FormGroup>

                <S.FormGroup>
                  <S.FormLabel>제목</S.FormLabel>
                  <S.FormInput
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="제목을 입력하세요"
                    required
                  />
                </S.FormGroup>

                <S.FormGroup>
                  <S.FormLabel>내용</S.FormLabel>
                  <S.FormTextarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="내용을 입력하세요"
                    rows={12}
                    required
                  />
                </S.FormGroup>

                <S.FormGroup>
                  <S.FormLabel>첨부파일</S.FormLabel>
                  <S.FormInput
                    type="text"
                    name="attachments"
                    value={formData.attachments}
                    onChange={handleInputChange}
                    placeholder="파일을 첨부할 수 있습니다 (최대 10MB 이하)"
                  />
                  <S.FormHint>파일 5개 이하, 각 10MB 이하</S.FormHint>
                </S.FormGroup>

                <S.ModalFooter>
                  <S.CancelButton type="button" onClick={handleCloseModal}>
                    <X size={18} />
                    취소
                  </S.CancelButton>
                  <S.SubmitButton type="submit">
                    <Send size={18} />
                    등록하기
                  </S.SubmitButton>
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