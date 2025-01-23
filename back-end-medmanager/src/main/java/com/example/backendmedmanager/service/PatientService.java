package com.example.backendmedmanager.service;

import com.example.backendmedmanager.dto.PatientDTO;
import com.example.backendmedmanager.dto.PatientDetailsDTO;
import com.example.backendmedmanager.dto.PrescriptionDTO;
import com.example.backendmedmanager.entity.Patient;
import com.example.backendmedmanager.entity.Prescription;
import com.example.backendmedmanager.entity.PrescriptionStatus;
import com.example.backendmedmanager.entity.User;
import com.example.backendmedmanager.repository.PatientRepository;
import com.example.backendmedmanager.repository.PrescriptionRepository;
import com.example.backendmedmanager.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PatientService {
    private final PatientRepository patientRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final UserRepository userRepository;

    public PatientService(PatientRepository patientRepository,
                          PrescriptionRepository prescriptionRepository,
                          UserRepository userRepository) {
        this.patientRepository = patientRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.userRepository = userRepository;
    }

    public List<PrescriptionDTO> getPatientPrescriptions(Long patientId) {
        List<Prescription> prescriptions = prescriptionRepository.findByPatientIdOrderByIssueDateDesc(patientId);
        return prescriptions.stream()
                .map(this::convertToPrescriptionDTO)
                .collect(Collectors.toList());
    }

    public void updatePatientEmail(Long patientId, String newEmail) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono pacjenta"));

        User user = patient.getUser();
        if (user == null) {
            user = new User();
            user.setLogin(newEmail);
            user = userRepository.save(user);
            patient.setUser(user);
        } else {
            user.setLogin(newEmail);
            userRepository.save(user);
        }

        patientRepository.save(patient);
    }

    private PatientDTO convertToDTO(Patient patient) {
        PatientDTO dto = new PatientDTO();
        dto.setId(patient.getId());
        dto.setFirstName(patient.getFirstName());
        dto.setLastName(patient.getLastName());
        dto.setPesel(patient.getPesel());
        if (patient.getUser() != null) {
            dto.setEmail(patient.getUser().getLogin());
        }
        return dto;
    }

    private PrescriptionDTO convertToPrescriptionDTO(Prescription prescription) {
        if (prescription == null) {
            throw new RuntimeException("Cannot convert null prescription");
        }

        PrescriptionDTO dto = new PrescriptionDTO();
        dto.setId(prescription.getId());
        dto.setDescription(prescription.getDescription());
        dto.setIssueDate(prescription.getIssueDate());
        dto.setExpiryDate(prescription.getExpiryDate());

        try {
            dto.setStatus(PrescriptionStatus.valueOf(prescription.getStatus()));
        } catch (IllegalArgumentException e) {
            System.err.println("Invalid prescription status: " + prescription.getStatus());
            dto.setStatus(PrescriptionStatus.ACTIVE);
        }

        if (prescription.getDoctor() != null) {
            dto.setDoctorFirstName(prescription.getDoctor().getFirstName());
            dto.setDoctorLastName(prescription.getDoctor().getLastName());
            dto.setDoctorSpecialization(prescription.getDoctor().getSpecialization());
        }

        return dto;
    }

    public PatientDTO getPatientProfile(Long patientId) {
        if (patientId == null) {
            throw new RuntimeException("Patient ID cannot be null");
        }

        Patient patient = patientRepository.findByIdWithUser(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + patientId));

        return convertToDTO(patient);
    }
}