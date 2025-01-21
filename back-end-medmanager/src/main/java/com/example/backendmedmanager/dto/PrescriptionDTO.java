package com.example.backendmedmanager.dto;

import com.example.backendmedmanager.entity.PrescriptionStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionDTO {
    private Long id;
    private String description;
    private LocalDateTime issueDate;
    private LocalDateTime expiryDate;
    private PrescriptionStatus status;
    private String doctorFirstName;
    private String doctorLastName;
    private String doctorSpecialization;
}