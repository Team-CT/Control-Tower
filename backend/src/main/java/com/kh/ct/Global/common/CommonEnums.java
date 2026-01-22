package com.kh.ct.Global.common;

public class CommonEnums {
    public enum CommonStatus {
        Y,N
    }
    public enum ApplyStatus {
        PENDING, APPROVED, REJECTED
    }

    public enum AttendanceStatus {
        PRESENT,LATE,EARLY_LEAVE,HALF_DAY,VACATION,ABSENT
    }

    public enum Role{
        SUPER_ADMIN, AIRLINE_ADMIN, PILOT, CABIN_CREW
        , MAINTENANCE, GROUND_STAFF
    }

    public enum EmpStatus{
        Y,N,S
    }

    public enum flightStatus{
        DELAYED, CANCELLED, DEPARTED, ARRIVED, ASSIGNING, ASSIGNED
    }
}

