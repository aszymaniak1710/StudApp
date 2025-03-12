package com.opi.StudApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@SpringBootApplication
public class StudAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudAppApplication.class, args);
	}

}
