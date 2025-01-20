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
public class ReferralDto {
    private Long pacjentId;
    private String opis;
    private LocalDate dataWygasniecia;
}