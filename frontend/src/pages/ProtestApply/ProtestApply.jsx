import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import api from '../../api/axios';
import SuccessModal from '../../components/SuccessModal';
import * as S from './ProtestApply.styled';

const ProtestApply = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const getEmpId = useAuthStore((state) => state.getEmpId);
    const empId = getEmpId();

    // location.state에서 선택된 날짜 데이터 가져오기
    const selectedDailyData = location.state?.selectedDailyData;
    const selectedDate = location.state?.selectedDate;

    const [formData, setFormData] = useState({
        attendanceType: 'NORMAL',  // 기본값: 정상출근
        protestRequestInTime: '',
        protestRequestOutTime: '',
        protestReason: '',
    });
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [availableOptions, setAvailableOptions] = useState([]);

    // 전체 근무 유형 옵션
    const allOptions = [
        { value: 'NORMAL', label: '정상출근' },
        { value: 'LATE', label: '지각' },
        { value: 'EARLY_LEAVE', label: '조퇴' },
        { value: 'ABSENT', label: '결근' },
        { value: 'LEAVE', label: '휴가' },
        { value: 'HALF_LEAVE', label: '반차' }
    ];

    // 휴가 관련 옵션만
    const leaveOnlyOptions = [
        { value: 'LEAVE', label: '휴가' },
        { value: 'HALF_LEAVE', label: '반차' }
    ];

    // 날짜에 따라 근무 유형 옵션 필터링
    useEffect(() => {
        if (!selectedDate) {
            alert('정정할 날짜를 선택해주세요');
            navigate('/my-attendance');
            return;
        }

        // 선택한 날짜와 오늘 날짜 비교
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 시간 제거하고 날짜만 비교

        const targetDate = new Date(selectedDate);
        targetDate.setHours(0, 0, 0, 0);

        // 미래 날짜면 휴가/반차만, 과거/오늘이면 전체 옵션
        if (targetDate > today) {
            setAvailableOptions(leaveOnlyOptions);
            // 미래 날짜인 경우 기본값을 휴가로 변경
            setFormData(prev => ({ ...prev, attendanceType: 'LEAVE' }));
        } else {
            setAvailableOptions(allOptions);
            // 과거/오늘인 경우 기본값을 정상출근으로 유지
            setFormData(prev => ({ ...prev, attendanceType: 'NORMAL' }));
        }
    }, [selectedDate, navigate]);

    // 시간 포맷팅 (HH:MM:SS -> HH:MM)
    const formatTime = (time) => {
        if (!time) return '-';
        if (typeof time === 'string') {
            const parts = time.split(':');
            return `${parts[0]}:${parts[1]}`;
        }
        return time;
    };

    // 파일 선택 핸들러
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    };

    // 파일 제거 핸들러
    const handleRemoveFile = (index) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    // 파일 크기 포맷팅
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    // 입력 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 유효성 검사
        if (!formData.protestReason.trim()) {
            alert('정정 사유를 입력하세요');
            return;
        }

        if (files.length === 0) {
            alert('증빙 파일을 최소 1개 이상 업로드해주세요');
            return;
        }

        // 출근 시간과 퇴근 시간 중 최소 하나는 입력되어야 함
        if (!formData.protestRequestInTime && !formData.protestRequestOutTime) {
            alert('정정 요청 출근 시간 또는 퇴근 시간을 입력하세요');
            return;
        }

        setLoading(true);

        try {
            // FormData 생성
            const formDataToSend = new FormData();
            formDataToSend.append('empId', empId);

            // attendanceId가 있으면 전송, 없으면 attendanceDate 전송
            if (selectedDailyData?.attendanceId) {
                formDataToSend.append('attendanceId', selectedDailyData.attendanceId);
            } else {
                formDataToSend.append('attendanceDate', selectedDate);
            }

            formDataToSend.append('attendanceType', formData.attendanceType);

            if (formData.protestRequestInTime) {
                formDataToSend.append('protestRequestInTime', formData.protestRequestInTime);
            }

            if (formData.protestRequestOutTime) {
                formDataToSend.append('protestRequestOutTime', formData.protestRequestOutTime);
            }

            formDataToSend.append('protestReason', formData.protestReason);

            // 파일 추가
            files.forEach(file => {
                formDataToSend.append('files', file);
            });

            // API 호출
            const response = await api.post('/api/attendance/protest', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('정정 신청 성공:', response.data);

            // 성공 모달 표시
            setShowSuccessModal(true);
        } catch (error) {
            console.error('정정 신청 실패:', error);

            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                '정정 신청에 실패했습니다';

            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // 취소 핸들러
    const handleCancel = () => {
        navigate('/my-attendance');
    };

    // 성공 모달 확인 핸들러
    const handleModalConfirm = () => {
        setShowSuccessModal(false);
        navigate('/my-attendance');
    };

    if (!selectedDate) {
        return null;
    }

    return (
        <S.MainContentArea>
            <S.PageHeader>
                <div>
                    <S.PageTitle>근태 정정 신청</S.PageTitle>
                    <S.PageDescription>
                        잘못된 근태 기록을 정정 요청하고 증빙 자료를 제출하세요
                    </S.PageDescription>
                </div>
            </S.PageHeader>

            <S.ContentGrid>
                {/* 왼쪽: 신청 폼 */}
                <S.LeftColumn>
                    <S.SectionCard>
                        <S.SectionTitle>정정 대상 근태</S.SectionTitle>
                        <S.CurrentRecordSection>
                            <S.RecordTitle>📅 {selectedDate}</S.RecordTitle>
                            {selectedDailyData ? (
                                <>
                                    <S.RecordItem>
                                        <S.RecordLabel>출근 시간</S.RecordLabel>
                                        <S.RecordValue>{formatTime(selectedDailyData.inTime)}</S.RecordValue>
                                    </S.RecordItem>
                                    <S.RecordItem>
                                        <S.RecordLabel>퇴근 시간</S.RecordLabel>
                                        <S.RecordValue>{formatTime(selectedDailyData.outTime)}</S.RecordValue>
                                    </S.RecordItem>
                                    <S.RecordItem>
                                        <S.RecordLabel>근무 시간</S.RecordLabel>
                                        <S.RecordValue>
                                            {selectedDailyData.workHours !== null ? `${selectedDailyData.workHours}시간` : '계산 불가'}
                                        </S.RecordValue>
                                    </S.RecordItem>
                                    <S.RecordItem>
                                        <S.RecordLabel>근태 상태</S.RecordLabel>
                                        <S.RecordValue>{selectedDailyData.attendanceStatus || '-'}</S.RecordValue>
                                    </S.RecordItem>
                                </>
                            ) : (
                                <S.RecordItem>
                                    <S.RecordLabel style={{ color: '#f59e0b' }}>⚠️ 출근 기록 없음</S.RecordLabel>
                                    <S.RecordValue style={{ color: '#6b7280' }}>
                                        정정 신청을 통해 근태를 등록할 수 있습니다.
                                    </S.RecordValue>
                                </S.RecordItem>
                            )}
                        </S.CurrentRecordSection>
                    </S.SectionCard>

                    <S.SectionCard>
                        <S.SectionTitle>정정 요청 시간</S.SectionTitle>
                        {/* 근무 유형 선택 */}
                        <S.FormGroup>
                            <S.Label>근무 유형 *</S.Label>
                            <S.Select
                                name="attendanceType"
                                value={formData.attendanceType}
                                onChange={handleInputChange}
                                required
                            >
                                {availableOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </S.Select>
                        </S.FormGroup>
                        <S.TimeInputGroup>
                            <S.InputWrapper>
                                <S.InputLabel>출근 시간</S.InputLabel>
                                <S.TimeInput
                                    type="time"
                                    name="protestRequestInTime"
                                    value={formData.protestRequestInTime}
                                    onChange={handleInputChange}
                                    placeholder="HH:MM"
                                />
                            </S.InputWrapper>
                            <S.InputWrapper>
                                <S.InputLabel>퇴근 시간</S.InputLabel>
                                <S.TimeInput
                                    type="time"
                                    name="protestRequestOutTime"
                                    value={formData.protestRequestOutTime}
                                    onChange={handleInputChange}
                                    placeholder="HH:MM"
                                />
                            </S.InputWrapper>
                        </S.TimeInputGroup>
                    </S.SectionCard>

                    <S.SectionCard>
                        <S.ReasonSection>
                            <S.ReasonLabel>정정 사유 *</S.ReasonLabel>
                            <S.ReasonTextarea
                                name="protestReason"
                                placeholder="정정이 필요한 사유를 상세히 입력하세요"
                                value={formData.protestReason}
                                onChange={handleInputChange}
                                rows={5}
                                required
                            />
                        </S.ReasonSection>

                        <S.FileUploadSection>
                            <S.FileUploadLabel>증빙 파일 업로드 *</S.FileUploadLabel>
                            <S.FileUploadArea onClick={() => document.getElementById('file-input').click()}>
                                <input
                                    id="file-input"
                                    type="file"
                                    multiple
                                    accept="image/*,.pdf"
                                    onChange={handleFileChange}
                                />
                                <S.FileUploadIcon>📎</S.FileUploadIcon>
                                <S.FileUploadText>클릭하여 파일 선택</S.FileUploadText>
                                <S.FileUploadHint>이미지 또는 PDF 파일 (여러 파일 선택 가능)</S.FileUploadHint>
                            </S.FileUploadArea>

                            {files.length > 0 && (
                                <S.FileList>
                                    {files.map((file, index) => (
                                        <S.FileItem key={index}>
                                            <S.FileInfo>
                                                <S.FileIcon>📄</S.FileIcon>
                                                <div>
                                                    <S.FileName>{file.name}</S.FileName>
                                                    <S.FileSize>{formatFileSize(file.size)}</S.FileSize>
                                                </div>
                                            </S.FileInfo>
                                            <S.RemoveButton onClick={() => handleRemoveFile(index)}>
                                                ×
                                            </S.RemoveButton>
                                        </S.FileItem>
                                    ))}
                                </S.FileList>
                            )}
                        </S.FileUploadSection>

                        <S.InfoBox>
                            <S.InfoTitle>ℹ️ 정정 신청 시 유의사항</S.InfoTitle>
                            <S.InfoList>
                                <S.InfoItem>• 증빙 자료는 필수로 제출해야 합니다</S.InfoItem>
                                <S.InfoItem>• 출근 시간 또는 퇴근 시간 중 최소 하나는 입력해야 합니다</S.InfoItem>
                                <S.InfoItem>• 정정 사유를 명확하게 작성해주세요</S.InfoItem>
                                <S.InfoItem>• 승인 후에는 근태 기록이 자동으로 수정됩니다</S.InfoItem>
                            </S.InfoList>
                        </S.InfoBox>

                        <S.ActionButtons>
                            <S.CancelButton type="button" onClick={handleCancel}>
                                취소
                            </S.CancelButton>
                            <S.SubmitButton
                                type="submit"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? '신청 중...' : '📝 정정 신청하기'}
                            </S.SubmitButton>
                        </S.ActionButtons>
                    </S.SectionCard>
                </S.LeftColumn>

                {/* 오른쪽: 안내 */}
                <S.RightColumn>
                    <S.SidebarCard>
                        <S.SidebarTitle>정정 신청 안내</S.SidebarTitle>
                        <S.GuideItem>
                            <S.GuideTitle>1. 정정 대상 확인</S.GuideTitle>
                            <S.GuideText>
                                현재 기록된 출퇴근 시간을 확인하세요
                            </S.GuideText>
                        </S.GuideItem>
                        <S.GuideItem>
                            <S.GuideTitle>2. 정정 시간 입력</S.GuideTitle>
                            <S.GuideText>
                                실제 출근 또는 퇴근 시간을 입력하세요
                            </S.GuideText>
                        </S.GuideItem>
                        <S.GuideItem>
                            <S.GuideTitle>3. 사유 작성</S.GuideTitle>
                            <S.GuideText>
                                정정이 필요한 구체적인 사유를 작성하세요
                            </S.GuideText>
                        </S.GuideItem>
                        <S.GuideItem>
                            <S.GuideTitle>4. 증빙 자료 첨부</S.GuideTitle>
                            <S.GuideText>
                                출퇴근을 증명할 수 있는 자료를 첨부하세요
                            </S.GuideText>
                        </S.GuideItem>
                    </S.SidebarCard>

                    <S.SidebarCard>
                        <S.SidebarTitle>증빙 자료 예시</S.SidebarTitle>
                        <S.GuideItem>
                            <S.GuideText>
                                • 출퇴근 카드 사진<br />
                                • 업무 이메일 캡처<br />
                                • 회의록 또는 업무 기록<br />
                                • 교통카드 사용 내역
                            </S.GuideText>
                        </S.GuideItem>
                    </S.SidebarCard>
                </S.RightColumn>
            </S.ContentGrid>

            {/* 성공 모달 */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                onConfirm={handleModalConfirm}
                title="정정 신청 완료"
                message="근태 정정 신청이 성공적으로 완료되었습니다. 승인 결과는 근태 현황 페이지에서 확인하실 수 있습니다."
            />
        </S.MainContentArea>
    );
};

export default ProtestApply;
