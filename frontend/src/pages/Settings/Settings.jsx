import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  SmallButton,
  InputRow,
} from './Settings.styled';

import { empService } from '../../api/emp/empService';
import { fileService } from '../../api/emp/fileService';
import { getApiBaseUrl } from '../../api/config';

/**
 * ✅ 전제
 * index.html <head>에 아래 스크립트 필요
 * <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
 */

// ===== 주소 조립/분해 유틸(컴포넌트 밖으로 이동해 의존성 안정화) =====
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

  // 권장 구분자
  if (raw.includes(ADDRESS_DELIMITER)) {
    const [road, ...rest] = raw.split(ADDRESS_DELIMITER);
    return { roadAddress: (road || '').trim(), detailAddress: rest.join(ADDRESS_DELIMITER).trim() };
  }

  // 혹시 과거 데이터가 | 만 쓰는 경우
  if (raw.includes('|')) {
    const [road, ...rest] = raw.split('|');
    return { roadAddress: (road || '').trim(), detailAddress: rest.join('|').trim() };
  }

  // 마지막 토큰이 상세로 보이는 경우(보조 규칙)
  const tokens = raw.split(/\s+/);
  if (tokens.length <= 1) return { roadAddress: raw, detailAddress: '' };

  const last = tokens[tokens.length - 1];
  const looksLikeDetail =
    /(호|층|동|관|번지|unit|room|#)$/i.test(last) ||
    /^\d{1,4}호$/.test(last) ||
    /^\d{1,2}층$/.test(last);

  if (!looksLikeDetail) return { roadAddress: raw, detailAddress: '' };

  return {
    roadAddress: tokens.slice(0, -1).join(' ').trim(),
    detailAddress: last.trim(),
  };
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [imageLoadError, setImageLoadError] = useState(false);

  // ✅ 비밀번호 변경 상태
  const [pwForm, setPwForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwError, setPwError] = useState(null);
  const [pwSuccess, setPwSuccess] = useState(null);

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

  /**
   * ✅ 브라우저 직접 호출(이미지 src 등)용 ORIGIN
   * - getApiBaseUrl() (배포에서 보통 https://api...)를 우선 사용
   * - 없으면 VITE_API_ORIGIN
   * - 그것도 없으면 localhost fallback
   *
   * 왜 ORIGIN이 필요하냐?
   * - <img src="..."> 는 axios BASE_URL / 프록시 개념이 아니라 브라우저가 직접 요청함
   */
  const API_ORIGIN = useMemo(() => {
    const byConfig = (getApiBaseUrl() || '').trim();
    const byEnv = (import.meta.env.VITE_API_ORIGIN || '').trim();

    // 백엔드 로컬 포트가 8001이 아니라면 여기만 바꾸면 됨
    const fallback = 'http://localhost:8001';

    return (byConfig || byEnv || fallback).replace(/\/$/, '');
  }, []);

  // ✅ 내 프로필 로드 (/me)
  const loadMyProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await empService.getMyProfile();
      const data = res?.data?.data || res?.data || {};

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
  }, []);

  useEffect(() => {
    loadMyProfile();
  }, [loadMyProfile]);

  const formatPhoneKR = (value) => {
    const digits = String(value || '').replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  };

  const handleChangeProfile = (key) => (e) => {
    setProfile((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneKR(e.target.value);
    setProfile((prev) => ({ ...prev, phone: formatted }));
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

  // ✅ 서버 저장 이미지 URL (브라우저가 직접 호출)
  const serverProfileUrl = useMemo(() => {
    return profile.profileImageId ? `${API_ORIGIN}/api/file/preview/${profile.profileImageId}` : null;
  }, [API_ORIGIN, profile.profileImageId]);

  useEffect(() => {
    setImageLoadError(false);
  }, [profile.profileImageId]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setProfilePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // ✅ 저장(이미지 + 텍스트 통합)
  const handleSaveAll = async () => {
    try {
      setSaving(true);
      setError(null);

      const finalAddress = buildAddress(profile.roadAddress, profile.detailAddress);

      // 1) 이미지가 선택된 경우 업로드해서 fileId 받기
      let nextProfileImageId = profile.profileImageId;

      if (profileImage) {
        const uploadRes = await fileService.upload(profileImage);
        const fileId = uploadRes?.data?.fileId || uploadRes?.data?.data?.fileId;

        if (!fileId) throw new Error('업로드 응답에 fileId가 없습니다.');
        nextProfileImageId = fileId;
      }

      // 2) 내 프로필 업데이트 (snake_case)
      await empService.updateMyProfile({
        emp_name: profile.empName,
        age: profile.age,
        email: profile.email,
        phone: profile.phone,
        address: finalAddress,
        profile_image_id: nextProfileImageId,
      });

      alert('변경사항이 저장되었습니다.');

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

  // ✅ 비밀번호 변경 입력 핸들러
  const handlePwChange = (key) => (e) => {
    setPwForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  // ✅ 비밀번호 변경 API 호출
  const handleChangePassword = async () => {
    try {
      setPwSaving(true);
      setPwError(null);
      setPwSuccess(null);

      if (!pwForm.currentPassword) return setPwError('현재 비밀번호를 입력해주세요.');
      if (!pwForm.newPassword) return setPwError('새 비밀번호를 입력해주세요.');
      if (pwForm.newPassword !== pwForm.confirmPassword)
        return setPwError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      if (pwForm.currentPassword === pwForm.newPassword)
        return setPwError('현재 비밀번호와 다른 비밀번호를 사용해주세요.');

      await empService.changeMyPassword({
        current_password: pwForm.currentPassword,
        new_password: pwForm.newPassword,
      });

      setPwSuccess('비밀번호가 변경되었습니다.');
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (e) {
      console.error('비밀번호 변경 실패:', e);
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        '비밀번호 변경에 실패했습니다. (현재 비밀번호를 확인하세요)';
      setPwError(msg);
    } finally {
      setPwSaving(false);
    }
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
                  ) : serverProfileUrl && !imageLoadError ? (
                    <img
                      src={serverProfileUrl}
                      alt="프로필"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                      onError={() => {
                        console.warn('프로필 이미지 로드 실패:', serverProfileUrl);
                        setImageLoadError(true);
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
                    <FormInput
                      type="tel"
                      value={profile.phone}
                      onChange={handlePhoneChange}
                      inputMode="numeric"
                      placeholder="010-1234-5678"
                      maxLength={13}
                    />
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
                  {pwError && <div style={{ padding: '10px 0', color: '#dc2626' }}>{pwError}</div>}
                  {pwSuccess && <div style={{ padding: '10px 0', color: '#16a34a' }}>{pwSuccess}</div>}

                  <SecurityItem>
                    <SecurityItemLeft>
                      <SecurityItemTitle>현재 비밀번호</SecurityItemTitle>
                      <SecurityItemDescription>현재 사용 중인 비밀번호를 입력해주세요</SecurityItemDescription>
                    </SecurityItemLeft>
                    <SecurityItemRight>
                      <PasswordInputGroup>
                        <PasswordInput
                          type="password"
                          placeholder="현재 비밀번호를 입력하세요"
                          value={pwForm.currentPassword}
                          onChange={handlePwChange('currentPassword')}
                          disabled={pwSaving}
                        />
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
                        <PasswordInput
                          type="password"
                          placeholder="새 비밀번호를 입력하세요"
                          value={pwForm.newPassword}
                          onChange={handlePwChange('newPassword')}
                          disabled={pwSaving}
                        />
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
                        <PasswordInput
                          type="password"
                          placeholder="비밀번호를 다시 입력하세요"
                          value={pwForm.confirmPassword}
                          onChange={handlePwChange('confirmPassword')}
                          disabled={pwSaving}
                        />
                      </PasswordInputGroup>
                    </SecurityItemRight>
                  </SecurityItem>

                  <ActionButtons style={{ borderTop: 'none', paddingTop: 0 }}>
                    <ChangePasswordButton onClick={handleChangePassword} disabled={pwSaving}>
                      {pwSaving ? '변경 중...' : '비밀번호 변경'}
                    </ChangePasswordButton>
                  </ActionButtons>
                </SecurityCardBody>
              </SecurityCard>
            </SecuritySection>
          </TabContent>
        )}
      </ContentWrapper>
    </MainContainer>
  );
};

export default Settings;