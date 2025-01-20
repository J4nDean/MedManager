package com.example.backendmedmanager.repository;

import com.example.backendmedmanager.entity.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    @Query("SELECT d FROM Doctor d JOIN d.user u WHERE " +
            "(:specjalizacja IS NULL OR LOWER(d.specjalizacja) LIKE LOWER(CONCAT('%', :specjalizacja, '%'))) AND " +
            "(:searchName IS NULL OR LOWER(CONCAT(u.imie, ' ', u.nazwisko)) LIKE LOWER(CONCAT('%', :searchName, '%')))")
    Page<Doctor> findBySpecjalizacjaAndName(
            @Param("specjalizacja") String specjalizacja,
            @Param("searchName") String searchName,
            Pageable pageable
    );
}