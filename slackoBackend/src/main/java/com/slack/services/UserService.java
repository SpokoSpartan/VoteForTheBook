package com.slack.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.monitorjbl.json.JsonView;
import com.monitorjbl.json.JsonViewSerializer;
import com.monitorjbl.json.Match;
import com.slack.entities.User;
import com.slack.exceptions.SomethingBadHappenException;
import com.slack.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    private final SimpleModule module = new SimpleModule()
            .addSerializer(JsonView.class, new JsonViewSerializer());
    private final ObjectMapper mapper = new ObjectMapper()
            .registerModule(module);

    public String findAllByFirstPartOfNick(String name) {
        List<User> users = userRepository.findAllByFirstPartOfNick(name.toUpperCase());
        try {
            return mapper.writeValueAsString(JsonView.with(users)
                    .onClass(User.class, Match.match().exclude("id")));
        } catch (JsonProcessingException e) {
            throw new SomethingBadHappenException();
        }
    }
}
