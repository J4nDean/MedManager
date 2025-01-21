package com.example.backendmedmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.backendmedmanager.entity.DoctorPatient;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorPatientRepository extends JpaRepository<DoctorPatient, Long> {
    List<DoctorPatient> findByDoctorIdOrderByAssignmentDateDesc(Long doctorId);
    Optional<DoctorPatient> findByDoctorIdAndPatientId(Long doctorId, Long patientId);
    boolean existsByDoctorIdAndPatientId(Long doctorId, Long patientId);
}