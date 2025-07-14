package com.tutorhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TutorhubBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(TutorhubBackendApplication.class, args);
    }
}