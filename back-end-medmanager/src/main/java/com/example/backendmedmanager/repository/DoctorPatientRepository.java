package com.example.backendmedmanager.repository;

import com.example.backendmedmanager.entity.DoctorPatient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DoctorPatientRepository extends JpaRepository<DoctorPatient, Long> {
    List<DoctorPatient> findByLekarzId(Long lekarzId);
    List<DoctorPatient> findByPacjentId(Long pacjentId);
}