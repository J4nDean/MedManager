package com.example.backendmedmanager.controller;

import com.example.backendmedmanager.dto.EmailUpdateDTO;
import com.example.backendmedmanager.dto.PatientDTO;
import com.example.backendmedmanager.dto.PrescriptionDTO;
import com.example.backendmedmanager.service.PatientService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:3000") // Dodajemy CORS
public class PatientController {
    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientDTO> getPatient(@PathVariable Long id) {
        log.info("Otrzymano żądanie pobrania pacjenta o id: {}", id);
        PatientDTO patient = patientService.getPatientProfile(id);
        return ResponseEntity.ok(patient);
    }

    @GetMapping("/{id}/prescriptions")
    public ResponseEntity<List<PrescriptionDTO>> getPatientPrescriptions(@PathVariable Long id) {
        log.info("Otrzymano żądanie pobrania recept dla pacjenta o id: {}", id);
        List<PrescriptionDTO> prescriptions = patientService.getPatientPrescriptions(id);
        return ResponseEntity.ok(prescriptions);
    }

    @PutMapping("/{id}/email")
    public ResponseEntity<Void> updateEmail(
            @PathVariable Long id,
            @RequestBody EmailUpdateDTO emailUpdate) {
        log.info("Otrzymano żądanie aktualizacji emaila dla pacjenta o id: {}", id);
        patientService.updatePatientEmail(id, emailUpdate.getEmail());
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        log.error("Wystąpił błąd: ", ex);
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}