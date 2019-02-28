package com.slack.services;

import com.slack.DTOs.GroupDTO;
import com.slack.entities.Group;
import com.slack.entities.User;
import com.slack.exceptions.EntityNotFoundException;
import com.slack.exceptions.ValidationException;
import com.slack.repositories.GroupRepository;
import com.slack.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    // this function return new group id;
    public Long createGroup(GroupDTO groupDTO) {
        User owner = userRepository.findById(groupDTO.getOwnerId()).orElseThrow(
                ()-> new EntityNotFoundException("user"));
        if(groupRepository.countAllByName(groupDTO.getName())> 0){
            throw new ValidationException("Sorry, this name is unavailable");
        }
        Group group = new Group(groupDTO.getName(), Arrays.asList(), Arrays.asList(owner));
        return groupRepository.save(group).getId();
    }

    //TODO: user who want to add new one must be admin
    public void addUserToGroup(Long newUserId, Long groupId) {
        User newUser = userRepository.findById(newUserId).orElseThrow(
                ()-> new EntityNotFoundException("user"));
        Group group = groupRepository.findById((groupId)).orElseThrow(
                ()-> new EntityNotFoundException("group"));
        List<User> members = group.getMembers();
        if(!members.contains(newUser)) {
            members.add(newUser);
            group.setMembers(members);
        }
        groupRepository.save(group);
    }

    //TODO: user who want to remove another user must be admin
    public void deleteUserFromGroup(Long userId, Long groupId) {
        Group group = groupRepository.findById((groupId)).orElseThrow(
                ()-> new EntityNotFoundException("group"));
        User user = userRepository.findById(userId).orElseThrow(
                ()-> new EntityNotFoundException("user"));
        List<User> members = group.getMembers();
        if(members.contains(user)) {
            members.remove(user);
            group.setMembers(members);
        }
        groupRepository.save(group);
    }

    //TODO: user who want to remove group must be admin
    //TODO: isn't this function useless
    public void deleteGroup(Long groupId) {
        Group group = groupRepository.findById((groupId)).orElseThrow(
                ()-> new EntityNotFoundException("group"));
        groupRepository.delete(group);
    }
    /*
    public void promoteUserToAdmin(Long userId, Long groupId) {
        Group group = groupRepository.findById((groupId)).orElseThrow(
                ()-> new EntityNotFoundException("group"));
        User user = userRepository.findById(userId).orElseThrow(
                ()-> new EntityNotFoundException("user"));
    }
    */
}
