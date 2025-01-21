package com.example.backendmedmanager.repository;

import com.example.backendmedmanager.entity.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    @Query("SELECT d FROM Doctor d LEFT JOIN FETCH d.user u")
    List<Doctor> findAllWithUsers();

    Optional<Doctor> findByUserId(Long userId);

    @Query("SELECT d FROM Doctor d LEFT JOIN FETCH d.user u " +
            "WHERE (:firstName is null OR lower(d.firstName) LIKE lower(concat('%', :firstName, '%'))) " +
            "AND (:lastName is null OR lower(d.lastName) LIKE lower(concat('%', :lastName, '%'))) " +
            "AND (:specialization is null OR lower(d.specialization) LIKE lower(concat('%', :specialization, '%')))")
    List<Doctor> findByFilters(
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("specialization") String specialization
    );
}