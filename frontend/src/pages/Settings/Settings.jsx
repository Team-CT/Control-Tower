import React, { useState } from 'react';
import {
  MainContainer,
  ContentWrapper,
  TabContainer,
  Tab,
  TabContent,
  ProfileSection,
  ProfileHeader,
  ProfileAvatar,
  AvatarCircle,
  AvatarInitial,
  CameraIcon,
  InfoGrid,
  InfoRow,
  InfoLabel,
  InfoValue,
  FormInput,
  AddressTextarea,
  ActionButtons,
  CancelButton,
  SaveButton,
  SecuritySection,
  SecurityCard,
  SecurityCardHeader,
  SecurityCardBody,
  SecurityItem,
  SecurityItemLeft,
  SecurityItemRight,
  SecurityItemTitle,
  SecurityItemDescription,
  PasswordInputGroup,
  PasswordInput,
  ChangePasswordButton,
 
  ThemeSelector,
  ThemeOption,
  ThemeRadio,
  ThemeLabel,
  LanguageSelect,

} from './Settings.styled';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedLanguage, setSelectedLanguage] = useState('ko');

  // TODO: Zustand state mapping
  const userProfile = {
    name: '김수현',
    birthDate: '1990년 1월 1일',
    email: 'test-id2@domaintest.com',
    phone: '010-1234-5678',
    city: '서울',
    district: '강남구',
    address: '역삼동 테헤란로 123',
  };

  return (
    <MainContainer>
      <ContentWrapper>
        <TabContainer>
          <Tab
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          >
            프로필
          </Tab>
          <Tab
            active={activeTab === 'security'}
            onClick={() => setActiveTab('security')}
          >
            보안 및 설정
          </Tab>
        </TabContainer>

        {activeTab === 'profile' && (
          <TabContent>
            <ProfileSection>
              <ProfileHeader>
                <h2>프로필 정보</h2>
              </ProfileHeader>

              <ProfileAvatar>
                <AvatarCircle>
                  <AvatarInitial>김</AvatarInitial>
                  <CameraIcon>📷</CameraIcon>
                </AvatarCircle>
              </ProfileAvatar>

              <InfoGrid>
                <InfoRow>
                  <InfoLabel>이름</InfoLabel>
                  <InfoValue>
                    <FormInput
                      type="text"
                      defaultValue={userProfile.name}
                      placeholder="이름"
                    />
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>생년월일</InfoLabel>
                  <InfoValue>
                    <FormInput
                      type="text"
                      defaultValue={userProfile.birthDate}
                      placeholder="YYYY-MM-DD"
                    />
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>이메일</InfoLabel>
                  <InfoValue>
                    <FormInput
                      type="email"
                      defaultValue={userProfile.email}
                      placeholder="example@domain.com"
                    />
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>전화번호</InfoLabel>
                  <InfoValue>
                    <FormInput
                      type="tel"
                      defaultValue={userProfile.phone}
                      placeholder="010-0000-0000"
                    />
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>도시</InfoLabel>
                  <InfoValue>
                    <FormInput
                      type="text"
                      defaultValue={userProfile.city}
                      placeholder="도시 선택"
                    />
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>구/군</InfoLabel>
                  <InfoValue>
                    <FormInput
                      type="text"
                      defaultValue={userProfile.district}
                      placeholder="구/군 선택"
                    />
                  </InfoValue>
                </InfoRow>

                <InfoRow fullWidth>
                  <InfoLabel>주소/세부</InfoLabel>
                  <InfoValue>
                    <AddressTextarea
                      defaultValue={userProfile.address}
                      placeholder="상세 주소를 입력하세요"
                      rows={3}
                    />
                  </InfoValue>
                </InfoRow>
              </InfoGrid>

              <ActionButtons>
                <CancelButton>취소</CancelButton>
                <SaveButton>변경사항 저장</SaveButton>
              </ActionButtons>
            </ProfileSection>
          </TabContent>
        )}

        {activeTab === 'security' && (
          <TabContent>
            <SecuritySection>
              {/* 비밀번호 변경 */}
              <SecurityCard>
                <SecurityCardHeader>
                  <h3>🔒 비밀번호 변경</h3>
                </SecurityCardHeader>
                <SecurityCardBody>
                  <SecurityItem>
                    <SecurityItemLeft>
                      <SecurityItemTitle>현재 비밀번호</SecurityItemTitle>
                      <SecurityItemDescription>
                        현재 사용 중인 비밀번호를 입력해주세요
                      </SecurityItemDescription>
                    </SecurityItemLeft>
                    <SecurityItemRight>
                      <PasswordInputGroup>
                        <PasswordInput
                          type="password"
                          placeholder="현재 비밀번호를 입력하세요"
                        />
                      </PasswordInputGroup>
                    </SecurityItemRight>
                  </SecurityItem>

                  <SecurityItem>
                    <SecurityItemLeft>
                      <SecurityItemTitle>새 비밀번호</SecurityItemTitle>
                      <SecurityItemDescription>
                        8자 이상, 영문, 숫자, 특수문자 포함
                      </SecurityItemDescription>
                    </SecurityItemLeft>
                    <SecurityItemRight>
                      <PasswordInputGroup>
                        <PasswordInput
                          type="password"
                          placeholder="새 비밀번호를 입력하세요"
                        />
                      </PasswordInputGroup>
                    </SecurityItemRight>
                  </SecurityItem>

                  <SecurityItem>
                    <SecurityItemLeft>
                      <SecurityItemTitle>비밀번호 확인</SecurityItemTitle>
                      <SecurityItemDescription>
                        새 비밀번호를 다시 입력해주세요
                      </SecurityItemDescription>
                    </SecurityItemLeft>
                    <SecurityItemRight>
                      <PasswordInputGroup>
                        <PasswordInput
                          type="password"
                          placeholder="비밀번호를 다시 입력하세요"
                        />
                      </PasswordInputGroup>
                    </SecurityItemRight>
                  </SecurityItem>

                  <ActionButtons style={{ borderTop: 'none', paddingTop: 0 }}>
                    <ChangePasswordButton>비밀번호 변경</ChangePasswordButton>
                  </ActionButtons>
                </SecurityCardBody>
              </SecurityCard>


              {/* 테마 설정 */}
              <SecurityCard>
                <SecurityCardHeader>
                  <h3>🎨 테마</h3>
                </SecurityCardHeader>
                <SecurityCardBody>
                  <SecurityItem>
                    <SecurityItemLeft>
                      <SecurityItemTitle>화면 테마 선택</SecurityItemTitle>
                      <SecurityItemDescription>
                        원하는 테마를 선택하세요
                      </SecurityItemDescription>
                    </SecurityItemLeft>
                    <SecurityItemRight>
                      <ThemeSelector>
                        <ThemeOption>
                          <ThemeRadio
                            type="radio"
                            name="theme"
                            value="light"
                            checked={selectedTheme === 'light'}
                            onChange={(e) => setSelectedTheme(e.target.value)}
                          />
                          <ThemeLabel>라이트 모드</ThemeLabel>
                        </ThemeOption>
                        <ThemeOption>
                          <ThemeRadio
                            type="radio"
                            name="theme"
                            value="dark"
                            checked={selectedTheme === 'dark'}
                            onChange={(e) => setSelectedTheme(e.target.value)}
                          />
                          <ThemeLabel>다크 모드</ThemeLabel>
                        </ThemeOption>
                        <ThemeOption>
                          <ThemeRadio
                            type="radio"
                            name="theme"
                            value="auto"
                            checked={selectedTheme === 'auto'}
                            onChange={(e) => setSelectedTheme(e.target.value)}
                          />
                          <ThemeLabel>시스템 설정</ThemeLabel>
                        </ThemeOption>
                      </ThemeSelector>
                    </SecurityItemRight>
                  </SecurityItem>

                  <SecurityItem>
                    <SecurityItemLeft>
                      <SecurityItemTitle>언어 선택</SecurityItemTitle>
                      <SecurityItemDescription>
                        시스템 언어를 설정하세요
                      </SecurityItemDescription>
                    </SecurityItemLeft>
                    <SecurityItemRight>
                      <LanguageSelect
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                      >
                        <option value="ko">한국어</option>
                        <option value="en">English</option>
                        <option value="ja">日本語</option>
                        <option value="zh">中文</option>
                      </LanguageSelect>
                    </SecurityItemRight>
                  </SecurityItem>
                </SecurityCardBody>
              </SecurityCard>

              
              <ActionButtons>
                <CancelButton>취소</CancelButton>
                <SaveButton>변경사항 저장</SaveButton>
              </ActionButtons>
            </SecuritySection>
          </TabContent>
        )}
      </ContentWrapper>
    </MainContainer>
  );
};

export default Settings;