package com.example.backendmedmanager.repository;

import com.example.backendmedmanager.entity.DoctorPatient;
import com.example.backendmedmanager.entity.Prescription;
import com.example.backendmedmanager.entity.Referral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReferralRepository extends JpaRepository<Referral, Long> {
    List<Referral> findByLekarzId(Long lekarzId);
    List<Referral> findByPacjentId(Long pacjentId);
    List<Referral> findByLekarzIdAndPacjentId(Long lekarzId, Long pacjentId);
}