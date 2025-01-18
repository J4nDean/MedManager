package com.example.backendmedmanager.repository;

import com.example.backendmedmanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Nie musisz nic dodawać, findAll() jest już dostępne z JpaRepository
}