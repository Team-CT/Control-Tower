import React, { useState } from 'react';
import * as S from './styled';
import { ArrowLeft, Calendar, Eye, MessageCircle, Heart, Phone, Mail, AlertTriangle } from 'lucide-react';

const BoardDetail = () => {
  const [liked, setLiked] = useState(false);

  // TODO: Zustand state mapping
  const postData = {
    id: 1,
    category: '공지',
    categoryColor: '#FFE5E5',
    title: '2026년 건강검진 일정 안내',
    author: '인사팀',
    date: '2026-01-10',
    views: 1234,
    comments: 12,
    likes: 45
  };

  const scheduleItems = [
    { id: 1, title: '1차 검진', period: '2026년 3월 1일 ~ 3월 31일' },
    { id: 2, title: '2차 검진', period: '2026년 6월 1일 ~ 6월 30일' },
    { id: 3, title: '3차 검진', period: '2026년 9월 1일 ~ 9월 30일' },
    { id: 4, title: '4차 검진', period: '2026년 12월 1일 ~ 12월 31일' }
  ];

  const locations = [
    { 
      id: 1, 
      title: '본사', 
      address: '서울시 강남구 테헤란로 112 (본사 건강검진센터)'
    },
    { 
      id: 2, 
      title: '인천공항지', 
      address: '인천광역시 중구 공항로 272 (공항 건강검진센터)'
    },
    { 
      id: 3, 
      title: '부산', 
      address: '부산광역시 김해구 공항진입로 108 (김해 건강검진센터)'
    }
  ];

  const examItems = [
    '일반검진 (신체계측, 혈압, 시력, 청력)',
    '혈액검사 (혈당, 콜레스테롤, 간기능 등)',
    '소변검사',
    '흉부 X-ray',
    '심전도 검사',
    '암부종 특화 검사 (시차 적응도, 피로도 등)'
  ];

  const precautions = [
    { id: 1, text: '검진 전 12시간 공복 (물은 섭취 가능)' },
    { id: 2, text: '검진 당일 편안한 복장 착용' },
    { id: 3, text: '검진 예약은 SkyHR 시스템을 통해 가능합니다' },
    { id: 4, text: '검진 결과는 개인정보 보호를 위해 본인에게만 제공됩니다' }
  ];

  const handleBack = () => {
    // TODO: Implement navigation with Zustand
    console.log('Navigate back to board list');
  };

  const handleLike = () => {
    setLiked(!liked);
    // TODO: Update like count with Zustand
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
            <S.BreadcrumbItem>게시판</S.BreadcrumbItem>
            <S.BreadcrumbSeparator>›</S.BreadcrumbSeparator>
            <S.BreadcrumbItem active>2026년 건강검진 일정 안내</S.BreadcrumbItem>
          </S.Breadcrumb>

          <S.HeaderRight>
            <S.SearchIconButton>
              <S.SearchIcon>🔍</S.SearchIcon>
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
          <S.BackButton onClick={handleBack}>
            <ArrowLeft size={20} />
            목록으로
          </S.BackButton>

          <S.PostCard>
            <S.PostHeader>
              <S.CategoryBadge bgColor={postData.categoryColor}>
                {postData.category}
              </S.CategoryBadge>
              <S.PostTitle>{postData.title}</S.PostTitle>
              <S.PostMeta>
                <S.MetaItem>
                  <S.MetaIcon>👤</S.MetaIcon>
                  {postData.author}
                </S.MetaItem>
                <S.MetaItem>
                  <Calendar size={16} />
                  {postData.date}
                </S.MetaItem>
                <S.MetaItem>
                  <Eye size={16} />
                  {postData.views}
                </S.MetaItem>
              </S.PostMeta>
            </S.PostHeader>

            <S.PostBody>
              <S.GreetingText>안녕하세요, 임직원분들.</S.GreetingText>
              
              <S.ContentParagraph>
                2026년도 정기 건강검진 일정을 안내드립니다. 모든 직원분들의 건강한 근무를 위해 정기 건강검진을 실시하오니 아래 일정을 확인해 주시기 바랍니다.
              </S.ContentParagraph>

              <S.SectionTitle>
                📋 건강검진 일정
              </S.SectionTitle>
              <S.ScheduleList>
                {scheduleItems.map((item) => (
                  <S.ScheduleItem key={item.id}>
                    <S.ScheduleTitle>{item.title}:</S.ScheduleTitle>
                    <S.SchedulePeriod>{item.period}</S.SchedulePeriod>
                  </S.ScheduleItem>
                ))}
              </S.ScheduleList>

              <S.SectionTitle>
                📍 검진 장소
              </S.SectionTitle>
              <S.LocationList>
                {locations.map((location) => (
                  <S.LocationItem key={location.id}>
                    <S.LocationTitle>{location.title}:</S.LocationTitle>
                    <S.LocationAddress>{location.address}</S.LocationAddress>
                  </S.LocationItem>
                ))}
              </S.LocationList>

              <S.SectionTitle>
                🔬 검진 항목
              </S.SectionTitle>
              <S.ExamList>
                {examItems.map((item, index) => (
                  <S.ExamItem key={index}>{item}</S.ExamItem>
                ))}
              </S.ExamList>

              <S.PrecautionSection>
                <S.PrecautionHeader>
                  <AlertTriangle size={20} color="#F57C00" />
                  <S.PrecautionTitle>주의사항</S.PrecautionTitle>
                </S.PrecautionHeader>
                <S.PrecautionList>
                  {precautions.map((item) => (
                    <S.PrecautionItem key={item.id}>
                      {item.text}
                    </S.PrecautionItem>
                  ))}
                </S.PrecautionList>
              </S.PrecautionSection>

              <S.ContactSection>
                <S.ContactTitle>
                  <Phone size={18} />
                  문의처
                </S.ContactTitle>
                <S.ContactText>
                  건강검진 관련 문의사항이 있으시면 아래로 연락주시기 바랍니다.
                </S.ContactText>
                <S.ContactList>
                  <S.ContactItem>
                    <S.ContactLabel>인사팀 건강관리팀:</S.ContactLabel>
                    <S.ContactValue>02-1234-5678</S.ContactValue>
                  </S.ContactItem>
                  <S.ContactItem>
                    <S.ContactLabel>이메일:</S.ContactLabel>
                    <S.ContactValue>health@korsanair.com</S.ContactValue>
                  </S.ContactItem>
                </S.ContactList>
              </S.ContactSection>

              <S.ClosingText>
                많은 직원분들의 참여 부탁드리며, 건강한 한 해 되시기 바랍니다.
              </S.ClosingText>
              <S.SignatureText>감사합니다.</S.SignatureText>
            </S.PostBody>

            <S.PostFooter>
              <S.PostStats>
                <S.StatButton>
                  <MessageCircle size={20} />
                  <span>댓글</span>
                  <S.StatCount>{postData.comments}</S.StatCount>
                </S.StatButton>
                <S.StatButton onClick={handleLike} active={liked}>
                  <Heart size={20} fill={liked ? '#FF4757' : 'none'} />
                  <span>좋아요</span>
                  <S.StatCount>{postData.likes + (liked ? 1 : 0)}</S.StatCount>
                </S.StatButton>
              </S.PostStats>
            </S.PostFooter>
          </S.PostCard>

          <S.ActionButtons>
            <S.ListButton onClick={handleBack}>목록</S.ListButton>
            <S.EditButton>수정</S.EditButton>
          </S.ActionButtons>
        </S.ContentWrapper>
      </S.MainContent>
    </S.PageContainer>
  );
};

export default BoardDetail;