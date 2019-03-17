package com.slack.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;

@Table(name = "\"User\"")
@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class User implements Serializable {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String email;

    @NonNull
    private String nickName;

    @JsonIgnore
    @NonNull
    private String password;

    @JsonIgnore
    @NonNull
    private String registrationToken;
}
