package com.slack.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.Min;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class VotingDTO {

    @Min(value = 1, message = "Min interval time should be 1")
    private Integer timeIntervalInSec;
}
