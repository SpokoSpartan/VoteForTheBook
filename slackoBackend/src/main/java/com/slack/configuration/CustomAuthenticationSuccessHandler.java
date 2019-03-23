package com.slack.configuration;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Base64;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse,
            Authentication authentication)
            throws IOException, ServletException {
        httpServletResponse.setStatus(HttpStatus.OK.value());
        String currentPrincipal = authentication.getName() + ";" + authentication.getAuthorities().toString();
        httpServletResponse.addCookie(new Cookie("dX-Nlcl-JvbG-Vz",
                                Base64.getEncoder().encodeToString(currentPrincipal.getBytes())));
    }
}
