package com.example.backendmedmanager.service;

import com.example.backendmedmanager.dto.doctor.DoctorRegistrationDto;
import com.example.backendmedmanager.entity.Doctor;
import com.example.backendmedmanager.entity.User;
import com.example.backendmedmanager.entity.UserRole;
import com.example.backendmedmanager.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorRepository doctorRepository;
    private final UserService userService;

    @Transactional
    public Doctor registerDoctor(DoctorRegistrationDto doctorDto) {
        // Tworzenie użytkownika z rolą LEKARZ
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

        // Tworzenie wpisu lekarza
        Doctor doctor = Doctor.builder()
                .specjalizacja(doctorDto.getSpecjalizacja())
                .user(user)
                .build();

        return doctorRepository.save(doctor);
    }

    public List<Doctor> findAllDoctors() {
        return doctorRepository.findAll();
    }

    public List<Doctor> findAllDoctors(String sort, String specialization) {
        if (sort != null) {
            Sort sortOrder = Sort.by(Sort.Direction.ASC, sort);
            if (specialization != null) {
                return doctorRepository.findBySpecjalizacja(specialization, sortOrder);
            } else {
                return doctorRepository.findAll(sortOrder);
            }
        } else {
            if (specialization != null) {
                return doctorRepository.findBySpecjalizacja(specialization);
            } else {
                return doctorRepository.findAll();
            }
        }
    }
}