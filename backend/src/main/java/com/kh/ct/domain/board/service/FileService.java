package com.kh.ct.domain.board.service;

import com.kh.ct.global.repository.FileRepository;
import com.kh.ct.global.entity.File;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {
    private final FileRepository fileRepository;

    // 파일이 저장될 로컬 경로 (application.yml에서 관리 권장)
    private final String uploadPath = "C:/ct_uploads/";

    @Transactional
    public File saveFile(MultipartFile multipartFile) throws IOException {
        if (multipartFile.isEmpty()) return null;

        // 1. 디렉토리 생성
        java.io.File directory = new java.io.File(uploadPath);
        if (!directory.exists()) directory.mkdirs();

        // 2. 파일명 중복 방지 (UUID 사용)
        String originalName = multipartFile.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        String extension = originalName.substring(originalName.lastIndexOf("."));
        String savedName = uuid + extension;

        // 3. 물리적 저장
        multipartFile.transferTo(new java.io.File(uploadPath + savedName));

        // 4. File 엔티티 생성 및 저장
        File fileEntity = File.builder()
                .fileOriName(originalName)
                .fileName(savedName)
                .path(uploadPath + savedName)
                .size(multipartFile.getSize())
                .build();

        return fileRepository.save(fileEntity);
    }

    public File getFile(Long fileId) {
        // fileRepository는 아마 선언되어 있으실 겁니다.
        // 없다면 주입받으셔야 합니다.
        return fileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("해당 파일이 존재하지 않습니다. id=" + fileId));
    }
}
