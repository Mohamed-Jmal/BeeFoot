package com.example.backend.services.espace;


import com.example.backend.models.Espace;
import com.example.backend.models.Field;
import com.example.backend.repository.EspaceRepository;
import com.example.backend.repository.FieldRepository;
import com.example.backend.services.ICRUDService;
import com.example.backend.services.field.IServiceField;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class ServiceEspace implements ICRUDService<Espace,Long>, IServiceEspace {


    EspaceRepository espaceRepository;

    FieldRepository fieldRepository;

    @Override
    public List<Espace> findAll() {
        return espaceRepository.findAll();
    }

    @Override
    public Espace retrieveItem(Long idItem) {
        return espaceRepository.findById(idItem).get();
    }

    @Override
    public Espace add(Espace class1) {
        return espaceRepository.save(class1);
    }

    @Override
    public void delete(Long aLong) {
        espaceRepository.deleteById(aLong);
    }

    @Override
    public Espace update(Espace Classe1) {
        return espaceRepository.save(Classe1);
    }

    @Transactional
    public void AffectFieldToEspace(Long espaceId, Long fieldId) {
        Espace espace = espaceRepository.findById(espaceId).get();
        Field field =fieldRepository.findById(fieldId).get();
        espace.getFields().add(field);
        espaceRepository.save(espace);
    }

}
