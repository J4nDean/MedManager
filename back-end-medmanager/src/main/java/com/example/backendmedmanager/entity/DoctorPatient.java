package com.example.backendmedmanager.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "pacjenci_lekarz")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorPatient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_rejestracji", nullable = false)
    private LocalDate dataRejestracji;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pacjent", nullable = false)
    private User pacjent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_lekarz", nullable = false)
    private User lekarz;
}