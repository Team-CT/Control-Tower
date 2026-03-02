import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './BoardDetail.styled';
import { ArrowLeft, Calendar, Eye, User, Trash2 } from 'lucide-react';
import { Paperclip, Download } from 'lucide-react';

// ✅ 공통 axios 인스턴스 사용 (인터셉터/refresh/withCredentials 일관성)
import api from '../../api/axios'; // ← 경로는 프로젝트에 맞게 수정

const BoardDetail = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // StrictMode 중복 호출 방지용
  const isFetched = useRef(false);

  const getMyEmpId = () => {
    try {
      const storage = JSON.parse(localStorage.getItem('auth-storage'));
      return storage?.state?.emp?.empId ?? null;
    } catch {
      return null;
    }
  };

  const myEmpId = getMyEmpId();
  const isOwner = post?.writerId && myEmpId && post.writerId === myEmpId;

  // --- [1] 상세 데이터 로드 ---
  useEffect(() => {
    if (!boardId) return;
    if (isFetched.current) return;
    isFetched.current = true;

    const fetchPostDetail = async () => {
      try {
        setLoading(true);

        // ✅ 배포 안전: baseURL은 DEV/PROD에서 config로 분기됨
        const res = await api.get(`/board/detail/${boardId}`);
        setPost(res.data);
      } catch (error) {
        console.error('상세 데이터 로드 실패:', error);

        const status = error?.response?.status;
        if (status === 401) alert('로그인이 필요합니다.');
        else if (status === 403) alert('권한이 없습니다.');
        else alert('게시글을 불러올 수 없습니다.');

        // 재시도 허용(실패했을 때만)
        isFetched.current = false;
        navigate('/board');
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [boardId, navigate]);

  const handleBack = () => navigate(-1);

  // --- [2] 삭제 ---
  const handleDelete = async () => {
    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) return;

    try {
      // ✅ axios로 통일
      await api.delete(`/board/delete/${boardId}`);

      alert('삭제되었습니다.');
      navigate('/board');
    } catch (error) {
      console.error('삭제 실패:', error);

      const status = error?.response?.status;
      if (status === 401) alert('로그인이 필요합니다.');
      else if (status === 403) alert('삭제 권한이 없습니다.');
      else alert('삭제에 실패했습니다.');
    }
  };

  // --- [3] 첨부파일 다운로드 (권장: blob 방식) ---
  const handleDownload = async (file) => {
    try {
      // fileId / originName 등은 너 백엔드 DTO에 맞춰 방어적으로 처리
      const fileId = file?.fileId ?? file?.id;
      const filename = file?.originName ?? file?.fileOriginName ?? `file-${fileId}`;

      if (!fileId) {
        alert('파일 정보가 올바르지 않습니다.');
        return;
      }

      // ✅ responseType: 'blob' 으로 다운로드
      // 경로: 네 코드에 /api/file/download/{fileId} 를 사용 중이니 그걸 그대로 사용
      const res = await api.get(`/file/download/${fileId}`, {
        responseType: 'blob',
      });

      // 브라우저 다운로드 트리거
      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('파일 다운로드 실패:', error);

      const status = error?.response?.status;
      if (status === 401) alert('로그인이 필요합니다.');
      else if (status === 403) alert('다운로드 권한이 없습니다.');
      else alert('파일 다운로드에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <S.PageContainer>
        <div style={{ textAlign: 'center', padding: '100px' }}>로딩 중...</div>
      </S.PageContainer>
    );
  }

  if (!post) {
    return (
      <S.PageContainer>
        <div style={{ textAlign: 'center', padding: '100px' }}>데이터가 없습니다.</div>
      </S.PageContainer>
    );
  }

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
              <S.CategoryBadge $bgColor={post.boardType === '공지사항' ? '#FFE5E5' : '#E5F1FF'}>
                {post.boardType}
              </S.CategoryBadge>

              <S.PostTitle>{post.boardTitle}</S.PostTitle>

              <S.PostMeta>
                <S.MetaItem>
                  <User size={16} />
                  {post.writerName}
                </S.MetaItem>

                <S.MetaItem>
                  <Calendar size={16} />
                  {post.createDate}
                </S.MetaItem>

                <S.MetaItem>
                  <Eye size={16} />
                  {post.boardCount}
                </S.MetaItem>
              </S.PostMeta>
            </S.PostHeader>

            <S.PostBody>
              <S.ContentParagraph style={{ whiteSpace: 'pre-wrap' }}>
                {post.boardContent}
              </S.ContentParagraph>

              {/* ✅ 첨부파일 영역 */}
              {Array.isArray(post.files) && post.files.length > 0 && (
                <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                  <div
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Paperclip size={18} /> 첨부파일 ({post.files.length})
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {post.files.map((file, index) => (
                      <li key={file.fileId ?? file.id ?? index} style={{ marginBottom: '8px' }}>
                        <button
                          type="button"
                          onClick={() => handleDownload(file)}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            color: '#007bff',
                            textDecoration: 'none',
                            fontSize: '14px',
                            backgroundColor: '#f8f9fa',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #e9ecef',
                            cursor: 'pointer',
                          }}
                          title="다운로드"
                        >
                          <Download size={14} />
                          {file.originName ?? file.fileOriginName ?? file.fileName ?? '첨부파일'}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </S.PostBody>
          </S.PostCard>

          <S.ActionButtons>
            <S.ListButton onClick={handleBack}>목록</S.ListButton>

            {isOwner && (
              <S.EditButton onClick={() => navigate(`/board/edit/${post.boardId}`)}>
                수정
              </S.EditButton>
            )}

            {isOwner && (
              <S.DeleteButton onClick={handleDelete}>
                <Trash2 size={16} /> 삭제
              </S.DeleteButton>
            )}
          </S.ActionButtons>
        </S.ContentWrapper>
      </S.MainContent>
    </S.PageContainer>
  );
};

export default BoardDetail;