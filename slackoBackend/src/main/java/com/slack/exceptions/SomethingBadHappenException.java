package com.slack.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class SomethingBadHappenException extends RuntimeException {
    public SomethingBadHappenException() {
        super("Something bad happen! Please try again for some time.");
    }
}
