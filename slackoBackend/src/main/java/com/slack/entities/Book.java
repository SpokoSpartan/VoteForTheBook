package com.slack.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Book implements Serializable {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 10, max = 13, message = "ISBN must be 10 or 13 numbers long")
    @NotBlank(message = "ISBN is required")
    @Pattern(regexp = "(([0-9Xx][- ]*){13}|([0-9Xx][- ]*){10})", message = "ISBN is not valid")
    private String isbn;

    @Size(max = 1000, message = "Title can't exceed 1000 characters")
    @NotBlank(message = "Title is required")
    private String title;

    @Size(max = 20000, message = "Description can't exceed 20000 characters")
    private String description;

    @Size(max = 1000, message = "Cover picture URL can't exceed 1000 characters")
    private String coverPictureUrl;

    @Past(message = "Publication date should be a past date")
    private Date publicationDate;

    @NotNull(message = "At least one book author is required.")
    @ManyToMany(cascade = {
            CascadeType.MERGE,
            CascadeType.PERSIST},
            fetch = FetchType.LAZY)
    @JoinTable(name = "book_details_authors",
            joinColumns = @JoinColumn(name = "book_details_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id"))
    private List<Author> authors;

    @NotNull(message = "At least one book category is required.")
    @ManyToMany(cascade = {
            CascadeType.MERGE,
            CascadeType.PERSIST},
            fetch = FetchType.LAZY)
    @JoinTable(name = "book_details_categories",
            joinColumns = @JoinColumn(name = "book_details_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<BookCategory> categories;

    @Transient
    private Boolean isVotedByUser;

    @JsonIgnore
    @ManyToMany(cascade = {
            CascadeType.MERGE,
            CascadeType.PERSIST},
            fetch = FetchType.LAZY)
    @JoinTable(name = "users_voting",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> votedUsers;
}
