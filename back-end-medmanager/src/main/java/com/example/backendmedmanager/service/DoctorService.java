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
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class DoctorService {
    private final DoctorRepository doctorRepository;
    private final DoctorPatientRepository doctorPatientRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final PatientRepository patientRepository;

    public DoctorService(DoctorRepository doctorRepository,
                         DoctorPatientRepository doctorPatientRepository,
                         PrescriptionRepository prescriptionRepository,
                         PatientRepository patientRepository) {
        this.doctorRepository = doctorRepository;
        this.doctorPatientRepository = doctorPatientRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.patientRepository = patientRepository;
    }

    public List<DoctorDTO> getAllDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();
        List<DoctorDTO> doctorDTOs = new ArrayList<>();

        for (Doctor doctor : doctors) {
            DoctorDTO dto = convertToDto(doctor);
            doctorDTOs.add(dto);
        }
        return doctorDTOs;
    }

    public List<PatientDTO> getPatientsByDoctor(Long doctorId) {
        List<DoctorPatient> doctorPatients = doctorPatientRepository.findByDoctorIdOrderByAssignmentDateDesc(doctorId);
        List<PatientDTO> patientDTOs = new ArrayList<>();

        for (DoctorPatient dp : doctorPatients) {
            Patient patient = dp.getPatient();
            PatientDTO dto = convertToPatientDto(patient, dp.getAssignmentDate());
            patientDTOs.add(dto);
        }
        return patientDTOs;
    }

    public PatientDetailsDTO getPatientWithPrescriptions(Long doctorId, Long patientId) {
        DoctorPatient doctorPatient = doctorPatientRepository.findByDoctorIdAndPatientId(doctorId, patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found for this doctor"));

        Patient patient = doctorPatient.getPatient();
        List<Prescription> prescriptions = prescriptionRepository
                .findByDoctorIdAndPatientIdOrderByIssueDateDesc(doctorId, patientId);

        return convertToPatientDetailsDto(patient, doctorPatient.getAssignmentDate(), prescriptions);
    }

    public PrescriptionDTO addPrescription(Long doctorId, Long patientId, String description, LocalDateTime expiryDate) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        if (!doctorPatientRepository.existsByDoctorIdAndPatientId(doctorId, patientId)) {
            throw new RuntimeException("Patient not assigned to this doctor");
        }

        Prescription prescription = new Prescription();
        prescription.setDoctor(doctor);
        prescription.setPatient(patient);
        prescription.setDescription(description);
        prescription.setExpiryDate(expiryDate);
        prescription.setStatus(String.valueOf(PrescriptionStatus.ACTIVE));
        prescription.setIssueDate(LocalDateTime.now());

        prescription = prescriptionRepository.save(prescription);
        return convertToPrescriptionDto(prescription);
    }

    public void removePrescription(Long doctorId, Long prescriptionId) {
        Prescription prescription = prescriptionRepository.findByIdAndDoctorId(prescriptionId, doctorId)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));
        prescriptionRepository.delete(prescription);
    }

    private DoctorDTO convertToDto(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        dto.setId(doctor.getId());
        dto.setFirstName(doctor.getFirstName());
        dto.setLastName(doctor.getLastName());
        dto.setSpecialization(doctor.getSpecialization());
        return dto;
    }

    private PatientDTO convertToPatientDto(Patient patient, LocalDateTime assignmentDate) {
        PatientDTO dto = new PatientDTO();
        dto.setId(patient.getId());
        dto.setFirstName(patient.getFirstName());
        dto.setLastName(patient.getLastName());
        dto.setPesel(patient.getPesel());
        dto.setAssignmentDate(assignmentDate);
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
        dto.setPrescriptions(prescriptions.stream()
                .map(this::convertToPrescriptionDto)
                .collect(Collectors.toList()));
        return dto;
    }

    private PrescriptionDTO convertToPrescriptionDto(Prescription prescription) {
        PrescriptionDTO dto = new PrescriptionDTO();
        dto.setId(prescription.getId());
        dto.setDescription(prescription.getDescription());
        dto.setIssueDate(prescription.getIssueDate());
        dto.setExpiryDate(prescription.getExpiryDate());
        dto.setStatus(PrescriptionStatus.valueOf(prescription.getStatus()));
        return dto;
    }

}