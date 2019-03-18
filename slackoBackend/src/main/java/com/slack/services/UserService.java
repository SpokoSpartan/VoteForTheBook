package com.slack.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.monitorjbl.json.JsonView;
import com.monitorjbl.json.JsonViewSerializer;
import com.monitorjbl.json.Match;
import com.slack.DTOs.Email;
import com.slack.DTOs.UserDTO;
import com.slack.entities.User;
import com.slack.exceptions.BadCredentialsException;
import com.slack.exceptions.SomethingBadHappenException;
import com.slack.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final EmailService emailService;

    @Value("${fe_url}")
    private String feUrl;

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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByNickName(username);
        if(user == null || !user.getRegistrationToken().equals("AUTHORIZED")) {
            user = new User();
            user.setNickName("null");
            user.setPassword("$2a$10$null");
        }
        return prepareUserForAuthentication(user);
    }

    private org.springframework.security.core.userdetails.User prepareUserForAuthentication(User user) {
        return new org.springframework.security.core.userdetails.User(
            user.getNickName(), user.getPassword(),
                Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
    }

    public Long createUser(UserDTO userDTO) {
        String registrationToken = DigestUtils.sha256Hex(userDTO.getNickName());
        if (registrationToken.length() > 30) {
            registrationToken = registrationToken.substring(0,30);
        }
        User user = new User(userDTO.getEmail(), userDTO.getNickName(),
                bCryptPasswordEncoder.encode(userDTO.getPassword()), registrationToken);
        emailService.sendSimpleMessage(new Email("Registration","Thank you for joining us." +
                        " Please confirm your email! " + feUrl + "/confirm/" + registrationToken),
                Arrays.asList(userDTO.getEmail()));
        return userRepository.save(user).getId();
    }

    public void confirmUserEmail(String registrationToken) {
        User user = userRepository.findUserByRegistrationToken(registrationToken);
        if(user == null) {
            throw new BadCredentialsException();
        }
        user.setRegistrationToken("AUTHORIZED");
        userRepository.save(user);
    }
}
