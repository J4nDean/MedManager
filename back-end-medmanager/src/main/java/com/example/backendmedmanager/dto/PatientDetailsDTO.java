package com.example.backendmedmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDetailsDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String pesel;
    private LocalDateTime assignmentDate;
    private String email;
    private List<PrescriptionDTO> prescriptions;
}