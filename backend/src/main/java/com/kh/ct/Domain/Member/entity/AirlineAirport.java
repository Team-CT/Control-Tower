package com.kh.ct.Domain.Member.entity;

import com.kh.ct.Domain.Schedule.entity.Airport;
import com.kh.ct.Global.common.CommonEnums;
import com.kh.ct.Global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AirlineAirport extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long AirlineAirportId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.CommonStatus routeStatus;

    @JoinColumn(name = "airline_id")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Airline airlineId;

    @JoinColumn(name = "airport_id")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Airport airportId;
}
