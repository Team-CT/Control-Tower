package com.kh.ct.global.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * GET /favicon.ico 요청 처리.
 * 정적 favicon 파일이 없을 때 500 대신 204 반환하여 브라우저 기본 요청이 실패하지 않도록 함.
 */
@RestController
public class FaviconController {

  @GetMapping("/favicon.ico")
  public ResponseEntity<Void> favicon() {
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
