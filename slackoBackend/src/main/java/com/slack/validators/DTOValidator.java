package com.slack.validators;

import com.slack.exceptions.ValidationException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.stream.Collectors;

public class DTOValidator {

    public static void validate(BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            List<String> errorsList = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.toList());
            throw new ValidationException(errorsList.stream().collect(Collectors.joining(". \n")));
        }
    }
}
