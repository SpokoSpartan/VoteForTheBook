package com.slack.utils;

public class Mapping {

    public static final String API_VERSION = "/api/v1";

    public static final String USER = "/user";
    public static final String MESSAGE = "/message";
    public static final String GROUP = "/group";
    public static final String BOOK = "/book";
    public static final String AUTHOR = "/author";
    public static final String BOOK_CATEGORY = "/book-category";
    public static final String IMAGE = "/image";
    public static final String VOTE = "/vote";

    public static final String ADD_VOTE_FOR = "/add/for/{bookId}";
    public static final String REMOVE_VOTE_FROM = "/remove/from/{bookId}";
    public static final String GET_ALL = "/getAll/{name}";
    public static final String GET_ONE = "/getOne/{id}";
    public static final String CONFIRM = "/confirm/{confirmationToken}";
    public static final String CREATE = "/create";
    public static final String UPDATE = "/update/{id}";
    public static final String REMOVE = "/remove/{id}";
    public static final String GET_BY_ISBN = "/get-by-isbn/{isbn}";
    public static final String UPLOAD = "/upload";
}
