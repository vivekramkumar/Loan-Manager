    package com.loan.manager.config;

    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.context.support.ResourceBundleMessageSource;
    import org.springframework.core.task.TaskExecutor;
    import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;

    @Configuration
    public class BeanConfig {

        // password encryption
        @Bean
        public BCryptPasswordEncoder bCryptPasswordEncoder() {
            return new BCryptPasswordEncoder();
        }

      

       

        // for Query and path parameter validation, @Validated annotation requires this bean
        @Bean
        public MethodValidationPostProcessor methodValidationPostProcessor() {
            return new MethodValidationPostProcessor();
        }

    }
