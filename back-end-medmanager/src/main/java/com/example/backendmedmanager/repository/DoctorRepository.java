package com.example.backendmedmanager.repository;

import com.example.backendmedmanager.entity.Doctor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findBySpecjalizacja(String specjalizacja);
    List<Doctor> findBySpecjalizacja(String specjalizacja, Sort sort);
    Optional<Doctor> findByUserId(Long userId);
    boolean existsByUserId(Long userId);
}