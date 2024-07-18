package com.example.backend.controllers;


import com.example.backend.models.Booking;
import com.example.backend.models.Notification;
import com.example.backend.services.notification.ServiceNotification;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("notification")
public class NotificationController {
    ServiceNotification serviceNotification;

    @GetMapping("findAll")
    public List<Notification> findAll(){
        return serviceNotification.findAll();
    }

    @GetMapping("retrieveItem/{idItem}")
    public Notification retrieveItem(@PathVariable("idItem") Long idItem){
        return serviceNotification.retrieveItem(idItem);
    }


    @PostMapping("add")
    public Notification add(@RequestBody Notification class1){
        return serviceNotification.add(class1);
    }


    @DeleteMapping("delete/{aLong}")
    public void delete(@PathVariable("aLong") Long aLong){
        serviceNotification.delete(aLong);
    }
    @PutMapping("update")
    public Notification update(@RequestBody Notification Classe1){
        return serviceNotification.update(Classe1);
    }
}
