package com.slack.DTOs;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Setter
@Getter
@RequiredArgsConstructor
public class UserDTO {

    @NonNull
    @NotBlank(message = "Please, specify the nick name")
    private String nickName;

    @NonNull
    @Email(message = "Email need to be specify in appropriate format")
    @NotBlank(message = "Email name is required")
    private String email;

    @NonNull
    @NotBlank(message = "Please, specify the password")
    private String password;
}
