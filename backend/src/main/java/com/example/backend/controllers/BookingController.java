package com.example.backend.controllers;


import com.example.backend.models.Booking;
import com.example.backend.models.BookingStatus;
import com.example.backend.services.booking.ServiceBooking;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("booking")
public class BookingController {
    ServiceBooking serviceBooking;



    @GetMapping("findAll")
    public List<Booking> findAll(){
        return serviceBooking.findAll();
    }

    @GetMapping("retrieveItem/{idItem}")
    public Booking retrieveItem(@PathVariable("idItem") Long idItem){
        return serviceBooking.retrieveItem(idItem);
    }


    @PostMapping("add")
    public Booking add(@RequestBody Booking class1){
        return serviceBooking.add(class1);
    }


    @DeleteMapping("delete/{aLong}")
    public void delete(@PathVariable("aLong") Long aLong){
        serviceBooking.delete(aLong);
    }
    @PutMapping("update")
    public Booking update(@RequestBody Booking Classe1){
        return serviceBooking.update(Classe1);
    }

    @GetMapping("/bookingStatusValues")
    public List<String> getBookingStatusValues() {
        return Arrays.asList(
                BookingStatus.PENDING.name(),
                BookingStatus.CONFIRMED.name(),
                BookingStatus.CANCELED.name(),
                BookingStatus.COMPLETED.name()
        );
    }
    @PostMapping("/affectBookingToUser/{ide}/{idf}")
    public void AffectBookingToUser(@PathVariable("ide") Long bookingId, @PathVariable("idf") Long id) {
        serviceBooking.affectBookingToUser(bookingId, id);
    }
}
