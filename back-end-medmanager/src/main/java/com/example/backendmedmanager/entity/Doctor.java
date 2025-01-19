package com.example.backendmedmanager.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lekarz")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "specjalizacja", nullable = false)
    private String specjalizacja;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_uzytkownik", nullable = false)
    private User user;
}