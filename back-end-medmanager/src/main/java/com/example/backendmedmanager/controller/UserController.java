package com.example.backendmedmanager.controller;

import com.example.backendmedmanager.dto.UserDto;
import com.example.backendmedmanager.entity.User;
import com.example.backendmedmanager.repository.UserRepository;
import com.example.backendmedmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    // Endpoint do rejestracji użytkownika - tylko POST
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserDto userDto) {
        User newUser = userService.createUser(userDto);
        return ResponseEntity.ok(newUser);
    }

    // Opcjonalny endpoint GET do pobierania użytkowników
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}