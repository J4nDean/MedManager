package com.example.backendmedmanager.entity;

public enum UserRole {
    PACJENT,
    LEKARZ,
    ADMIN;

    @Override
    public String toString() {
        return name().toLowerCase();
    }
}