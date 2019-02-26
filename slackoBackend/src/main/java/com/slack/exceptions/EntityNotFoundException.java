package com.slack.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class EntityNotFoundException extends RuntimeException {
    public EntityNotFoundException(String entityname) {
        super("Sorry, but we can't find this " + entityname);
    }
}
