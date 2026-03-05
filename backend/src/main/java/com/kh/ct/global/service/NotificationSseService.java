package com.kh.ct.global.service;

import com.kh.ct.global.dto.NotificationDto;
import com.kh.ct.global.entity.Alarm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.concurrent.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationSseService {

    private final ConcurrentHashMap<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    // 하트비트 태스크 저장
    private final ConcurrentHashMap<String, ScheduledFuture<?>> heartbeatTasks = new ConcurrentHashMap<>();

    // 하트비트 스케줄러 (1개 스레드면 충분)
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    // 2분 끊김이면 25초 권장
    private static final long HEARTBEAT_SECONDS = 25;


    public SseEmitter createConnection(String empId) {
        log.info("SSE 연결 생성 - empId: {}", empId);

        SseEmitter emitter = new SseEmitter(30 * 60 * 1000L);

        emitter.onCompletion(() -> {
            log.info("SSE 연결 완료 - empId: {}", empId);
            //emitters.remove(empId);
            cleanup(empId);
        });

        emitter.onTimeout(() -> {
            log.info("SSE 연결 타임아웃 - empId: {}", empId);
            //emitters.remove(empId);
            cleanup(empId);
        });

        emitter.onError((ex) -> {
            log.error("SSE 연결 에러 - empId: {}", empId, ex);
            //emitters.remove(empId);
            cleanup(empId);
        });

        emitters.put(empId, emitter);

        try {
            emitter.send(SseEmitter.event()
                    .name("connect")
                    .data("connected"));
        } catch (IOException e) {
            log.error("SSE 초기 메시지 전송 실패", e);
            //emitters.remove(empId);
            cleanup(empId);
            return emitter;
        }

        // 하트비트 시작 (comment는 프론트에서 이벤트로 안 잡힘)
        ScheduledFuture<?> task = scheduler.scheduleAtFixedRate(() -> {
            try {
                emitter.send(SseEmitter.event().name("ping").data("ok"));
            } catch (IOException | IllegalStateException e) {
                // 연결이 끊긴 것으로 보고 정리
                log.debug("SSE 하트비트 전송 실패 - empId: {}, msg: {}", empId, e.getMessage());
                cleanup(empId);
            }
        }, HEARTBEAT_SECONDS, HEARTBEAT_SECONDS, TimeUnit.SECONDS);

        heartbeatTasks.put(empId, task);

        return emitter;
    }

    public void sendNotificationToUser(String empId, Alarm alarm) {
        log.info("알림 전송 시도 - empId: {}, alarmId: {}", empId, alarm.getAlarmId());

        SseEmitter emitter = emitters.get(empId);
        if (emitter != null) {
            try {
                NotificationDto.NotificationResponse response = NotificationDto.NotificationResponse.from(alarm);
                emitter.send(SseEmitter.event()
                        .id(String.valueOf(alarm.getAlarmId()))
                        .name("notification")
                        .data(response));
                log.info("알림 전송 성공 - empId: {}, alarmId: {}", empId, alarm.getAlarmId());
            } catch (IOException e) {
                log.error("알림 전송 실패 - empId: {}, alarmId: {}", empId, alarm.getAlarmId(), e);
                emitters.remove(empId);
            }
        } else {
            log.debug("SSE 연결이 없음 - empId: {}", empId);
        }
    }

    public void removeConnection(String empId) {
        log.info("SSE 연결 제거 - empId: {}", empId);
        SseEmitter emitter = emitters.remove(empId);
        if (emitter != null) {
            emitter.complete();
        }
    }

    private void cleanup(String empId) {
        // 하트비트 중지
        ScheduledFuture<?> task = heartbeatTasks.remove(empId);
        if (task != null) {
            task.cancel(true);
        }

        // emitter 제거/완료
        SseEmitter emitter = emitters.remove(empId);
        if (emitter != null) {
            try {
                emitter.complete();
            } catch (Exception ignored) {
            }
        }
    }
}

