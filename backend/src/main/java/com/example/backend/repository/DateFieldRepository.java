package com.example.backend.repository;


import com.example.backend.models.Booking;
import com.example.backend.models.DateField;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DateFieldRepository extends JpaRepository<DateField,Long> {
}
