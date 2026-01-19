import React, { useState } from 'react';
import * as S from './stress_survey_styled';

const StressSurvey = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [additionalComment, setAdditionalComment] = useState('');

  const totalSteps = 5;

  // {/* TODO: Zustand state mapping - 직원 정보, 비행 데이터 등 */}
  const employeeInfo = {
    name: '김민수',
    employeeId: 'EMP001',
    department: '객실 승무원',
    position: '선임 승무원',
    hireDate: '2020-03-15',
    lastSurveyDate: '2025-12-15'
  };

  const flightStats = {
    week7Hours: 48,
    day30Hours: 156,
    timezoneChanges: 3,
    recentTimezone: -9,
    workDays30: 22,
    consecutiveDays: 4
  };

  const surveySteps = [
    { id: 1, label: '기본 정보', icon: 'user' },
    { id: 2, label: '비행 스트레스', icon: 'plane-departure' },
    { id: 3, label: '시차 영향', icon: 'clock' },
    { id: 4, label: '근무 패턴', icon: 'calendar-check' },
    { id: 5, label: '결과 확인', icon: 'chart-pie' }
  ];

  const questions = {
    section1: [
      { id: 'q1', text: '최근 비행 시간으로 인해 피로 또는 스트레스를 느끼고 있습니까?' },
      { id: 'q2', text: '비행 후 충분한 휴식을 취하고 있다고 생각하십니까?' },
      { id: 'q3', text: '비행 중 긴장감이나 불안감을 느끼는 경우가 있습니까?' }
    ],
    section2: [
      { id: 'q4', text: '시차 변경 후 정상적인 수면 패턴을 회복하는 데 어려움을 겪고 계십니까?' },
      { id: 'q5', text: '최근 7일간 평균 수면 시간은 어떻게 되십니까?', type: 'sleep' },
      { id: 'q6', text: '시차로 인해 두통, 소화불량 등 신체적 증상을 경험하십니까?' }
    ],
    section3: [
      { id: 'q7', text: '현재 근무 스케줄이 개인 생활과 균형을 이루고 있다고 생각하십니까?' },
      { id: 'q8', text: '업무량이나 업무 강도가 과도하다고 느끼십니까?' },
      { id: 'q9', text: '동료 및 상사와의 관계에서 스트레스를 느끼십니까?' }
    ]
  };

  const ratingOptions = [
    { value: 1, label: '전혀\n아니다' },
    { value: 2, label: '아니다' },
    { value: 3, label: '보통\n이다' },
    { value: 4, label: '그렇다' },
    { value: 5, label: '매우\n그렇다' }
  ];

  const sleepOptions = [
    { value: 1, label: '4시간\n미만' },
    { value: 2, label: '4~5\n시간' },
    { value: 3, label: '5~6\n시간' },
    { value: 4, label: '6~7\n시간' },
    { value: 5, label: '7시간\n이상' }
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    // {/* TODO: Zustand action - 설문 제출 로직 */}
    alert('설문이 제출되었습니다!\n\n결과는 건강 현황 페이지에서 확인하실 수 있습니다.');
    window.location.href = '/health';
  };

  const calculateResults = () => {
    // {/* TODO: 실제 점수 계산 로직 구현 */}
    return {
      total: 72,
      grade: '양호 (B+)',
      gradeType: 'normal',
      sections: [
        { label: '비행 스트레스', score: 78, grade: 'good' },
        { label: '시차 영향', score: 65, grade: 'normal' },
        { label: '근무 패턴', score: 73, grade: 'good' }
      ],
      recommendations: [
        { icon: 'bed', title: '수면 개선 프로그램', desc: '시차 적응과 수면 품질 향상' },
        { icon: 'spa', title: '휴식 프로그램 (명상/요가)', desc: '심신 안정과 스트레스 해소' },
        { icon: 'comments', title: '1:1 심리 상담', desc: '전문 상담사와 함께하는 맞춤 케어' }
      ]
    };
  };

  const results = calculateResults();

  return (
    <S.MainContainer>
      <S.SurveyHeader>
        <S.HeaderIcon className="fas fa-clipboard-list" />
        <S.HeaderContent>
          <S.HeaderTitle>스트레스 자가진단 설문</S.HeaderTitle>
          <S.HeaderDescription>
            본 설문은 직원 건강관리 프로그램의 일환으로 진행됩니다. 솔직하게 답변해 주세요.
          </S.HeaderDescription>
        </S.HeaderContent>
      </S.SurveyHeader>

      <S.ProgressBarContainer>
        <S.ProgressLine />
        {surveySteps.map((step) => (
          <S.ProgressStep
            key={step.id}
            $active={step.id === currentStep}
            $completed={step.id < currentStep}
            onClick={() => handleStepClick(step.id)}
          >
            <S.StepCircle $active={step.id === currentStep} $completed={step.id < currentStep}>
              {step.id < currentStep ? (
                <i className="fas fa-check" />
              ) : (
                step.id
              )}
            </S.StepCircle>
            <S.StepLabel $active={step.id === currentStep} $completed={step.id < currentStep}>
              {step.label}
            </S.StepLabel>
          </S.ProgressStep>
        ))}
      </S.ProgressBarContainer>

      {/* Step 1: 기본 정보 */}
      {currentStep === 1 && (
        <S.SurveyCard>
          <S.SectionHeader>
            <S.SectionIcon $color="blue">
              <i className="fas fa-user" />
            </S.SectionIcon>
            <S.SectionInfo>
              <S.SectionTitle>기본 정보 확인</S.SectionTitle>
              <S.SectionDescription>설문 응답자 정보를 확인해주세요</S.SectionDescription>
            </S.SectionInfo>
          </S.SectionHeader>

          <S.InfoGrid>
            <S.InfoItem>
              <S.InfoLabel>이름</S.InfoLabel>
              <S.InfoValue>{employeeInfo.name}</S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>사번</S.InfoLabel>
              <S.InfoValue>{employeeInfo.employeeId}</S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>부서</S.InfoLabel>
              <S.InfoValue>{employeeInfo.department}</S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>직급</S.InfoLabel>
              <S.InfoValue>{employeeInfo.position}</S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>입사일</S.InfoLabel>
              <S.InfoValue>{employeeInfo.hireDate}</S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>마지막 설문일</S.InfoLabel>
              <S.InfoValue>{employeeInfo.lastSurveyDate}</S.InfoValue>
            </S.InfoItem>
          </S.InfoGrid>

          <S.NoticeBox>
            <S.NoticeTitle>
              <i className="fas fa-info-circle" />
              설문 안내
            </S.NoticeTitle>
            <S.NoticeList>
              <li>본 설문은 약 5~10분 정도 소요됩니다.</li>
              <li>모든 응답은 익명으로 처리되며, 개인별 건강관리 목적으로만 사용됩니다.</li>
              <li>솔직하게 응답해 주시면 더 정확한 건강 분석이 가능합니다.</li>
              <li>설문 중간에 저장되며, 나중에 이어서 작성할 수 있습니다.</li>
            </S.NoticeList>
          </S.NoticeBox>

          <S.ActionButtons>
            <S.PrevButton disabled>
              <i className="fas fa-arrow-left" /> 이전
            </S.PrevButton>
            <S.NextButton onClick={handleNext}>
              설문 시작하기 <i className="fas fa-arrow-right" />
            </S.NextButton>
          </S.ActionButtons>
        </S.SurveyCard>
      )}

      {/* Step 2: 비행 스트레스 */}
      {currentStep === 2 && (
        <S.SurveyCard>
          <S.RoleBadge>
            <i className="fas fa-plane" />
            객실 승무원 / 기장 전용 설문
          </S.RoleBadge>

          <S.SectionHeader>
            <S.SectionIcon $color="blue">
              <i className="fas fa-plane-departure" />
            </S.SectionIcon>
            <S.SectionInfo>
              <S.SectionTitle>A. 비행시간 기반 스트레스 지수</S.SectionTitle>
              <S.SectionDescription>최근 비행 데이터를 기반으로 스트레스 수준을 측정합니다</S.SectionDescription>
            </S.SectionInfo>
          </S.SectionHeader>

          <S.StatsGrid>
            <S.StatBox>
              <S.StatValue>
                {flightStats.week7Hours}<S.StatUnit>시간</S.StatUnit>
              </S.StatValue>
              <S.StatLabel>최근 7일 비행시간</S.StatLabel>
            </S.StatBox>
            <S.StatBox>
              <S.StatValue>
                {flightStats.day30Hours}<S.StatUnit>시간</S.StatUnit>
              </S.StatValue>
              <S.StatLabel>최근 30일 비행시간</S.StatLabel>
            </S.StatBox>
          </S.StatsGrid>

          {questions.section1.map((question, index) => (
            <S.QuestionItem key={question.id}>
              <S.QuestionText>
                <S.QuestionNumber>{index + 1}</S.QuestionNumber>
                {question.text}
              </S.QuestionText>
              <S.RatingScale>
                {ratingOptions.map((option) => (
                  <S.RatingOption key={option.value}>
                    <S.RatingInput
                      type="radio"
                      id={`${question.id}-${option.value}`}
                      name={question.id}
                      value={option.value}
                      checked={answers[question.id] === option.value}
                      onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
                    />
                    <S.RatingLabel
                      htmlFor={`${question.id}-${option.value}`}
                      $checked={answers[question.id] === option.value}
                    >
                      <S.RatingValue>{option.value}</S.RatingValue>
                      <S.RatingText>{option.label}</S.RatingText>
                    </S.RatingLabel>
                  </S.RatingOption>
                ))}
              </S.RatingScale>
            </S.QuestionItem>
          ))}

          <S.ActionButtons>
            <S.PrevButton onClick={handlePrev}>
              <i className="fas fa-arrow-left" /> 이전
            </S.PrevButton>
            <S.NextButton onClick={handleNext}>
              다음 <i className="fas fa-arrow-right" />
            </S.NextButton>
          </S.ActionButtons>
        </S.SurveyCard>
      )}

      {/* Step 3: 시차 영향 */}
      {currentStep === 3 && (
        <S.SurveyCard>
          <S.RoleBadge>
            <i className="fas fa-globe" />
            국제선 비행 승무원 전용
          </S.RoleBadge>

          <S.SectionHeader>
            <S.SectionIcon $color="green">
              <i className="fas fa-clock" />
            </S.SectionIcon>
            <S.SectionInfo>
              <S.SectionTitle>B. 시차 적응 및 수면 영향</S.SectionTitle>
              <S.SectionDescription>시차로 인한 신체 리듬 변화와 수면의 질을 측정합니다</S.SectionDescription>
            </S.SectionInfo>
          </S.SectionHeader>

          <S.StatsGrid>
            <S.StatBox>
              <S.StatValue $color="green">
                {flightStats.timezoneChanges}<S.StatUnit>회</S.StatUnit>
              </S.StatValue>
              <S.StatLabel>최근 7일 시차 변경 횟수</S.StatLabel>
            </S.StatBox>
            <S.StatBox>
              <S.StatValue $color="green">
                {flightStats.recentTimezone}<S.StatUnit>시간</S.StatUnit>
              </S.StatValue>
              <S.StatLabel>최근 시차 (LA 노선)</S.StatLabel>
            </S.StatBox>
          </S.StatsGrid>

          {questions.section2.map((question, index) => (
            <S.QuestionItem key={question.id}>
              <S.QuestionText>
                <S.QuestionNumber>{index + 4}</S.QuestionNumber>
                {question.text}
              </S.QuestionText>
              <S.RatingScale>
                {(question.type === 'sleep' ? sleepOptions : ratingOptions).map((option) => (
                  <S.RatingOption key={option.value}>
                    <S.RatingInput
                      type="radio"
                      id={`${question.id}-${option.value}`}
                      name={question.id}
                      value={option.value}
                      checked={answers[question.id] === option.value}
                      onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
                    />
                    <S.RatingLabel
                      htmlFor={`${question.id}-${option.value}`}
                      $checked={answers[question.id] === option.value}
                    >
                      <S.RatingValue>{option.value}</S.RatingValue>
                      <S.RatingText>{option.label}</S.RatingText>
                    </S.RatingLabel>
                  </S.RatingOption>
                ))}
              </S.RatingScale>
            </S.QuestionItem>
          ))}

          <S.ActionButtons>
            <S.PrevButton onClick={handlePrev}>
              <i className="fas fa-arrow-left" /> 이전
            </S.PrevButton>
            <S.NextButton onClick={handleNext}>
              다음 <i className="fas fa-arrow-right" />
            </S.NextButton>
          </S.ActionButtons>
        </S.SurveyCard>
      )}

      {/* Step 4: 근무 패턴 */}
      {currentStep === 4 && (
        <S.SurveyCard>
          <S.SectionHeader>
            <S.SectionIcon $color="purple">
              <i className="fas fa-calendar-check" />
            </S.SectionIcon>
            <S.SectionInfo>
              <S.SectionTitle>C. 근무 패턴 및 업무 스트레스</S.SectionTitle>
              <S.SectionDescription>근무 일정과 업무 환경으로 인한 스트레스를 측정합니다</S.SectionDescription>
            </S.SectionInfo>
          </S.SectionHeader>

          <S.StatsGrid>
            <S.StatBox>
              <S.StatValue $color="purple">
                {flightStats.workDays30}<S.StatUnit>일</S.StatUnit>
              </S.StatValue>
              <S.StatLabel>최근 30일 근무일수</S.StatLabel>
            </S.StatBox>
            <S.StatBox>
              <S.StatValue $color="purple">
                {flightStats.consecutiveDays}<S.StatUnit>일</S.StatUnit>
              </S.StatValue>
              <S.StatLabel>최근 연속 근무일</S.StatLabel>
            </S.StatBox>
          </S.StatsGrid>

          {questions.section3.map((question, index) => (
            <S.QuestionItem key={question.id}>
              <S.QuestionText>
                <S.QuestionNumber>{index + 7}</S.QuestionNumber>
                {question.text}
              </S.QuestionText>
              <S.RatingScale>
                {ratingOptions.map((option) => (
                  <S.RatingOption key={option.value}>
                    <S.RatingInput
                      type="radio"
                      id={`${question.id}-${option.value}`}
                      name={question.id}
                      value={option.value}
                      checked={answers[question.id] === option.value}
                      onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
                    />
                    <S.RatingLabel
                      htmlFor={`${question.id}-${option.value}`}
                      $checked={answers[question.id] === option.value}
                    >
                      <S.RatingValue>{option.value}</S.RatingValue>
                      <S.RatingText>{option.label}</S.RatingText>
                    </S.RatingLabel>
                  </S.RatingOption>
                ))}
              </S.RatingScale>
            </S.QuestionItem>
          ))}

          <S.CommentSection>
            <S.CommentLabel>
              <i className="fas fa-comment-alt" /> 추가로 전달하고 싶은 의견이 있으시면 작성해 주세요 (선택)
            </S.CommentLabel>
            <S.CommentTextarea
              value={additionalComment}
              onChange={(e) => setAdditionalComment(e.target.value)}
              placeholder="업무 환경, 스케줄, 건강 관련 건의사항 등을 자유롭게 작성해 주세요..."
            />
          </S.CommentSection>

          <S.ActionButtons>
            <S.PrevButton onClick={handlePrev}>
              <i className="fas fa-arrow-left" /> 이전
            </S.PrevButton>
            <S.NextButton onClick={handleNext}>
              결과 확인 <i className="fas fa-arrow-right" />
            </S.NextButton>
          </S.ActionButtons>
        </S.SurveyCard>
      )}

      {/* Step 5: 결과 확인 */}
      {currentStep === 5 && (
        <S.SurveyCard>
          <S.SectionHeader>
            <S.SectionIcon $color="orange">
              <i className="fas fa-chart-pie" />
            </S.SectionIcon>
            <S.SectionInfo>
              <S.SectionTitle>설문 결과</S.SectionTitle>
              <S.SectionDescription>귀하의 스트레스 자가진단 결과입니다</S.SectionDescription>
            </S.SectionInfo>
          </S.SectionHeader>

          <S.ResultSummary>
            <S.ResultScoreCircle>
              <S.ResultScore>{results.total}</S.ResultScore>
              <S.ResultMaxScore>/ 100점</S.ResultMaxScore>
            </S.ResultScoreCircle>
            <S.ResultGrade $type={results.gradeType}>{results.grade}</S.ResultGrade>
            <S.ResultMessage>
              전반적인 스트레스 수준은 관리 가능한 범위입니다.<br />
              일부 항목에서 주의가 필요하며, 권장 프로그램 참여를 고려해 주세요.
            </S.ResultMessage>
          </S.ResultSummary>

          <S.ResultDetailsGrid>
            {results.sections.map((section) => (
              <S.ResultDetailCard key={section.label}>
                <S.DetailLabel>{section.label}</S.DetailLabel>
                <S.DetailScore>{section.score}</S.DetailScore>
                <S.DetailGrade $type={section.grade}>
                  {section.grade === 'good' ? '양호' : '주의'}
                </S.DetailGrade>
              </S.ResultDetailCard>
            ))}
          </S.ResultDetailsGrid>

          <S.RecommendSection>
            <S.RecommendTitle>
              <i className="fas fa-lightbulb" /> 맞춤 건강 프로그램 추천
            </S.RecommendTitle>
            <S.RecommendList>
              {results.recommendations.map((rec, index) => (
                <S.RecommendItem key={index}>
                  <S.RecommendIcon className={`fas fa-${rec.icon}`} />
                  <S.RecommendContent>
                    <S.RecommendItemTitle>{rec.title}</S.RecommendItemTitle>
                    <S.RecommendItemDesc>{rec.desc}</S.RecommendItemDesc>
                  </S.RecommendContent>
                </S.RecommendItem>
              ))}
            </S.RecommendList>
          </S.RecommendSection>

          <S.ActionButtons>
            <S.PrevButton onClick={handlePrev}>
              <i className="fas fa-arrow-left" /> 다시 수정
            </S.PrevButton>
            <S.SubmitButton onClick={handleSubmit}>
              <i className="fas fa-check" /> 설문 제출하기
            </S.SubmitButton>
          </S.ActionButtons>
        </S.SurveyCard>
      )}
    </S.MainContainer>
  );
};

export default StressSurvey;