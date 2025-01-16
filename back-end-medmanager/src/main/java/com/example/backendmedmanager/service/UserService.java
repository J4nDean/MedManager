package com.example.backendmedmanager.service;

import com.example.backendmedmanager.dto.UserDto;
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

    public User createUser(UserDto dto) {
        User user = User.builder()
                .imie(dto.getImie())
                .nazwisko(dto.getNazwisko())
                .pesel(dto.getPesel())
                .email(dto.getEmail())
                .haslo(dto.getHaslo())
                .rola(dto.getRola())
                .build();
        return userRepository.save(user);  // Save the user to the database
    }
}