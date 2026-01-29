package com.kh.ct.board.controller;

import com.kh.ct.board.service.FileService;
import com.kh.ct.global.entity.File;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long fileId) {
        try {
            // 1. DB에서 파일 정보 조회 (실제 경로, 원본 파일명 등)
            // fileService.getFileEntity(fileId) 같은 메서드가 필요합니다.
            File fileEntity = fileService.getFile(fileId);

            Path path = Paths.get(fileEntity.getPath());
            Resource resource = new UrlResource(path.toUri());

            // 2. 파일명이 한글일 경우 깨짐 방지 처리
            String encodedFileName = UriUtils.encode(fileEntity.getFileOriName(), StandardCharsets.UTF_8);

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + encodedFileName + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
