package com.example.backendmedmanager.repository;

import com.example.backendmedmanager.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    @Query("SELECT p FROM Patient p LEFT JOIN FETCH p.user WHERE p.user.id = :userId")
    Optional<Patient> findByUserId(@Param("userId") Long userId);

    // Keep existing methods
    @Query("SELECT p FROM Patient p LEFT JOIN FETCH p.user WHERE p.id = :id")
    Optional<Patient> findByIdWithUser(@Param("id") Long id);
    Optional<Patient> findByPesel(String pesel);
}
