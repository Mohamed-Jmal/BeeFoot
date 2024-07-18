package com.example.backend.repository;


import com.example.backend.models.Booking;
import com.example.backend.models.Espace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EspaceRepository extends JpaRepository<Espace,Long> {
}
