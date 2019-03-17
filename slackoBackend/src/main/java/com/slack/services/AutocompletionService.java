package com.slack.services;

import com.slack.DTOs.BookDTO;
import static com.slack.utils.Constans.*;

import com.slack.entities.Author;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AutocompletionService {

    public BookDTO getBookDetailsFromApiItBookStore(String isbn) {
        BookDTO bookDTO = null;
        if(isbn.length() == 13) {
            ResponseEntity<String> result = getResultFromHttpApi(isbn, IT_BOOK_STORE_API_LINK);
            if (result.getStatusCode().is2xxSuccessful()) {
                JSONObject bookJSON = new JSONObject(result.toString().replace("<200,", ""));
                if (bookJSON.getString("error").equals("0")) {
                    bookDTO = new BookDTO();
                    bookDTO.setTitle(bookJSON.getString("title"));
                    if (bookJSON.has("image"))
                        bookDTO.setCoverPictureUrl(bookJSON.getString("image"));
                    if (bookJSON.has("desc"))
                        bookDTO.setDescription(bookJSON.getString("desc"));
                    String[] authors = bookJSON.getString("authors").split(", ");
                    List<Author> authorList = new ArrayList<>();
                    for (String name : authors) {
                        Author author = new Author();
                        author.setAuthorFullName(name);
                        authorList.add(author);
                    }
                    if (bookJSON.has("year")) {
                        bookDTO.setAuthors(authorList);
                        Calendar calendar = Calendar.getInstance();
                        calendar.clear();
                        calendar.set(Calendar.YEAR, Integer.parseInt(bookJSON.getString("year").substring(0, 4)) + 1);
                        Date date = calendar.getTime();
                        bookDTO.setPublicationDate(date);
                    }
                }
            }
        }
        return bookDTO;
    }

    public BookDTO getBookDetailsFromApiGoogle(String isbn) {
        BookDTO bookDTO = null;
        ResponseEntity<String> result = getResultFromHttpApi(isbn, GOOGLE_API_LINK);
        if(result.getStatusCode().is2xxSuccessful()) {
            JSONObject responseJSON = new JSONObject(result.toString().replace("<200,", ""));
            if (responseJSON.getInt("totalItems") > 0) {
                bookDTO = new BookDTO();
                JSONObject volumeInfo = responseJSON.getJSONArray("items").getJSONObject(0).getJSONObject("volumeInfo");
                bookDTO.setTitle(volumeInfo.getString("title"));
                if (volumeInfo.has("imageLinks"))
                    bookDTO.setCoverPictureUrl(volumeInfo.getJSONObject("imageLinks").getString("thumbnail"));
                if (volumeInfo.has("description"))
                    bookDTO.setDescription(volumeInfo.getString("description"));
                List<Author> authorList = new ArrayList<>();
                String[] authors = volumeInfo.getJSONArray("authors").toString()
                        .replace("[", "")
                        .replace("]", "")
                        .replace("\"", "")
                        .split(",");
                for (String name : authors) {
                    Author author = new Author();
                    author.setAuthorFullName(name);
                    authorList.add(author);
                }
                bookDTO.setAuthors(authorList);
                if (volumeInfo.has("publishedDate")) {
                    Calendar calendar = Calendar.getInstance();
                    calendar.clear();
                    calendar.set(Calendar.YEAR, Integer.parseInt(volumeInfo.getString("publishedDate").substring(0, 4)) + 1);
                    Date date = calendar.getTime();
                    bookDTO.setPublicationDate(date);
                }
            }
        }
        return bookDTO;
    }

    public BookDTO getBookDetailsFromApiBN(String isbn) {
        BookDTO bookDTO = null;
        ResponseEntity<String> result = getResultFromHttpApi(isbn, BN_API_LINK);
        if(result.getStatusCode().is2xxSuccessful()) {

            JSONObject responseJSON = new JSONObject(result.toString().replace("<200,", ""));
            if(responseJSON.getJSONArray("bibs").length() > 0){
                JSONObject bibs = responseJSON.getJSONArray("bibs").getJSONObject(0);
                bookDTO = new BookDTO();
                bookDTO.setTitle(bibs.getString("title").replace(" /", ""));
                if (bibs.has("publicationYear")) {
                    Calendar calendar = Calendar.getInstance();
                    calendar.clear();
                    calendar.set(Calendar.YEAR, Integer.parseInt(bibs.getString("publicationYear")));
                    Date date = calendar.getTime();
                    bookDTO.setPublicationDate(date);
                }
                bookDTO.setDescription("");
                bookDTO.setCoverPictureUrl("");
                List<Author> authorList = new ArrayList<>();
                String[] authors = bibs.getString("author").split("\\.");
                for (String name : authors) {
                    if(name.contains("(")) {
                        Author author = new Author();
                        author.setAuthorFullName(name.replaceAll("\\([0-9]*-( )?[0-9]*\\)", "")
                                .replace(",", ""));
                        authorList.add(author);
                    }
                }
                bookDTO.setAuthors(authorList);
            }
        }
        return bookDTO;
    }

    private ResponseEntity<String> getResultFromHttpApi(String isbn, String uri) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", REST_AUTOCOMPLETION_CLIENT);
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        ResponseEntity<String> result = restTemplate.exchange(uri + isbn, HttpMethod.GET, entity, String.class);
        return result;
    }
}