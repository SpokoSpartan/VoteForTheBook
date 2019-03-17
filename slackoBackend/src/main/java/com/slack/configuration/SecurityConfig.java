package com.slack.configuration;

import static com.slack.utils.Mapping.*;

import com.slack.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().httpBasic()//.authenticationEntryPoint(restAuthenticationEntryPoint)
                .and().cors().and()
                .authorizeRequests()
                .antMatchers("/error**", "/", "/login**", API_VERSION + BOOK + "/**").permitAll()
                .antMatchers(API_VERSION + GROUP + "/**").hasRole("USER")
                .and()
                .formLogin()
                .and()
                .logout().logoutSuccessUrl("/callback").deleteCookies("JSESSIONID")
                .invalidateHttpSession(true);
    }
}
