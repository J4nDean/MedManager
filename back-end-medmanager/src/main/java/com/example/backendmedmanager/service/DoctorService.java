package com.example.backendmedmanager.service;

import com.example.backendmedmanager.dto.DoctorDto;
import com.example.backendmedmanager.entity.Doctor;
import com.example.backendmedmanager.entity.User;
import com.example.backendmedmanager.entity.UserRole;
import com.example.backendmedmanager.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorRepository doctorRepository;
    private final UserService userService;

    public Page<Doctor> findDoctors(String name, String specialization, Pageable pageable) {
        return doctorRepository.findBySpecjalizacjaAndName(specialization, name, pageable);
    }

    @Transactional
    public Doctor registerDoctor(DoctorDto doctorDto) {
        User user = User.builder()
                .imie(doctorDto.getImie())
                .nazwisko(doctorDto.getNazwisko())
                .pesel(doctorDto.getPesel())
                .email(doctorDto.getEmail())
                .haslo(doctorDto.getHaslo())
                .telefon(doctorDto.getTelefon())
                .rola(UserRole.LEKARZ)
                .build();

        user = userService.saveUser(user);

        Doctor doctor = Doctor.builder()
                .specjalizacja(doctorDto.getSpecjalizacja())
                .user(user)
                .build();

        return doctorRepository.save(doctor);
    }
}