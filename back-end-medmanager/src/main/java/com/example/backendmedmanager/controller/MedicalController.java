package com.example.backendmedmanager.controller;

import com.example.backendmedmanager.dto.PatientDetailsDto;
import com.example.backendmedmanager.dto.PrescriptionDto;
import com.example.backendmedmanager.dto.ReferralDto;
import com.example.backendmedmanager.entity.Prescription;
import com.example.backendmedmanager.entity.Referral;
import com.example.backendmedmanager.entity.User;
import com.example.backendmedmanager.service.MedicalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class MedicalController {
    private final MedicalService medicalService;

    @GetMapping("/patients")
    public ResponseEntity<List<User>> getDoctorPatients(@RequestParam Long doctorId) {
        return ResponseEntity.ok(medicalService.getDoctorPatients(doctorId));
    }

    @GetMapping("/patients/{patientId}")
    public ResponseEntity<PatientDetailsDto> getPatientDetails(
            @PathVariable Long patientId,
            @RequestParam Long doctorId
    ) {
        return ResponseEntity.ok(medicalService.getPatientDetails(doctorId, patientId));
    }

    @PostMapping("/prescriptions")
    public ResponseEntity<?> createPrescription(
            @RequestBody PrescriptionDto prescriptionDto,
            @RequestParam Long doctorId
    ) {
        return ResponseEntity.ok(medicalService.createPrescription(prescriptionDto, doctorId));
    }

    @PostMapping("/referrals")
    public ResponseEntity<?> createReferral(
            @RequestBody ReferralDto referralDto,
            @RequestParam Long doctorId
    ) {
        return ResponseEntity.ok(medicalService.createReferral(referralDto, doctorId));
    }
}