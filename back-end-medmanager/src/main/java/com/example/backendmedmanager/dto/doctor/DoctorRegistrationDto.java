package com.example.backendmedmanager.dto.doctor;

import lombok.Data;

@Data
public class DoctorRegistrationDto {
    // Dane użytkownika
    private String imie;
    private String nazwisko;
    private String pesel;
    private String email;
    private String haslo;
    private String telefon;

    // Dane specyficzne dla lekarza
    private String specjalizacja;
}