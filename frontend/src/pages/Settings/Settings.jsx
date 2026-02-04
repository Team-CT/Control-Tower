import React, { useState, useEffect } from 'react';
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

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedLanguage, setSelectedLanguage] = useState('ko');
  
  // 1. 상태 통일 (profile 제거, profileData만 사용)
  const [profileData, setProfileData] = useState({
    empName: '', age: '', email: '', phone: '', address: ''
  });
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  const { 
    theme, isDarkMode, toggleDarkMode, currentAirline, 
    changeAirline, airlineName 
  } = useAirlineTheme();

  //비밀번호 로직
  const [passwords, setPasswords] = useState({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});
const handlePasswordChange = (e) => {
  const { name, value } = e.target;
  setPasswords(prev => ({ ...prev, [name]: value }));
};//비밀번호 로직

  // 3. 변수 및 헬퍼 함수
  const getEmpId = () => {
    try {
      const storage = JSON.parse(localStorage.getItem('auth-storage'));
      return storage?.state?.emp?.empId;
    } catch (e) {
      return null;
    }
  };
  const empId = getEmpId();


 useEffect(() => {
    const fetchProfile = async () => {
      if (!empId) {
        console.warn("⚠️ 사원 정보를 찾을 수 없습니다. 로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8001/api/settings/profile/${empId}`);
        if (response.ok) {
          const data = await response.json();
          // 데이터가 null로 올 경우를 대비해 기본값 세팅
          setProfileData({
            empName: data?.empName || '',
            age: data?.age || '',
            email: data?.email || '',
            phone: data?.phone || '',
            address: data?.address || ''
          });
        }
    
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [empId]);
 useEffect(() => {
    if (profileData.empName !== "") {
      console.log("데이터 로드 완료:", profileData);
    }
  }, [profileData]);
  // 테마 시스템
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
const handleSave = async () => {
    if (!empId) return alert("로그인 정보가 없습니다.");

    try {
      const response = await fetch(`http://localhost:8001/api/settings/profile/${empId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        alert("성공적으로 저장되었습니다!");
      } else {
        alert("저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("통신 에러:", error);
    }
  };

  //비밀번호 변경 핸들러
const handleUpdatePassword = async () => {
  const { currentPassword, newPassword, confirmPassword } = passwords;

  // 1. 유효성 검사
  if (!currentPassword || !newPassword || !confirmPassword) {
    return alert("모든 필드를 입력해주세요.");
  }
  if (newPassword !== confirmPassword) {
    return alert("새 비밀번호가 일치하지 않습니다.");
  }
  if (newPassword.length < 8) {
    return alert("비밀번호는 8자 이상이어야 합니다.");
  }

  try {
    const response = await fetch(`http://localhost:8001/api/settings/password/${empId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword, // 백엔드에서 현재 암호와 대조용
        newPassword      // 백엔드에서 암호화하여 저장할 대상
      }),
    });

    if (response.ok) {
      alert("비밀번호가 성공적으로 변경되었습니다.");
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' }); // 입력창 초기화
    } else {
      const errorMsg = await response.text();
      alert(errorMsg || "비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인하세요.");
    }
  } catch (error) {
    console.error("비밀번호 변경 에러:", error);
  }
};
  

  if (loading) return <div style={{color: 'white', padding: '20px'}}>로딩 중...</div>;
  if (!empId) return <div style={{color: 'white', padding: '20px'}}>로그인이 필요한 서비스입니다.</div>;

  return (
    <MainContainer>
      <ContentWrapper>
        <TabContainer>
          <Tab $active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>프로필</Tab>
          <Tab $active={activeTab === 'security'} onClick={() => setActiveTab('security')}>보안 및 설정</Tab>
        </TabContainer>

        {activeTab === 'profile' && (
          <TabContent>
            <ProfileSection>
              <ProfileHeader><h2>프로필 정보</h2></ProfileHeader>

              {/* 프로필 이미지 섹션 */}
              <ProfileAvatar onClick={() => document.getElementById('settingsProfileImageInput').click()}>
                <AvatarCircle>
                  {profilePreview ? (
                    <img src={profilePreview} alt="프로필" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                  ) : (
                    <AvatarInitial>{profileData.empName?.charAt(0) || '?'}</AvatarInitial>
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
                      name="empName" // name 속성 반드시 필요 (handleInputChange용)
                      type="text"
                      value={profileData.empName} // defaultValue가 아닌 value 사용
                      onChange={handleInputChange}
                      placeholder="이름"
                    />
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>나이</InfoLabel>
                  <InfoValue>
                    <FormInput
                      name="age"
                      type="text"
                      value={profileData.age}
                      onChange={handleInputChange}
                      placeholder="나이"
                    />
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>이메일</InfoLabel>
                  <InfoValue>
                    <FormInput
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      placeholder="example@domain.com"
                    />
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>전화번호</InfoLabel>
                  <InfoValue>
                    <FormInput
                      name="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      placeholder="010-0000-0000"
                    />
                  </InfoValue>
                </InfoRow>

                <InfoRow $fullWidth>
                  <InfoLabel>주소</InfoLabel>
                  <InfoValue>
                    <AddressTextarea
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      placeholder="상세 주소를 입력하세요"
                      rows={3}
                    />
                  </InfoValue>
                </InfoRow>
              </InfoGrid>

              <ActionButtons>
                {/* 취소 시 페이지 새로고침하여 서버 데이터 다시 불러오기 */}
                <CancelButton onClick={() => window.location.reload()}>취소</CancelButton>
                <SaveButton onClick={handleSave}>변경사항 저장</SaveButton>
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
                   {/* 현재 비밀번호 */}
<SecurityItemRight>
  <PasswordInputGroup>
    <PasswordInput
      name="currentPassword" // name 추가
      type="password"
      value={passwords.currentPassword} // value 연결
      onChange={handlePasswordChange} // onChange 연결
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
                   {/* 새 비밀번호 */}
<SecurityItemRight>
  <PasswordInputGroup>
    <PasswordInput
      name="newPassword" // name 추가
      type="password"
      value={passwords.newPassword} // value 연결
      onChange={handlePasswordChange} // onChange 연결
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
                    {/* 비밀번호 확인 */}
<SecurityItemRight>
  <PasswordInputGroup>
    <PasswordInput
      name="confirmPassword" // name 추가
      type="password"
      value={passwords.confirmPassword} // value 연결
      onChange={handlePasswordChange} // onChange 연결
      placeholder="비밀번호를 다시 입력하세요"
    />
  </PasswordInputGroup>
</SecurityItemRight>
                  </SecurityItem>

                 {/* 변경 버튼 클릭 이벤트 추가 */}
<ActionButtons style={{ borderTop: 'none', paddingTop: 0 }}>
  <ChangePasswordButton onClick={handleUpdatePassword}>
    비밀번호 변경
  </ChangePasswordButton>
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
                        value={localStorage.getItem('userRole') || 'EMP'}
                        onChange={(e) => {
                          localStorage.setItem('userRole', e.target.value);
                          alert(`권한이 ${e.target.value}로 변경되었습니다. 페이지를 새로고침합니다.`);
                          window.location.reload();
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