package com.slack.DTOs;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Setter
@Getter
@RequiredArgsConstructor
public class GroupDTO {

    @NonNull
    @NotBlank(message = "Group name can't be blank")
    private String name;

    @NonNull
    @NotNull(message = "Please, specify the owner")
    private Long ownerId;
}
