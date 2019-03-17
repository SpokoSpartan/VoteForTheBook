package com.slack.validators;

import com.slack.exceptions.ValidationException;
import lombok.extern.slf4j.Slf4j;
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

    public static void validateIsbn(String isbn) {
        String message = "";
        if(isbn.length() > 17 || isbn.length() < 10)
            message = message + "ISBN must be 10-17 numbers long." + " \n";
        if(isbn.trim().length() == 0 )
            message = message + "ISBN is required." + " \n";
        if(!isbn.matches("(([0-9Xx][- ]*){13}|([0-9Xx][- ]*){10})"))
            message = message + "ISBN isn't valid." + " \n";
        if(!message.equals(""))
            throw new ValidationException(message);
    }
}
