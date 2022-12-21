package com.loan.manager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@EnableConfigurationProperties
public class LoanManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(LoanManagerApplication.class, args);
    }

}
