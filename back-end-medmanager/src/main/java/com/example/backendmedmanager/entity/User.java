package com.example.backendmedmanager.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "uzytkownicy")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "imie", nullable = false)
    private String imie;

    @Column(name = "nazwisko", nullable = false)
    private String nazwisko;

    @Column(name = "pesel", length = 11, nullable = false, unique = true)
    private String pesel;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "haslo", nullable = false)
    private String haslo;

    @Column(name = "telefon", length = 9)
    private String telefon;

    @Enumerated(EnumType.STRING)
    @Column(name = "rola", nullable = false)
    @Builder.Default
    private UserRole rola = UserRole.PACJENT;
}