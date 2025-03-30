package com.opi.StudApp.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    // Logowanie request body przed wywołaniem metody kontrolera
    @Before("execution(* com.opi.StudApp.Controller.*(..)) && @annotation(org.springframework.web.bind.annotation.RequestMapping)")
    public void logRequestBody(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        if (args.length > 0) {
            logger.info("Request Body: " + args[0].toString());
        }
    }

    // Logowanie response body oraz status po wywołaniu metody kontrolera
    @AfterReturning(pointcut = "execution(* com.opi.StudApp.Controller.*(..))", returning = "result")
    public void logResponseBody(JoinPoint joinPoint, Object result) {
        if (result instanceof ResponseEntity) {
            ResponseEntity<?> responseEntity = (ResponseEntity<?>) result;
            logger.info("Response Body: " + responseEntity.getBody());
            logger.info("Response Status: " + responseEntity.getStatusCode());
        }
    }
}

