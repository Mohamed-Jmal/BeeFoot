package com.example.backend.controllers;


import com.example.backend.models.Booking;
import com.example.backend.models.DateField;
import com.example.backend.services.dateField.ServiceDateField;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("dateField")
public class DateFieldController {
    ServiceDateField serviceDateField;

    @GetMapping("findAll")
    public List<DateField> findAll(){
        return serviceDateField.findAll();
    }

    @GetMapping("retrieveItem/{idItem}")
    public DateField retrieveItem(@PathVariable("idItem") Long idItem){
        return serviceDateField.retrieveItem(idItem);
    }

    @PostMapping("add")
    public DateField add(@RequestBody DateField class1){
        return serviceDateField.add(class1);
    }

    @DeleteMapping("delete/{aLong}")
    public void delete(@PathVariable("aLong") Long aLong){
        serviceDateField.delete(aLong);
    }

    @PutMapping("update")
    public DateField update(@RequestBody DateField Classe1){
        return serviceDateField.update(Classe1);
    }

    @GetMapping("/availability/{fieldId}")
    public ResponseEntity<List<DateField>> getAvailability(@PathVariable Long fieldId) {
        List<DateField> availability = serviceDateField.availabilityOfFiled(fieldId);
        return new ResponseEntity<>(availability, HttpStatus.OK);
    }


}
