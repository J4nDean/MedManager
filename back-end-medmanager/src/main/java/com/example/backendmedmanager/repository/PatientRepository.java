package com.example.backendmedmanager.repository;

import com.example.backendmedmanager.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByPesel(String pesel);
    boolean existsByPesel(String pesel);
}