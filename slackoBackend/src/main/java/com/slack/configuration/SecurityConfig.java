package com.slack.configuration;

import static com.slack.utils.Mapping.*;

import com.slack.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    @Value("${fe_url}")
    private String feUrl;

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().httpBasic()
                .authenticationEntryPoint(restAuthenticationEntryPoint)
                .and().cors().and()
                .authorizeRequests()
                .antMatchers("/error**", "/", "/login**", API_VERSION + BOOK + "/**", API_VERSION + USER + "/**").permitAll()
                .antMatchers(API_VERSION + GROUP + "/**").hasRole("USER")
                .and()
                .formLogin().failureHandler(customAuthenticationFailureHandler())
                .and()
                .logout().deleteCookies("JSESSIONID").logoutSuccessHandler(logoutSuccessHandler())
                .invalidateHttpSession(true);
    }

    @Bean
    public AuthenticationFailureHandler customAuthenticationFailureHandler() {
        return new CustomAuthenticationFailureHandler();
    }

    @Bean
    public LogoutSuccessHandler logoutSuccessHandler() {
        return new CustomLogoutSuccessHandler();
    }
}
