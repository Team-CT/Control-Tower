package com.kh.ct.domain.health.service;

import com.kh.ct.domain.emp.entity.Emp;
import com.kh.ct.domain.emp.repository.EmpRepository;
import com.kh.ct.domain.health.dto.SurveyDto;
import com.kh.ct.domain.health.entity.EmpSurvey;
import com.kh.ct.domain.health.repository.SurveyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SurveyServiceImpl implements SurveyService {

    private final EmpRepository empRepository;
    private final SurveyRepository surveyRepository;

    @Transactional(readOnly = true)
    @Override
    public SurveyDto.SurveyResponse surveyInfo(String empId) {

        Emp emp = empRepository.findById(empId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 empId: " + empId));

        EmpSurvey survey = surveyRepository
                .findTopByEmpId_EmpIdOrderByCreateDateDesc(empId)   // 메서드명은 실제에 맞게
                .orElse(null);


        return SurveyDto.SurveyResponse.builder()
                .empId(empId)
                .empName(emp.getEmpName())
                .departmentName(
                        emp.getDepartmentId() == null ? null : emp.getDepartmentId().getDepartmentName()
                )
                .job(emp.getJob())
                .startDate(emp.getStartDate())
                .createDate(survey == null ? null : survey.getCreateDate())
                .build();
    }

    @Transactional
    @Override
    public Long saveSurvey(String empId, int workStressPoint, int commuStressPoint, int recoveryStressPoint) {

        System.out.println(empId);
        System.out.println(workStressPoint);
        System.out.println(commuStressPoint);
        System.out.println(recoveryStressPoint);
        Emp emp = empRepository.findById(empId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 empId: " + empId));

        SurveyDto.SurveyRequest req = SurveyDto.SurveyRequest.builder()
                .empId(emp)
                .workStressPoint(workStressPoint)
                .commuStressPoint(commuStressPoint)
                .recoveryStressPoint(recoveryStressPoint)
                .build();

        EmpSurvey survey =  surveyRepository.save(req.toEntity());

        return survey.getEmpSurveyId();
    }
}
