package com.example.backendmedmanager.dto;

import lombok.Data;

@Data
public class UserDto {
    private String imie;
    private String nazwisko;
    private String pesel;
    private String email;
    private String haslo;
    private String rola;
}