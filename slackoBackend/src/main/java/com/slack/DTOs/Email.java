package com.slack.DTOs;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Setter
@Getter
@AllArgsConstructor
public class Email {

    @NotBlank(message = "The subject of the message is required")
    @Size(max = 200, message = "Subject can't exceed 200 characters")
    private String subject;

    @NotBlank(message = "The message can't be empty")
    @Size(max = 5000, message = "Message can't exceed 5000 characters")
    private String messageContext;
}