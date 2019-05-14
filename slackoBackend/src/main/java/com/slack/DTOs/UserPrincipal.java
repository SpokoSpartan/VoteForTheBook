package com.slack.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserPrincipal {

    private String username;
    private String role;
}
