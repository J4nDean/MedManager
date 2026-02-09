package com.example.backendmedmanager.controller;

import com.example.backendmedmanager.dto.DoctorDTO;
import com.example.backendmedmanager.dto.EmailUpdateDTO;
import com.example.backendmedmanager.dto.PatientDTO;
import com.example.backendmedmanager.dto.PatientDetailsDTO;
import com.example.backendmedmanager.dto.PrescriptionDTO;
import com.example.backendmedmanager.service.DoctorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
    private static final Logger logger = LoggerFactory.getLogger(DoctorController.class);
    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping("/{doctorId}")
    public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable Long doctorId) {
        try {
            DoctorDTO doctor = doctorService.getDoctorById(doctorId);
            return ResponseEntity.ok(doctor);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<DoctorDTO>> getAllDoctors() {
        logger.info("Fetching all doctors");
        try {
            List<DoctorDTO> doctors = doctorService.getAllDoctors();
            return ResponseEntity.ok(doctors);
        } catch (Exception e) {
            logger.error("Error fetching all doctors: ", e);
            throw new RuntimeException("Failed to fetch doctors");
        }
    }

    @GetMapping("/{doctorId}/patients")
    public ResponseEntity<List<PatientDTO>> getDoctorPatients(@PathVariable Long doctorId) {
        logger.info("Fetching patients for doctor ID: {}", doctorId);
        try {
            List<PatientDTO> patients = doctorService.getPatientsByDoctor(doctorId);
            return ResponseEntity.ok(patients);
        } catch (Exception e) {
            logger.error("Error fetching patients for doctor {}: ", doctorId, e);
            throw new RuntimeException("Failed to fetch patients for doctor");
        }
    }


    @PostMapping("/{doctorId}/patients")
    public ResponseEntity<PatientDTO> addNewPatientToDoctor(
            @PathVariable Long doctorId,
            @RequestBody PatientDTO patientDTO) {
        logger.info("Adding new patient to doctor {}", doctorId);
        try {
            if (patientDTO == null || patientDTO.getFirstName() == null || patientDTO.getLastName() == null || patientDTO.getPesel() == null) {
                throw new IllegalArgumentException("Patient data is incomplete");
            }
            PatientDTO addedPatient = doctorService.addPatientToDoctor(doctorId, patientDTO);
            logger.info("Successfully added new patient {} {} to doctor {}", patientDTO.getFirstName(), patientDTO.getLastName(), doctorId);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedPatient);
        } catch (Exception e) {
            logger.error("Error adding new patient to doctor {}: ", doctorId, e);
            throw new RuntimeException("Failed to add patient: " + e.getMessage());
        }
    }

    @PostMapping("/{doctorId}/patients/{patientId}")
    public ResponseEntity<PatientDTO> assignExistingPatientToDoctor(
            @PathVariable Long doctorId,
            @PathVariable Long patientId) {
        logger.info("Assigning existing patient {} to doctor {}", patientId, doctorId);
        try {
            PatientDTO assigned = doctorService.assignExistingPatientToDoctor(doctorId, patientId);
            return ResponseEntity.status(HttpStatus.CREATED).body(assigned);
        } catch (Exception e) {
            logger.error("Error assigning patient {} to doctor {}: ", patientId, doctorId, e);
            throw new RuntimeException("Failed to assign patient: " + e.getMessage());
        }
    }

    @GetMapping("/{doctorId}/patients/{patientId}")
    public ResponseEntity<PatientDetailsDTO> getPatientDetails(
            @PathVariable Long doctorId,
            @PathVariable Long patientId) {
        logger.info("Fetching details for patient {} under doctor {}", patientId, doctorId);
        try {
            PatientDetailsDTO patientDetails = doctorService.getPatientWithPrescriptions(doctorId, patientId);
            return ResponseEntity.ok(patientDetails);
        } catch (Exception e) {
            logger.error("Error fetching patient details for patient {} under doctor {}: ", patientId, doctorId, e);
            throw new RuntimeException("Failed to fetch patient details");
        }
    }

    @PostMapping("/{doctorId}/patients/{patientId}/prescriptions")
    public ResponseEntity<PrescriptionDTO> createPrescription(
            @PathVariable Long doctorId,
            @PathVariable Long patientId,
            @RequestBody PrescriptionDTO prescriptionDTO) {
        logger.info("Creating prescription for patient {} under doctor {}", patientId, doctorId);
        try {
            if (prescriptionDTO == null || prescriptionDTO.getDescription() == null || prescriptionDTO.getExpiryDate() == null) {
                throw new IllegalArgumentException("Invalid prescription data");
            }

            PrescriptionDTO createdPrescription = doctorService.addPrescription(
                    doctorId,
                    patientId,
                    prescriptionDTO.getDescription(),
                    prescriptionDTO.getExpiryDate()
            );

            logger.info("Successfully created prescription for patient {} under doctor {}", patientId, doctorId);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPrescription);
        } catch (Exception e) {
            logger.error("Error creating prescription for patient {} under doctor {}: ", patientId, doctorId, e);
            throw new RuntimeException("Failed to create prescription: " + e.getMessage());
        }
    }



    @DeleteMapping("/{doctorId}/prescriptions/{prescriptionId}")
    public ResponseEntity<Void> deletePrescription(
            @PathVariable Long doctorId,
            @PathVariable Long prescriptionId) {
        logger.info("Deleting prescription {} for doctor {}", prescriptionId, doctorId);
        try {
            doctorService.removePrescription(doctorId, prescriptionId);
            logger.info("Successfully deleted prescription {} for doctor {}", prescriptionId, doctorId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            logger.error("Error deleting prescription {} for doctor {}: ", prescriptionId, doctorId, e);
            throw new RuntimeException("Failed to delete prescription");
        }
    }

    @PutMapping("/{doctorId}/email")
    public ResponseEntity<Void> updateDoctorEmail(
            @PathVariable Long doctorId,
            @RequestBody EmailUpdateDTO emailUpdate) {
        logger.info("Updating email for doctor {}", doctorId);
        try {
            doctorService.updateDoctorEmail(doctorId, emailUpdate.getEmail());
            logger.info("Successfully updated email for doctor {}", doctorId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Error updating email for doctor {}: ", doctorId, e);
            throw new RuntimeException("Failed to update doctor email: " + e.getMessage());
        }
    }
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", ex.getMessage());
        logger.error("Runtime exception occurred: ", ex);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgumentException(IllegalArgumentException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", ex.getMessage());
        logger.error("Illegal argument exception occurred: ", ex);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }
}