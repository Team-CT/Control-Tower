import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './BoardDetail.styled';
import { ArrowLeft, Calendar, Eye, MessageCircle, Heart, Phone, AlertTriangle } from 'lucide-react';

const BoardDetail = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  // 임시 데이터 (나중에는 API로 받아옵니다)
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
    { id: 1, title: '본사', address: '서울시 강남구 테헤란로 112' },
    { id: 2, title: '인천공항', address: '인천광역시 중구 공항로 272' },
    { id: 3, title: '부산', address: '부산광역시 김해구 공항진입로 108' }
  ];

  const examItems = [
    '일반검진 (신체계측, 혈압, 시력, 청력)',
    '혈액검사 (혈당, 콜레스테롤, 간기능 등)',
    '소변검사', '흉부 X-ray', '심전도 검사'
  ];

  const handleBack = () => {
    navigate(-1); // 뒤로 가기
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <S.PageContainer>
      <S.MainContent>
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

              <S.SectionTitle>📋 건강검진 일정</S.SectionTitle>
              <S.ScheduleList>
                {scheduleItems.map((item) => (
                  <S.ScheduleItem key={item.id}>
                    <S.ScheduleTitle>{item.title}:</S.ScheduleTitle>
                    <S.SchedulePeriod>{item.period}</S.SchedulePeriod>
                  </S.ScheduleItem>
                ))}
              </S.ScheduleList>

              <S.SectionTitle>📍 검진 장소</S.SectionTitle>
              <S.LocationList>
                {locations.map((location) => (
                  <S.LocationItem key={location.id}>
                    <S.LocationTitle>{location.title}:</S.LocationTitle>
                    <S.LocationAddress>{location.address}</S.LocationAddress>
                  </S.LocationItem>
                ))}
              </S.LocationList>

              <S.SectionTitle>🔬 검진 항목</S.SectionTitle>
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
                  <S.PrecautionItem>검진 전 12시간 공복을 유지해주세요.</S.PrecautionItem>
                  <S.PrecautionItem>검진 결과는 본인에게만 제공됩니다.</S.PrecautionItem>
                </S.PrecautionList>
              </S.PrecautionSection>

              <S.ContactSection>
                <S.ContactTitle><Phone size={18} />문의처</S.ContactTitle>
                <S.ContactText>건강검진 관련 문의사항은 아래로 연락주세요.</S.ContactText>
                <S.ContactList>
                  <S.ContactItem>
                    <S.ContactLabel>건강관리팀:</S.ContactLabel>
                    <S.ContactValue>02-1234-5678</S.ContactValue>
                  </S.ContactItem>
                </S.ContactList>
              </S.ContactSection>

              <S.ClosingText>감사합니다.</S.ClosingText>
            </S.PostBody>
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