package com.kh.ct.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {

    @Bean
    public S3Client s3Client(@Value("${cloud.aws.region.static:ap-northeast-2}") String region) {
        return S3Client.builder()
                .region(software.amazon.awssdk.regions.Region.of(region))
                .build();
    }
}
