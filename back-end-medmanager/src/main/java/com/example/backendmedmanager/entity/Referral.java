package com.example.backendmedmanager.entity;

import com.example.backendmedmanager.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "skierowanie")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Referral {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_wystawienia", nullable = false)
    private LocalDate dataWystawienia;

    @Column(name = "data_wygasniecia", nullable = false)
    private LocalDate dataWygasniecia;

    @Column(nullable = false)
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pacjent", nullable = false)
    private User pacjent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_lekarz", nullable = false)
    private User lekarz;

    @Column(name = "opis", nullable = false)
    private String opis;
}