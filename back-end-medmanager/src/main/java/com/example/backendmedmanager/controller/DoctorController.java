package com.example.backendmedmanager.controller;

import com.example.backendmedmanager.dto.doctor.DoctorRegistrationDto;
import com.example.backendmedmanager.entity.Doctor;
import com.example.backendmedmanager.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin
@RequiredArgsConstructor
public class DoctorController {
    private final DoctorService doctorService;

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors(
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String specialization
    ) {
        List<Doctor> doctors = doctorService.findAllDoctors(sort, specialization);
        return ResponseEntity.ok(doctors);
    }

    @PostMapping("/register")
    public ResponseEntity<Doctor> registerDoctor(@RequestBody DoctorRegistrationDto doctorDto) {
        Doctor newDoctor = doctorService.registerDoctor(doctorDto);
        return ResponseEntity.ok(newDoctor);
    }
}