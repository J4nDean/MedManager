package com.example.backendmedmanager.dto;

import com.example.backendmedmanager.dto.PrescriptionDto;
import com.example.backendmedmanager.dto.ReferralDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientDetailsDto {
    private Long id;
    private String imie;
    private String nazwisko;
    private String pesel;
    private List<PrescriptionDto> recepty;
    private List<ReferralDto> skierowania;
}