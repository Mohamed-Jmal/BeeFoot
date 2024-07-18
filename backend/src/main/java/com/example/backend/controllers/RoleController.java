package com.example.backend.controllers;


import com.example.backend.models.Booking;
import com.example.backend.models.Role;
import com.example.backend.services.role.ServiceRole;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("role")
public class RoleController {

    ServiceRole serviceRole;

    @GetMapping("findAll")
    public List<Role> findAll(){
        return serviceRole.findAll();
    }

    @GetMapping("retrieveItem/{idItem}")
    public Role retrieveItem(@PathVariable("idItem") Long idItem){
        return serviceRole.retrieveItem(idItem);
    }


    @PostMapping("add")
    public Role add(@RequestBody Role class1){
        return serviceRole.add(class1);
    }


    @DeleteMapping("delete/{aLong}")
    public void delete(@PathVariable("aLong") Long aLong){
        serviceRole.delete(aLong);
    }
    @PutMapping("update")
    public Role update(@RequestBody Role Classe1){
        return serviceRole.update(Classe1);
    }
}
