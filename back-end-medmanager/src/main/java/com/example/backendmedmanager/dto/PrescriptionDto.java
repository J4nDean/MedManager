package com.example.backendmedmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionDto {
    private Long pacjentId;
    private String lek;
    private LocalDate dataWygasniecia;
}