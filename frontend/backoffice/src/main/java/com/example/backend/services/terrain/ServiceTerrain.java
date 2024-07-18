package com.example.backend.services.terrain;


import com.example.backend.models.Terrain;
import com.example.backend.repository.TerrainRepository;
import com.example.backend.services.ICRUDService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Slf4j
@AllArgsConstructor
public class ServiceTerrain implements ICRUDService<Terrain,Long> , IServiceTerrain{

    TerrainRepository terrainRepository;

    @Override
    public List<Terrain> findAll() {
        return terrainRepository.findAll();
    }

    @Override
    public Terrain retrieveItem(Long idItem) {
        return terrainRepository.findById(idItem).get();
    }

    @Override
    public Terrain add(Terrain class1) {
        return terrainRepository.save(class1) ;
    }

    @Override
    public void delete(Long aLong) {
        terrainRepository.deleteById(aLong);
    }

    @Override
    public Terrain update(Terrain Classe1) {
        return terrainRepository.save(Classe1);
    }
}
