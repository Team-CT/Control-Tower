import React, { useState } from 'react';
import * as S from './QnA.styled';
import { Search, MessageSquare, Eye, MessageCircle, Heart } from 'lucide-react';

const QnA = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('최신순');

  const qnaList = [
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
      title: '휴가 상황 관련 문의 드립니다',
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
    },
    {
      id: 9,
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
    console.log('Searching for:', searchQuery);
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
            <S.CreateButton>+ 글쓰기</S.CreateButton>
          </S.PageHeader>

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

          <S.QnaList>
            {qnaList.map((item) => (
              <S.QnaItem key={item.id}>
                <S.CategoryBadge bgColor={item.categoryColor}>
                  {item.category}
                </S.CategoryBadge>
                <S.QnaContent>
                  <S.QnaTitle>
                    {item.category === '공지' && '📌 '}
                    {item.title}
                  </S.QnaTitle>
                  <S.QnaMetaRow>
                    <S.QnaMeta>
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
                    </S.QnaMeta>
                    <S.QnaStats>
                      <S.StatItem>
                        <MessageCircle size={16} />
                        {item.comments}
                      </S.StatItem>
                      <S.StatItem>
                        <Heart size={16} />
                        {item.likes}
                      </S.StatItem>
                    </S.QnaStats>
                  </S.QnaMetaRow>
                </S.QnaContent>
              </S.QnaItem>
            ))}
          </S.QnaList>

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
    </S.PageContainer>
  );
};

export default QnA;