package com.example.backend.services.role;

import com.example.backend.models.Booking;
import com.example.backend.models.Role;
import com.example.backend.repository.RoleRepository;
import com.example.backend.services.ICRUDService;
import com.example.backend.services.booking.IServiceBooking;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class ServiceRole implements ICRUDService<Role,Long>, IServiceRole {


    RoleRepository roleRepository;

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public Role retrieveItem(Long idItem) {
        return roleRepository.findById(idItem).get();
    }

    @Override
    public Role add(Role class1) {
        return roleRepository.save(class1);
    }

    @Override
    public void delete(Long aLong) {
        roleRepository.deleteById(aLong);
    }

    @Override
    public Role update(Role Classe1) {
        return roleRepository.save(Classe1);
    }
}
