package com.example.backendmedmanager.repository;

import com.example.backendmedmanager.entity.User;
import com.example.backendmedmanager.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findAllByRola(UserRole rola);
    boolean existsByEmail(String email);
    boolean existsByPesel(String pesel);
}