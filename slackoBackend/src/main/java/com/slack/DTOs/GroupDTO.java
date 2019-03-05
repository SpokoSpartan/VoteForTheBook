package com.slack.DTOs;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Setter
@Getter
@AllArgsConstructor
public class GroupDTO {

    @NotBlank(message = "Group name can't be blank")
    private String name;

    @NotNull(message = "Please, specify the owner")
    private Long ownerId;
}
