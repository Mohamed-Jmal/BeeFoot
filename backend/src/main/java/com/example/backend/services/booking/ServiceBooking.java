package com.example.backend.services.booking;

import com.example.backend.models.*;
import com.example.backend.repository.BookingRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.services.ICRUDService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Slf4j
@AllArgsConstructor
public class ServiceBooking implements ICRUDService<Booking,Long>,IServiceBooking {

    BookingRepository bookingRepository;
    UserRepository userRepository ;
    @Override
    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking retrieveItem(Long idItem) {
        return bookingRepository.findById(idItem).get();
    }

    @Override
    public Booking add(Booking class1) {
        return bookingRepository.save(class1);
    }

    @Override
    public void delete(Long aLong) {
        bookingRepository.deleteById(aLong);
    }

    @Override
    public Booking update(Booking Classe1) {
        return bookingRepository.save(Classe1);
    }
    @Override
    public void affectBookingToUser(Long bookingId , Long id ){

        Booking booking= bookingRepository.findById(bookingId).get();

        User user = userRepository.findById(id).get();
      user.getBookingList().add(booking);
       userRepository.save(user);
    }

}
