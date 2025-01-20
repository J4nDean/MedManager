package com.example.backendmedmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDto {
    private Long id;
    private String imie;
    private String nazwisko;
    private String email;
    private String telefon;
    private String specjalizacja;
    // Pola wymagane tylko przy rejestracji
    private String pesel;
    private String haslo;
}