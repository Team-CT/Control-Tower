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
  ToggleSwitch,
  ToggleSlider,

} from './Settings.styled';
import { useAirlineTheme } from '../../context/AirlineThemeContext';
import { airlines } from '../../styles/theme';
import useAuthStore from '../../store/authStore';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedLanguage, setSelectedLanguage] = useState('ko');

  // 테마 시스템
  const {
    theme,
    isDarkMode,
    toggleDarkMode,
    currentAirline,
    approvalStatus,
    changeAirline,
    updateApprovalStatus,
    airlineName,
    getRole // 현재 role 확인용
  } = useAirlineTheme();

  const { updateRole } = useAuthStore(); // 권한 업데이트 함수

  // 프로필 이미지 업로드 관리
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  // 프로필 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
            $active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          >
            프로필
          </Tab>
          <Tab
            $active={activeTab === 'security'}
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

              <ProfileAvatar onClick={() => document.getElementById('settingsProfileImageInput').click()}>
                <AvatarCircle>
                  {profilePreview ? (
                    <img src={profilePreview} alt="프로필" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                  ) : (
                    <AvatarInitial>김</AvatarInitial>
                  )}
                  <CameraIcon>📷</CameraIcon>
                </AvatarCircle>
                <input
                  id="settingsProfileImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
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

                <InfoRow $fullWidth>
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
                      <SecurityItemTitle>다크 모드</SecurityItemTitle>
                      <SecurityItemDescription>
                        어두운 테마로 전환하여 눈의 피로를 줄이세요
                      </SecurityItemDescription>
                    </SecurityItemLeft>
                    <SecurityItemRight>
                      <ToggleSwitch>
                        <input
                          type="checkbox"
                          checked={isDarkMode}
                          onChange={toggleDarkMode}
                          style={{ display: 'none' }}
                        />
                        <ToggleSlider checked={isDarkMode} onClick={toggleDarkMode} />
                      </ToggleSwitch>
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

                  <SecurityItem>
                    <SecurityItemLeft>
                      <SecurityItemTitle>항공사 테마 (개발용)</SecurityItemTitle>
                      <SecurityItemDescription>
                        항공사별 브랜드 컬러를 테스트해보세요
                      </SecurityItemDescription>
                    </SecurityItemLeft>
                    <SecurityItemRight>
                      <LanguageSelect
                        value={currentAirline}
                        onChange={(e) => changeAirline(e.target.value)}
                      >
                        <option value="CONTROL_TOWER">Control Tower (기본)</option>
                        <option value="KE">대한항공 (Korean Air)</option>
                        <option value="LJ">진에어 (Jin Air)</option>
                      </LanguageSelect>
                    </SecurityItemRight>
                  </SecurityItem>

                  <SecurityItem>
                    <SecurityItemLeft>
                      <SecurityItemTitle>사용자 권한 (개발용)</SecurityItemTitle>
                      <SecurityItemDescription>
                        개발 테스트를 위한 권한 전환 (페이지 새로고침 필요)
                      </SecurityItemDescription>
                    </SecurityItemLeft>
                    <SecurityItemRight>
                      <LanguageSelect
                        value={localStorage.getItem('userRole') || 'EMP'} // 초기값은 로컬스토리지에서 가져오되
                        onChange={(e) => {
                          const newRole = e.target.value;
                          localStorage.setItem('userRole', newRole); // 영구 저장용
                          updateRole(newRole); // 🔥 즉시 스토어 업데이트 (리렌더링 트리거)
                          alert(`권한이 ${newRole}로 변경되었습니다.`);
                        }}
                      >
                        <option value="EMP">직원 (EMP)</option>
                        <option value="ADMIN">관리자 (ADMIN)</option>
                        <option value="SUPER_ADMIN">슈퍼 관리자 (SUPER_ADMIN)</option>
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