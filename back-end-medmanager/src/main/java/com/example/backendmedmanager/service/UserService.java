package com.example.backendmedmanager.service;

import com.example.backendmedmanager.dto.UserDto;
import com.example.backendmedmanager.entity.User;
import com.example.backendmedmanager.entity.UserRole;
import com.example.backendmedmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User createUser(UserDto userDto) {
        return createUserWithRole(
                userDto.getImie(),
                userDto.getNazwisko(),
                userDto.getPesel(),
                userDto.getEmail(),
                userDto.getHaslo(),
                userDto.getTelefon(),
                UserRole.valueOf(userDto.getRola())
        );
    }

    public User createUserWithRole(
            String imie,
            String nazwisko,
            String pesel,
            String email,
            String haslo,
            String telefon,
            UserRole rola
    ) {
        User user = User.builder()
                .imie(imie)
                .nazwisko(nazwisko)
                .pesel(pesel)
                .email(email)
                .haslo(haslo)
                .telefon(telefon)
                .rola(rola)
                .build();
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}