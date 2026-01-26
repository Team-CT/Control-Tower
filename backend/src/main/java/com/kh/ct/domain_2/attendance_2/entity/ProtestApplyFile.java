package com.kh.ct.domain_2.attendance_2.entity;

import com.kh.ct.global_2.entity.File;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ProtestApplyFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long protestApplyFileId;

    @JoinColumn(name = "protest_apply_id")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private ProtestApply protestApplyId;

    @JoinColumn(name = "file_id")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private File fileId;
}