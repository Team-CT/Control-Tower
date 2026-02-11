import React, { useState, useEffect, useMemo } from 'react';
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
  LanguageSelect,
  ToggleSwitch,
  ToggleSlider,
  SmallButton,
  InputRow,
} from './Settings.styled';

import { useAirlineTheme } from '../../context/AirlineThemeContext';
import useAuthStore from '../../store/authStore';

import {empService} from '../../api/emp/empService';
import {fileService} from '../../api/emp/fileService';

/**
 * ✅ 전제
 * index.html <head>에 아래 스크립트 필요
 * <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
 */

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedLanguage, setSelectedLanguage] = useState('ko');

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const { isDarkMode, toggleDarkMode, currentAirline, changeAirline } = useAirlineTheme();
  const { updateRole } = useAuthStore();

  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  // ✅ 주소 조립/분해 유틸
  const ADDRESS_DELIMITER = ' | ';

  const buildAddress = (road, detail) => {
    const r = (road || '').trim();
    const d = (detail || '').trim();
    if (!r) return '';
    if (!d) return r;
    return `${r}${ADDRESS_DELIMITER}${d}`;
  };

  const splitAddress = (address) => {
    const raw = (address || '').trim();
    if (!raw) return { roadAddress: '', detailAddress: '' };

    if (raw.includes(ADDRESS_DELIMITER)) {
      const [road, ...rest] = raw.split(ADDRESS_DELIMITER);
      return { roadAddress: (road || '').trim(), detailAddress: rest.join(ADDRESS_DELIMITER).trim() };
    }
    if (raw.includes('|')) {
      const [road, ...rest] = raw.split('|');
      return { roadAddress: (road || '').trim(), detailAddress: rest.join('|').trim() };
    }

    const tokens = raw.split(/\s+/);
    if (tokens.length <= 1) return { roadAddress: raw, detailAddress: '' };

    const last = tokens[tokens.length - 1];
    const looksLikeDetail =
      /(호|층|동|관|번지|unit|room|#)$/i.test(last) ||
      /^\d{1,4}호$/.test(last) ||
      /^\d{1,2}층$/.test(last);

    if (!looksLikeDetail) {
      return { roadAddress: raw, detailAddress: '' };
    }

    return {
      roadAddress: tokens.slice(0, -1).join(' ').trim(),
      detailAddress: last.trim(),
    };
  };

  const [profile, setProfile] = useState({
    empId: '',
    empName: '',
    empNo: '',
    role: '',
    job: '',
    phone: '',
    email: '',
    address: '',
    roadAddress: '',
    detailAddress: '',
    age: null,
    departmentName: '',
    airlineName: '',
    startDate: null,
    profileImageId: null,
  });

  // ✅ 내 프로필 로드 (/me)
  useEffect(() => {
    loadMyProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMyProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await empService.getMyProfile();
      const data = res.data?.data || res.data;

      const serverAddress = data.address ?? '';
      const fromSplit = splitAddress(serverAddress);

      const roadFromServer = (data.roadAddress ?? '').trim();
      const detailFromServer = (data.detailAddress ?? '').trim();

      const finalRoad = roadFromServer || fromSplit.roadAddress;
      const finalDetail = detailFromServer || fromSplit.detailAddress;
      const finalAddress = buildAddress(finalRoad, finalDetail) || serverAddress;

      setProfile({
        empId: data.empId ?? '',
        empName: data.empName ?? '',
        empNo: data.empNo ?? '',
        role: data.role ?? '',
        job: data.job ?? '',
        phone: data.phone ?? '',
        email: data.email ?? '',
        address: finalAddress,
        roadAddress: finalRoad,
        detailAddress: finalDetail,
        age: data.age ?? null,
        departmentName: data.departmentName ?? '',
        airlineName: data.airlineName ?? '',
        startDate: data.startDate ?? null,
        profileImageId: data.profileImageId ?? null,
      });

      setProfilePreview(null);
      setProfileImage(null);
    } catch (e) {
      console.error('프로필 조회 실패:', e);
      setError('프로필 정보를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };
  const formatPhoneKR = (value) => {
    const digits = String(value || '').replace(/\D/g, ''); // 숫자만

    // 02(서울) 같은 국번까지 커버하고 싶으면 규칙이 더 필요하지만,
    // 지금은 휴대폰(010/011/016/017/018/019 등) 중심으로 처리
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  };

  const handleChangeProfile = (key) => (e) => {
    setProfile((prev) => ({ ...prev, [key]: e.target.value }));
  };
  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const formatted = formatPhoneKR(raw);

    setProfile((prev) => ({
      ...prev,
      phone: formatted,
    }));
  };

  const handleChangeAge = (e) => {
    const v = e.target.value;
    setProfile((prev) => ({ ...prev, age: v === '' ? null : Number(v) }));
  };

  // ✅ 카카오 주소 검색
  const openKakaoAddressSearch = () => {
    if (!window.daum?.Postcode) {
      alert('카카오 주소 스크립트가 로드되지 않았습니다. index.html 스크립트를 확인하세요.');
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        const road = data.roadAddress || '';
        const jibun = data.jibunAddress || '';

        let extra = '';
        if (data.bname && /[동|로|가]$/g.test(data.bname)) extra += data.bname;
        if (data.buildingName && data.apartment === 'Y') {
          extra += (extra ? ', ' : '') + data.buildingName;
        }
        if (extra) extra = ` (${extra})`;

        const baseAddress = road ? `${road}${extra}` : jibun;

        setProfile((prev) => {
          const nextRoad = baseAddress;
          const nextDetail = prev.detailAddress || '';
          return {
            ...prev,
            roadAddress: nextRoad,
            address: buildAddress(nextRoad, nextDetail),
          };
        });
      },
    }).open();
  };

  const handleDetailAddressChange = (e) => {
    const detail = e.target.value;
    setProfile((prev) => ({
      ...prev,
      detailAddress: detail,
      address: buildAddress(prev.roadAddress, detail),
    }));
  };

  // ✅ 이미지 Preview URL (서버 저장된 이미지)
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';

  const serverProfileUrl = useMemo(() => {
    return profile.profileImageId ? `${API_BASE}/api/file/preview/${profile.profileImageId}` : null;
  }, [API_BASE, profile.profileImageId]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setProfilePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // ✅ 저장(이미지+텍스트 통합)
  const handleSaveAll = async () => {
    try {
      setSaving(true);
      setError(null);

      const finalAddress = buildAddress(profile.roadAddress, profile.detailAddress);

      // 1) 이미지가 선택된 경우 업로드해서 fileId 받기
      let nextProfileImageId = profile.profileImageId;

      if (profileImage) {
        const uploadRes = await fileService.upload(profileImage);
        const fileId = uploadRes.data?.fileId;

        if (!fileId) throw new Error('업로드 응답에 fileId가 없습니다.');
        nextProfileImageId = fileId;
      }

      // 2) 내 프로필 업데이트 (snake_case로 보내기)
      await empService.updateMyProfile({
        emp_name: profile.empName,
        age: profile.age,
        email: profile.email,
        phone: profile.phone,
        address: finalAddress,
        profile_image_id: nextProfileImageId,
      });

      alert('변경사항이 저장되었습니다.');

      // 로컬 상태 정리 + 재조회
      setProfileImage(null);
      setProfilePreview(null);

      await loadMyProfile();
    } catch (e) {
      console.error('저장 실패:', e);
      setError('저장에 실패했습니다. (콘솔 로그 확인)');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    loadMyProfile();
  };

  return (
    <MainContainer>
      <ContentWrapper>
        <TabContainer>
          <Tab $active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>
            프로필
          </Tab>
          <Tab $active={activeTab === 'security'} onClick={() => setActiveTab('security')}>
            보안 및 설정
          </Tab>
        </TabContainer>

        {activeTab === 'profile' && (
          <TabContent>
            <ProfileSection>
              <ProfileHeader>
                <h2>프로필 정보</h2>
              </ProfileHeader>

              {loading && <div style={{ padding: '12px 0', color: '#666' }}>불러오는 중...</div>}
              {error && <div style={{ padding: '12px 0', color: '#dc2626' }}>{error}</div>}

              <ProfileAvatar>
                <AvatarCircle onClick={() => document.getElementById('settingsProfileImageInput')?.click()}>
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="프로필"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                    />
                  ) : serverProfileUrl ? (
                    <img
                      src={serverProfileUrl}
                      alt="프로필"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                      onError={(e) => {
                        console.warn('프로필 이미지 로드 실패:', serverProfileUrl);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <AvatarInitial>{profile.empName ? profile.empName.charAt(0) : '🙂'}</AvatarInitial>
                  )}
                  <CameraIcon>📷</CameraIcon>

                  <input
                    id="settingsProfileImageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </AvatarCircle>
              </ProfileAvatar>

              <InfoGrid>
                <InfoRow>
                  <InfoLabel>아이디</InfoLabel>
                  <InfoValue>
                    <FormInput type="text" value={profile.empId} disabled />
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>사번</InfoLabel>
                  <InfoValue>
                    <FormInput type="text" value={profile.empNo} disabled />
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>이름</InfoLabel>
                  <InfoValue>
                    <FormInput type="text" value={profile.empName} onChange={handleChangeProfile('empName')} />
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>나이</InfoLabel>
                  <InfoValue>
                    <FormInput type="number" value={profile.age ?? ''} onChange={handleChangeAge} min={0} />
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>이메일</InfoLabel>
                  <InfoValue>
                    <FormInput type="email" value={profile.email} onChange={handleChangeProfile('email')} />
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>전화번호</InfoLabel>
                  <InfoValue>
                    <FormInput type="tel" value={profile.phone} onChange={handlePhoneChange} inputMode='numeric' placeholder='010-1234-5678' maxLength={13}/>
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>직급(ROLE)</InfoLabel>
                  <InfoValue>
                    <FormInput type="text" value={profile.role} disabled />
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>직책(JOB)</InfoLabel>
                  <InfoValue>
                    <FormInput type="text" value={profile.job} disabled />
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>부서</InfoLabel>
                  <InfoValue>
                    <FormInput type="text" value={profile.departmentName} disabled />
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>항공사</InfoLabel>
                  <InfoValue>
                    <FormInput type="text" value={profile.airlineName} disabled />
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>입사일</InfoLabel>
                  <InfoValue>
                    <FormInput type="text" value={profile.startDate?.split('T')?.[0] || ''} disabled />
                  </InfoValue>
                </InfoRow>

                <InfoRow $fullWidth>
                  <InfoLabel>주소</InfoLabel>
                  <InfoValue style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <InputRow>
                      <FormInput type="text" value={profile.roadAddress || ''} placeholder="도로명/지번 주소" readOnly />
                      <SmallButton type="button" onClick={openKakaoAddressSearch} disabled={saving}>
                        주소 검색
                      </SmallButton>
                    </InputRow>

                    <FormInput
                      type="text"
                      value={profile.detailAddress || ''}
                      placeholder="상세주소"
                      onChange={handleDetailAddressChange}
                      disabled={saving}
                    />
                  </InfoValue>
                </InfoRow>
              </InfoGrid>

              <ActionButtons>
                <CancelButton onClick={handleCancel} disabled={saving}>
                  취소
                </CancelButton>

                <SaveButton onClick={handleSaveAll} disabled={saving}>
                  {saving ? '저장 중...' : '변경사항 저장'}
                </SaveButton>
              </ActionButtons>
            </ProfileSection>
          </TabContent>
        )}

        {activeTab === 'security' && (
          <TabContent>
            <SecuritySection>
              <SecurityCard>
                <SecurityCardHeader>
                  <h3>🔒 비밀번호 변경</h3>
                </SecurityCardHeader>
                <SecurityCardBody>
                  <SecurityItem>
                    <SecurityItemLeft>
                      <SecurityItemTitle>현재 비밀번호</SecurityItemTitle>
                      <SecurityItemDescription>현재 사용 중인 비밀번호를 입력해주세요</SecurityItemDescription>
                    </SecurityItemLeft>
                    <SecurityItemRight>
                      <PasswordInputGroup>
                        <PasswordInput type="password" placeholder="현재 비밀번호를 입력하세요" />
                      </PasswordInputGroup>
                    </SecurityItemRight>
                  </SecurityItem>

                  <SecurityItem>
                    <SecurityItemLeft>
                      <SecurityItemTitle>새 비밀번호</SecurityItemTitle>
                      <SecurityItemDescription>8자 이상, 영문, 숫자, 특수문자 포함</SecurityItemDescription>
                    </SecurityItemLeft>
                    <SecurityItemRight>
                      <PasswordInputGroup>
                        <PasswordInput type="password" placeholder="새 비밀번호를 입력하세요" />
                      </PasswordInputGroup>
                    </SecurityItemRight>
                  </SecurityItem>

                  <SecurityItem>
                    <SecurityItemLeft>
                      <SecurityItemTitle>비밀번호 확인</SecurityItemTitle>
                      <SecurityItemDescription>새 비밀번호를 다시 입력해주세요</SecurityItemDescription>
                    </SecurityItemLeft>
                    <SecurityItemRight>
                      <PasswordInputGroup>
                        <PasswordInput type="password" placeholder="비밀번호를 다시 입력하세요" />
                      </PasswordInputGroup>
                    </SecurityItemRight>
                  </SecurityItem>

                  <ActionButtons style={{ borderTop: 'none', paddingTop: 0 }}>
                    <ChangePasswordButton>비밀번호 변경</ChangePasswordButton>
                  </ActionButtons>
                </SecurityCardBody>
              </SecurityCard>

              <SecurityCard>
                <SecurityCardHeader>
                  <h3>🎨 테마</h3>
                </SecurityCardHeader>
                <SecurityCardBody>
                  <SecurityItem>
                    <SecurityItemLeft>
                      <SecurityItemTitle>다크 모드</SecurityItemTitle>
                      <SecurityItemDescription>어두운 테마로 전환하여 눈의 피로를 줄이세요</SecurityItemDescription>
                    </SecurityItemLeft>
                    <SecurityItemRight>
                      <ToggleSwitch>
                        <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} style={{ display: 'none' }} />
                        <ToggleSlider checked={isDarkMode} onClick={toggleDarkMode} />
                      </ToggleSwitch>
                    </SecurityItemRight>
                  </SecurityItem>

                  <SecurityItem>
                    <SecurityItemLeft>
                      <SecurityItemTitle>언어 선택</SecurityItemTitle>
                      <SecurityItemDescription>시스템 언어를 설정하세요</SecurityItemDescription>
                    </SecurityItemLeft>
                    <SecurityItemRight>
                      <LanguageSelect value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
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
                      <SecurityItemDescription>항공사별 브랜드 컬러를 테스트해보세요</SecurityItemDescription>
                    </SecurityItemLeft>
                    <SecurityItemRight>
                      <LanguageSelect value={currentAirline} onChange={(e) => changeAirline(e.target.value)}>
                        <option value="CONTROL_TOWER">Control Tower (기본)</option>
                        <option value="KE">대한항공 (Korean Air)</option>
                        <option value="LJ">진에어 (Jin Air)</option>
                      </LanguageSelect>
                    </SecurityItemRight>
                  </SecurityItem>

                  <SecurityItem>
                    <SecurityItemLeft>
                      <SecurityItemTitle>사용자 권한 (개발용)</SecurityItemTitle>
                      <SecurityItemDescription>개발 테스트를 위한 권한 전환 (페이지 새로고침 필요)</SecurityItemDescription>
                    </SecurityItemLeft>
                    <SecurityItemRight>
                      <LanguageSelect
                        value={localStorage.getItem('userRole') || 'EMP'}
                        onChange={(e) => {
                          const newRole = e.target.value;
                          localStorage.setItem('userRole', newRole);
                          updateRole(newRole);
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
