package com.slack.entities;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Message implements Serializable {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String context;

    @NonNull
    @OneToOne(cascade = {
            CascadeType.MERGE,
            CascadeType.PERSIST},
            fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private User sender;

    @Setter(AccessLevel.NONE)
    @CreationTimestamp
    private Date sendDate;

    @Setter(AccessLevel.NONE)
    @UpdateTimestamp
    private Date updateDate;

    @NonNull
    private Boolean isDisplayed;
}
