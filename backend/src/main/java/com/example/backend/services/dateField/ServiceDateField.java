package com.example.backend.services.dateField;


import com.example.backend.models.DateField;
import com.example.backend.models.Field;
import com.example.backend.repository.DateFieldRepository;
import com.example.backend.repository.FieldRepository;
import com.example.backend.services.ICRUDService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class ServiceDateField implements ICRUDService<DateField,Long>, IServiceDateField {

    DateFieldRepository dateFieldRepository;
    FieldRepository fieldRepository ;
    @Override
    public List<DateField> findAll() {
        return dateFieldRepository.findAll();
    }

    @Override
    public DateField retrieveItem(Long idItem) {
        return dateFieldRepository.findById(idItem).get();
    }

    @Override
    public DateField add(DateField class1) {
        return dateFieldRepository.save(class1);
    }

    @Override
    public void delete(Long aLong) {
        dateFieldRepository.deleteById(aLong);
    }

    @Override
    public DateField update(DateField Classe1) {
        return dateFieldRepository.save(Classe1);
    }
    @Override
    public List<DateField> availabilityOfFiled(Long fieldId){
        DateField dateField = new DateField();
        Field field =fieldRepository.findById(fieldId).get();
        List<DateField>  dateFields = new ArrayList<>();
        dateFields =field.getDateFields();
        Set<Date> uniqueDates = new HashSet<>();
        for (DateField dateFielda : dateFields) {
            uniqueDates.add(dateFielda.getDate());
        }
        int i  =0;
        while(i<3) {
            LocalDateTime startDate = LocalDateTime.now().plusDays(i).with(LocalTime.of(8, 0));
            LocalDateTime endDate = LocalDateTime.now().plusDays(i).with(LocalTime.of(22, 0));
            LocalDateTime currentDateTime = startDate;
            while (currentDateTime.isBefore(endDate)) {

                java.util.Date currentDate = java.util.Date.from(currentDateTime.atZone(java.time.ZoneId.systemDefault()).toInstant());
                if (uniqueDates.add(currentDate)) {
                    DateField d1 = new DateField();
                    d1.setDate(currentDate);
                    d1.setIsAvailable(true);
                    dateFields.add(d1);
                }
                currentDateTime = currentDateTime.plusHours(1);
            }
            i = i + 1;
        }
        dateFields.removeIf(dateFieldd -> !dateFieldd.getIsAvailable());
        return dateFields;
    }
    private List<DateField> generateAvailabilitySlots() {
        List<DateField> dateFields = new ArrayList<>();

        LocalDateTime startDate = LocalDateTime.now().with(LocalTime.of(8, 0));
        LocalDateTime endDate = startDate.plusDays(7).with(LocalTime.of(22, 0));

        LocalDateTime currentDateTime = startDate;

        while (currentDateTime.isBefore(endDate)) {
            DateField dateField = new DateField();
            dateField.setDate(java.util.Date.from(currentDateTime.atZone(java.time.ZoneId.systemDefault()).toInstant()));
            dateField.setIsAvailable(true);

            dateFields.add(dateField);

            currentDateTime = currentDateTime.plusHours(1);
        }

        return dateFields;
    }
}
