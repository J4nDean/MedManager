package com.example.backendmedmanager.repository;


import com.example.backendmedmanager.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    List<Prescription> findByLekarzId(Long lekarzId);
    List<Prescription> findByPacjentId(Long pacjentId);
    List<Prescription> findByLekarzIdAndPacjentId(Long lekarzId, Long pacjentId);
}