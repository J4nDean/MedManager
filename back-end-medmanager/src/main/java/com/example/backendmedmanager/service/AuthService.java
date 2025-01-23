package com.example.backendmedmanager.service;

import com.example.backendmedmanager.dto.AuthResponseDTO;
import com.example.backendmedmanager.dto.LoginDTO;
import com.example.backendmedmanager.dto.RegisterDTO;
import com.example.backendmedmanager.entity.Doctor;
import com.example.backendmedmanager.entity.Patient;
import com.example.backendmedmanager.entity.User;
import com.example.backendmedmanager.repository.DoctorRepository;
import com.example.backendmedmanager.repository.PatientRepository;
import com.example.backendmedmanager.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    public AuthService(UserRepository userRepository,
                       DoctorRepository doctorRepository,
                       PatientRepository patientRepository) {
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }

    public AuthResponseDTO login(LoginDTO loginDTO) {
        try {
            User user = userRepository.findByLogin(loginDTO.getLogin())
                    .orElseThrow(() -> new RuntimeException("Nieprawidłowy email lub hasło"));

            if (!loginDTO.getPassword().equals(user.getPassword())) {
                throw new RuntimeException("Nieprawidłowy email lub hasło");
            }

            Long entityId;
            if ("DOCTOR".equals(user.getRole())) {
                Doctor doctor = doctorRepository.findByUserId(user.getId())
                        .orElseThrow(() -> new RuntimeException("Nie znaleziono lekarza"));
                entityId = doctor.getId();
            } else if ("PATIENT".equals(user.getRole())) {
                Patient patient = patientRepository.findByUserId(user.getId())
                        .orElseThrow(() -> new RuntimeException("Nie znaleziono pacjenta"));
                entityId = patient.getId();
            } else {
                throw new RuntimeException("Nieprawidłowa rola użytkownika");
            }

            return new AuthResponseDTO(user.getRole(), entityId, "dummy-token");
        } catch (Exception e) {
            logger.error("Login error: ", e);
            throw new RuntimeException("Nieprawidłowy email lub hasło");
        }
    }

    public void register(RegisterDTO registerDTO) {
    }
}