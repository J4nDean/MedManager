package com.example.backendmedmanager.repository;

import com.example.backendmedmanager.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    List<Prescription> findByDoctorIdOrderByIssueDateDesc(Long doctorId);
    List<Prescription> findByDoctorIdAndPatientIdOrderByIssueDateDesc(Long doctorId, Long patientId);
    Optional<Prescription> findByIdAndDoctorId(Long id, Long doctorId);
    boolean existsByIdAndDoctorId(Long id, Long doctorId);
}