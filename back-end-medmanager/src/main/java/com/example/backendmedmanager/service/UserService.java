// src/main/java/com/example/medicalsystem/service/UserService.java
package com.example.backendmedmanager.service;

import com.example.backendmedmanager.entity.User;
import com.example.backendmedmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}