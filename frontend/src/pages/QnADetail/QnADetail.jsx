import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from "../QnA/QnA.styled"; // 기존 스타일 재활용
import * as D from './QnADetail.styled'; // 상세 페이지 전용 스타일
import { MessageSquare, ArrowLeft, User, Calendar, CheckCircle2, Clock, MessageCircle } from 'lucide-react';

const QnADetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuestionDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/questions/${id}`);
      setQuestion(response.data);
      console.log("📦 [서버 응답 성공]:", response.data);
    } catch (error) {
      console.error("데이터를 불러오는데 실패했습니다:", error);
      alert("존재하지 않는 게시글이거나 권한이 없습니다.");
      navigate('/qna');
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchQuestionDetail();
  }, [fetchQuestionDetail]);

  if (isLoading) return <S.PageContainer><S.ContentWrapper>로딩 중...</S.ContentWrapper></S.PageContainer>;
  if (!question) return null;

  return (
    <S.PageContainer>
      <S.MainContent>
        <S.ContentWrapper>
          {/* 상단 네비게이션 */}
          <D.BackButton onClick={() => navigate('/qna')}>
            <ArrowLeft size={20} /> 목록으로 돌아가기
          </D.BackButton>

          <D.DetailHeader>
            <D.CategoryBadge 
              $bgColor={question.answered ? '#3a774c' : '#FACC15'}
              $textColor={question.answered ? '#e0e0e0' : '#422006'}
            >
              {question.answered ? <CheckCircle2 size={14} /> : <Clock size={14} />}
              {question.answered ? '답변완료' : '답변대기'}
            </D.CategoryBadge>
            <D.Title>{question.questionTitle}</D.Title>
            
            <D.MetaSection>
              <S.MetaItem><User size={14}/> {question.questionerName}</S.MetaItem>
              <S.MetaItem><Calendar size={14}/> {question.createDate?.split('T')[0]}</S.MetaItem>
            </D.MetaSection>
          </D.DetailHeader>

          <D.QuestionBody>
            {question.questionContent}
          </D.QuestionBody>

          <D.Divider />

          {/* 답변 영역 */}
          {question.answered ? (
            <D.AnswerSection>
              <D.AnswerHeader>
                <MessageCircle size={20} color="#3a774c" />
                <h3>관리자 답변</h3>
                <span className="date">{question.answerDate?.split('T')[0]}</span>
              </D.AnswerHeader>
              <D.AnswerContent>
                {question.answerContent}
              </D.AnswerContent>
            </D.AnswerSection>
          ) : (
            <D.NoAnswerBox>
              <Clock size={40} color="#ccc" />
              <p>답변을 준비 중입니다. 잠시만 기다려주세요.</p>
            </D.NoAnswerBox>
          )}
        </S.ContentWrapper>
      </S.MainContent>
    </S.PageContainer>
  );
};

export default QnADetail;