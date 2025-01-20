package com.example.backendmedmanager.service;

import com.example.backendmedmanager.dto.PatientDetailsDto;
import com.example.backendmedmanager.dto.PrescriptionDto;
import com.example.backendmedmanager.dto.ReferralDto;
import com.example.backendmedmanager.entity.Prescription;
import com.example.backendmedmanager.entity.Referral;
import com.example.backendmedmanager.entity.User;
import com.example.backendmedmanager.entity.UserRole;
import com.example.backendmedmanager.repository.PrescriptionRepository;
import com.example.backendmedmanager.repository.ReferralRepository;
import com.example.backendmedmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicalService {
    private final PrescriptionRepository prescriptionRepository;
    private final ReferralRepository referralRepository;
    private final UserRepository userRepository;

    @Transactional
    public Prescription createPrescription(PrescriptionDto dto, Long doctorId) {
        User doctor = userRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Lekarz nie znaleziony"));
        User patient = userRepository.findById(dto.getPacjentId())
                .orElseThrow(() -> new RuntimeException("Pacjent nie znaleziony"));

        Prescription prescription = new Prescription();
        prescription.setDataWystawienia(LocalDate.now());
        prescription.setDataWygasniecia(dto.getDataWygasniecia());
        prescription.setStatus("Wystawiona");
        prescription.setLekarz(doctor);
        prescription.setPacjent(patient);
        prescription.setLek(dto.getLek());

        return prescriptionRepository.save(prescription);
    }

    @Transactional
    public Referral createReferral(ReferralDto dto, Long doctorId) {
        return referralRepository.save(Referral.builder()
                .lekarz(userRepository.findById(doctorId)
                        .orElseThrow(() -> new RuntimeException("Lekarz nie znaleziony")))
                .pacjent(userRepository.findById(dto.getPacjentId())
                        .orElseThrow(() -> new RuntimeException("Pacjent nie znaleziony")))
                .dataWystawienia(LocalDate.now())
                .dataWygasniecia(dto.getDataWygasniecia())
                .status("Wystawione")
                .opis(dto.getOpis())
                .build());
    }

    public List<Prescription> getPrescriptionsByDoctorAndPatient(Long doctorId, Long patientId) {
        return prescriptionRepository.findByLekarzIdAndPacjentId(doctorId, patientId);
    }

    public List<Referral> getReferralsByDoctorAndPatient(Long doctorId, Long patientId) {
        return referralRepository.findByLekarzIdAndPacjentId(doctorId, patientId);
    }

    public List<User> getDoctorPatients(Long doctorId) {
        return userRepository.findAllByRola(UserRole.PACJENT);
    }

    public PatientDetailsDto getPatientDetails(Long doctorId, Long patientId) {
        User patient = userRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Pacjent nie znaleziony"));

        List<Prescription> prescriptions = getPrescriptionsByDoctorAndPatient(doctorId, patientId);
        List<Referral> referrals = getReferralsByDoctorAndPatient(doctorId, patientId);

        PatientDetailsDto detailsDto = new PatientDetailsDto();
        detailsDto.setId(patient.getId());
        detailsDto.setImie(patient.getImie());
        detailsDto.setNazwisko(patient.getNazwisko());
        detailsDto.setPesel(patient.getPesel());
        detailsDto.setRecepty(prescriptions.stream()
                .map(this::mapToPrescriptionDto)
                .collect(Collectors.toList()));
        detailsDto.setSkierowania(referrals.stream()
                .map(this::mapToReferralDto)
                .collect(Collectors.toList()));

        return detailsDto;
    }

    private PrescriptionDto mapToPrescriptionDto(Prescription prescription) {
        PrescriptionDto dto = new PrescriptionDto();
        dto.setPacjentId(prescription.getPacjent().getId());
        dto.setLek(prescription.getLek());
        dto.setDataWygasniecia(prescription.getDataWygasniecia());
        return dto;
    }

    private ReferralDto mapToReferralDto(Referral referral) {
        ReferralDto dto = new ReferralDto();
        dto.setPacjentId(referral.getPacjent().getId());
        dto.setOpis(referral.getOpis());
        dto.setDataWygasniecia(referral.getDataWygasniecia());
        return dto;
    }
}