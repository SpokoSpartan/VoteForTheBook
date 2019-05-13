package com.slack.entities;

import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Round implements Serializable {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date beginningDate;

    private Date finishDate;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST},
                fetch = FetchType.LAZY)
    @JoinTable(name = "rounds_books",
            joinColumns = @JoinColumn(name = "round_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id"))
    private List<Book> consideredBooks;

    private Boolean isInitialized;
}
