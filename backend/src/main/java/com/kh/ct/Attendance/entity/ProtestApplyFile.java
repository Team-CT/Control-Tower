package com.kh.ct.Attendance.entity;

import com.kh.ct.Common.entity.File;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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