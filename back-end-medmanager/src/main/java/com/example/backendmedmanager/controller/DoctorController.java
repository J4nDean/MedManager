package com.example.backendmedmanager.controller;

import com.example.backendmedmanager.dto.DoctorDTO;
import com.example.backendmedmanager.dto.PatientDTO;
import com.example.backendmedmanager.dto.PatientDetailsDTO;
import com.example.backendmedmanager.dto.PrescriptionDTO;
import com.example.backendmedmanager.service.DoctorService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping
    public ResponseEntity<List<DoctorDTO>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @GetMapping("/{doctorId}/patients")
    public ResponseEntity<List<PatientDTO>> getDoctorPatients(@PathVariable Long doctorId) {
        return ResponseEntity.ok(doctorService.getPatientsByDoctor(doctorId));
    }

    @GetMapping("/{doctorId}/patients/{patientId}")
    public ResponseEntity<PatientDetailsDTO> getPatientDetails(
            @PathVariable Long doctorId,
            @PathVariable Long patientId) {
        return ResponseEntity.ok(doctorService.getPatientWithPrescriptions(doctorId, patientId));
    }

    @PostMapping("/{doctorId}/patients/{patientId}/prescriptions")
    public ResponseEntity<PrescriptionDTO> createPrescription(
            @PathVariable Long doctorId,
            @PathVariable Long patientId,
            @RequestParam String description,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime expiryDate) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(doctorService.addPrescription(doctorId, patientId, description, expiryDate));
    }

    @DeleteMapping("/{doctorId}/prescriptions/{prescriptionId}")
    public ResponseEntity<Void> deletePrescription(
            @PathVariable Long doctorId,
            @PathVariable Long prescriptionId) {
        doctorService.removePrescription(doctorId, prescriptionId);
        return ResponseEntity.noContent().build();
    }


    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ex.getMessage());
    }
}