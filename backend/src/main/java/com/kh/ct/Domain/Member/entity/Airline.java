package com.kh.ct.Domain.Member.entity;

import com.kh.ct.Global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Airline extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long airlineId;

    @Column(length = 100)
    private String airlineName;

    @Column(length = 100)
    private String theme;

    @Column(length = 50)
    private String mainNumber;

    @Column(length = 255)
    private String airlineAddress;

    @Column(length = 500)
    private String airlineDesc;

    @JoinColumn(name = "airline_apply_id")
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    private AirlineApply airlineApplyId;

    @OneToMany(mappedBy = "airlineId", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AirlineAirport> airlineAirports = new ArrayList<>();
}