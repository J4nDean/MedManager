package com.example.backendmedmanager.controller;

import com.example.backendmedmanager.dto.DoctorDto;
import com.example.backendmedmanager.entity.Doctor;
import com.example.backendmedmanager.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class DoctorController {
    private final DoctorService doctorService;

    @GetMapping
    public ResponseEntity<Page<DoctorDto>> getAllDoctors(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String specialization,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<Doctor> doctorsPage = doctorService.findDoctors(name, specialization, PageRequest.of(page, size));

        Page<DoctorDto> doctorDtos = doctorsPage.map(doctor -> DoctorDto.builder()
                .id(doctor.getId())
                .imie(doctor.getUser().getImie())
                .nazwisko(doctor.getUser().getNazwisko())
                .email(doctor.getUser().getEmail())
                .telefon(doctor.getUser().getTelefon())
                .specjalizacja(doctor.getSpecjalizacja())
                .build());

        return ResponseEntity.ok(doctorDtos);
    }

    @PostMapping("/register")
    public ResponseEntity<DoctorDto> registerDoctor(@RequestBody DoctorDto doctorDto) {
        Doctor newDoctor = doctorService.registerDoctor(doctorDto);
        DoctorDto response = DoctorDto.builder()
                .id(newDoctor.getId())
                .imie(newDoctor.getUser().getImie())
                .nazwisko(newDoctor.getUser().getNazwisko())
                .email(newDoctor.getUser().getEmail())
                .telefon(newDoctor.getUser().getTelefon())
                .specjalizacja(newDoctor.getSpecjalizacja())
                .build();
        return ResponseEntity.ok(response);
    }
}