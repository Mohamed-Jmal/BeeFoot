package com.example.backend.repository;

import com.example.backend.models.Terrain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TerrainRepository extends JpaRepository<Terrain ,Long> {
}
