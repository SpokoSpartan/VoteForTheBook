package com.slack.DTOs;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Setter
@Getter
@AllArgsConstructor
public class UserDTO {

    @NotBlank(message = "Please, specify the nick name")
    private String nickName;

    @Email(message = "Email need to be specify in appropriate format")
    @NotBlank(message = "Email name is required")
    private String email;

    @NotBlank(message = "Please, specify the password")
    private String password;
}
