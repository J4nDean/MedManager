package com.example.backendmedmanager.service;

import com.example.backendmedmanager.dto.DoctorDTO;
import com.example.backendmedmanager.dto.PatientDTO;
import com.example.backendmedmanager.dto.PatientDetailsDTO;
import com.example.backendmedmanager.dto.PrescriptionDTO;
import com.example.backendmedmanager.entity.*;
import com.example.backendmedmanager.repository.DoctorPatientRepository;
import com.example.backendmedmanager.repository.DoctorRepository;
import com.example.backendmedmanager.repository.PatientRepository;
import com.example.backendmedmanager.repository.PrescriptionRepository;
import com.example.backendmedmanager.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class DoctorService {
    private static final Logger logger = LoggerFactory.getLogger(DoctorService.class);

    private final DoctorRepository doctorRepository;
    private final DoctorPatientRepository doctorPatientRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public DoctorService(DoctorRepository doctorRepository,
                         DoctorPatientRepository doctorPatientRepository,
                         PrescriptionRepository prescriptionRepository,
                         PatientRepository patientRepository,
                         UserRepository userRepository) {
        this.doctorRepository = doctorRepository;
        this.doctorPatientRepository = doctorPatientRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    public DoctorDTO getDoctorById(Long doctorId) {
        try {
            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));
            return convertToDto(doctor);
        } catch (Exception e) {
            logger.error("Error fetching doctor with ID {}: ", doctorId, e);
            throw new RuntimeException("Error while fetching doctor data", e);
        }
    }

    public List<DoctorDTO> getAllDoctors() {
        try {
            logger.debug("Fetching all doctors with users");
            return doctorRepository.findAllWithUsers().stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error while fetching doctors: ", e);
            throw new RuntimeException("Error fetching doctors: " + e.getMessage(), e);
        }
    }

    public PatientDTO addPatientToDoctor(Long doctorId, PatientDTO patientDTO) {
        try {
            if (patientDTO == null ||
                    patientDTO.getFirstName() == null ||
                    patientDTO.getLastName() == null ||
                    patientDTO.getPesel() == null) {
                throw new IllegalArgumentException("Invalid patient data");
            }

            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            if (patientRepository.findByPesel(patientDTO.getPesel()).isPresent()) {
                throw new RuntimeException("Patient with this PESEL already exists");
            }

            Patient patient = new Patient();
            patient.setFirstName(patientDTO.getFirstName());
            patient.setLastName(patientDTO.getLastName());
            patient.setPesel(patientDTO.getPesel());

            Patient savedPatient = patientRepository.save(patient);

            DoctorPatient doctorPatient = new DoctorPatient();
            doctorPatient.setDoctor(doctor);
            doctorPatient.setPatient(savedPatient);
            DoctorPatient savedRelation = doctorPatientRepository.save(doctorPatient);

            return convertToPatientDto(savedPatient, savedRelation.getAssignmentDate());
        } catch (Exception e) {
            logger.error("Error while adding patient for doctor {}: ", doctorId, e);
            throw new RuntimeException("Error while adding patient: " + e.getMessage(), e);
        }
    }

    public PatientDTO assignExistingPatientToDoctor(Long doctorId, Long patientId) {
        try {
            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));
            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(() -> new RuntimeException("Patient not found"));

            if (doctorPatientRepository.existsByDoctorIdAndPatientId(doctorId, patientId)) {
                throw new RuntimeException("Doctor-patient connection already exists");
            }

            DoctorPatient doctorPatient = new DoctorPatient();
            doctorPatient.setDoctor(doctor);
            doctorPatient.setPatient(patient);
            DoctorPatient savedRelation = doctorPatientRepository.save(doctorPatient);

            return convertToPatientDto(patient, savedRelation.getAssignmentDate());
        } catch (Exception e) {
            logger.error("Error while assigning patient {} to doctor {}: ", patientId, doctorId, e);
            throw new RuntimeException("Error while assigning patient: " + e.getMessage(), e);
        }
    }

    private DoctorDTO convertToDto(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        dto.setId(doctor.getId());
        dto.setFirstName(doctor.getFirstName());
        dto.setLastName(doctor.getLastName());
        dto.setSpecialization(doctor.getSpecialization());

        if (doctor.getUser() != null && doctor.getUser().getLogin() != null) {
            dto.setEmail(doctor.getUser().getLogin());
        } else {
            dto.setEmail("No email address");
            logger.debug("No email found for doctor with ID: {}", doctor.getId());
        }

        return dto;
    }

    public List<PatientDTO> getPatientsByDoctor(Long doctorId) {
        try {
            List<DoctorPatient> doctorPatients = doctorPatientRepository.findByDoctorIdOrderByAssignmentDateDesc(doctorId);
            return doctorPatients.stream()
                    .map(dp -> convertToPatientDto(dp.getPatient(), dp.getAssignmentDate()))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error while fetching patients for doctor {}: ", doctorId, e);
            throw new RuntimeException("Error fetching patients: " + e.getMessage(), e);
        }
    }

    public PatientDetailsDTO getPatientWithPrescriptions(Long doctorId, Long patientId) {
        try {
            DoctorPatient doctorPatient = doctorPatientRepository.findByDoctorIdAndPatientId(doctorId, patientId)
                    .orElseThrow(() -> new RuntimeException("Patient not found for this doctor"));

            List<Prescription> prescriptions = prescriptionRepository
                    .findByDoctorIdAndPatientIdOrderByIssueDateDesc(doctorId, patientId);

            return convertToPatientDetailsDto(doctorPatient.getPatient(),
                    doctorPatient.getAssignmentDate(),
                    prescriptions);
        } catch (Exception e) {
            logger.error("Error while fetching patient details for doctor {} and patient {}: ",
                    doctorId, patientId, e);
            throw new RuntimeException("Error fetching patient details: " + e.getMessage(), e);
        }
    }

    public PrescriptionDTO addPrescription(Long doctorId, Long patientId, String description, LocalDateTime expiryDate) {
        try {
            validatePrescriptionData(expiryDate);

            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));
            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(() -> new RuntimeException("Patient not found"));

            validateDoctorPatientRelationship(doctorId, patientId);

            Prescription prescription = createPrescription(doctor, patient, description, expiryDate);
            Prescription savedPrescription = prescriptionRepository.save(prescription);

            return convertToPrescriptionDto(savedPrescription);
        } catch (Exception e) {
            logger.error("Error while adding prescription for doctor {} and patient {}: ",
                    doctorId, patientId, e);
            throw new RuntimeException("Error adding prescription: " + e.getMessage(), e);
        }
    }

    private void validatePrescriptionData(LocalDateTime expiryDate) {
        if (expiryDate == null) {
            throw new RuntimeException("Expiry date cannot be null");
        }
        if (expiryDate.isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Expiry date cannot be in the past");
        }
    }

    private void validateDoctorPatientRelationship(Long doctorId, Long patientId) {
        if (!doctorPatientRepository.existsByDoctorIdAndPatientId(doctorId, patientId)) {
            throw new RuntimeException("Patient not assigned to this doctor");
        }
    }

    private Prescription createPrescription(Doctor doctor, Patient patient, String description, LocalDateTime expiryDate) {
        Prescription prescription = new Prescription();
        prescription.setDoctor(doctor);
        prescription.setPatient(patient);
        prescription.setDescription(description);
        prescription.setExpiryDate(expiryDate);
        prescription.setStatus(String.valueOf(PrescriptionStatus.ACTIVE));
        prescription.setIssueDate(LocalDateTime.now());
        return prescription;
    }

    public void removePrescription(Long doctorId, Long prescriptionId) {
        try {
            Prescription prescription = prescriptionRepository.findByIdAndDoctorId(prescriptionId, doctorId)
                    .orElseThrow(() -> new RuntimeException("Prescription not found"));
            prescriptionRepository.delete(prescription);
            logger.info("Successfully removed prescription {} for doctor {}", prescriptionId, doctorId);
        } catch (Exception e) {
            logger.error("Error while removing prescription {} for doctor {}: ", prescriptionId, doctorId, e);
            throw new RuntimeException("Error removing prescription: " + e.getMessage(), e);
        }
    }

    private PatientDTO convertToPatientDto(Patient patient, LocalDateTime assignmentDate) {
        PatientDTO dto = new PatientDTO();
        dto.setId(patient.getId());
        dto.setFirstName(patient.getFirstName());
        dto.setLastName(patient.getLastName());
        dto.setPesel(patient.getPesel());
        dto.setAssignmentDate(assignmentDate);
        if (patient.getUser() != null) {
            dto.setEmail(patient.getUser().getLogin());
        }
        return dto;
    }

    private PatientDetailsDTO convertToPatientDetailsDto(Patient patient, LocalDateTime assignmentDate,
                                                         List<Prescription> prescriptions) {
        PatientDetailsDTO dto = new PatientDetailsDTO();
        dto.setId(patient.getId());
        dto.setFirstName(patient.getFirstName());
        dto.setLastName(patient.getLastName());
        dto.setPesel(patient.getPesel());
        dto.setAssignmentDate(assignmentDate);
        if (patient.getUser() != null) {
            dto.setEmail(patient.getUser().getLogin());
        }
        dto.setPrescriptions(prescriptions.stream()
                .map(this::convertToPrescriptionDto)
                .collect(Collectors.toList()));
        return dto;
    }

    private PrescriptionDTO convertToPrescriptionDto(Prescription prescription) {
        if (prescription == null) {
            throw new RuntimeException("Cannot convert null prescription");
        }

        PrescriptionDTO dto = new PrescriptionDTO();
        dto.setId(prescription.getId());
        dto.setDescription(prescription.getDescription());
        dto.setIssueDate(prescription.getIssueDate());
        dto.setExpiryDate(prescription.getExpiryDate());

        String rawStatus = prescription.getStatus();
        String normalizedStatus = rawStatus == null ? "" : rawStatus.trim().toUpperCase();
        switch (normalizedStatus) {
            case "ACTIVE":
                dto.setStatus(PrescriptionStatus.ACTIVE);
                break;
            case "FILLED":
            case "COMPLETED":
                dto.setStatus(PrescriptionStatus.FILLED);
                break;
            case "EXPIRED":
                dto.setStatus(PrescriptionStatus.EXPIRED);
                break;
            case "NEW":
                dto.setStatus(PrescriptionStatus.ACTIVE);
                break;
            default:
                logger.error("Invalid prescription status: {}", rawStatus);
                dto.setStatus(PrescriptionStatus.ACTIVE);
                break;
        }

        if (prescription.getDoctor() != null) {
            dto.setDoctorFirstName(prescription.getDoctor().getFirstName());
            dto.setDoctorLastName(prescription.getDoctor().getLastName());
            dto.setDoctorSpecialization(prescription.getDoctor().getSpecialization());
        }

        return dto;
    }

    public void updateDoctorEmail(Long doctorId, String newEmail) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        if (newEmail == null || newEmail.trim().isEmpty()) {
            throw new RuntimeException("Email cannot be empty");
        }

        User user = doctor.getUser();
        String currentEmail = user != null ? user.getLogin() : null;

        if (!newEmail.equals(currentEmail)) {
            if (userRepository.findByLogin(newEmail).isPresent()) {
                throw new RuntimeException("Email already exists");
            }
        }

        if (user == null) {
            user = new User();
            user.setLogin(newEmail);
            user = userRepository.save(user);
            doctor.setUser(user);
        } else {
            user.setLogin(newEmail);
            userRepository.save(user);
        }

        doctorRepository.save(doctor);
    }
}