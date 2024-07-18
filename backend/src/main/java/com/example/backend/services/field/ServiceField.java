package com.example.backend.services.field;


import com.example.backend.models.Booking;
import com.example.backend.models.BookingStatus;
import com.example.backend.models.Field;
import com.example.backend.models.User;
import com.example.backend.repository.BookingRepository;
import com.example.backend.repository.FieldRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.services.ICRUDService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;


@Service
@Slf4j
@AllArgsConstructor
public class ServiceField implements ICRUDService<Field,Long> , IServiceField {

    FieldRepository fieldRepository;
    BookingRepository bookingRepository;
    UserRepository userRepository;
    @Override
    public List<Field> findAll() {
        return fieldRepository.findAll();
    }

    @Override
    public Field retrieveItem(Long idItem) {
        return fieldRepository.findById(idItem).get();
    }

    @Override
    public Field add(Field class1) {
        return fieldRepository.save(class1) ;
    }

    @Override
    public void delete(Long aLong) {
        fieldRepository.deleteById(aLong);
    }

    @Override
    public Field update(Field Classe1) {
        return fieldRepository.save(Classe1);
    }
    @Override
    public void Reserverr(Long fieldId,String username,String selectedDate){
        Booking booking=new Booking();
        booking.setBookingStatus(BookingStatus.PENDING);
        log.info("datttte : "+selectedDate);
        try {
            String dateString = selectedDate.substring(17, 36);

            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
            Date date = dateFormat.parse(dateString);
            booking.setDateBooking(date);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Field field=fieldRepository.findById(fieldId).get();
        booking.setEspace(field.getEspace());
        bookingRepository.save(booking);

        User user = userRepository.findByUsername(username).get();
        user.getBookingList().add(booking);
        userRepository.save(user);

    }
}
