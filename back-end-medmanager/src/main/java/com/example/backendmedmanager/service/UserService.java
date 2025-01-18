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

    public User createUser(UserDto userDto) {
        return userRepository.save(User.builder()
                .imie(userDto.getImie())
                .nazwisko(userDto.getNazwisko())
                .pesel(userDto.getPesel())
                .email(userDto.getEmail())
                .haslo(userDto.getHaslo())
                .build());
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}