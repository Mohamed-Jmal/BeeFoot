package com.example.backend.services.notification;

import com.example.backend.models.Field;
import com.example.backend.models.Notification;
import com.example.backend.repository.NotificationRepository;
import com.example.backend.services.ICRUDService;
import com.example.backend.services.field.IServiceField;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Slf4j
@AllArgsConstructor
public class ServiceNotification implements ICRUDService<Notification,Long>, IServiceNotification {

    NotificationRepository notificationRepository ;
    @Override
    public List<Notification> findAll() {
        return notificationRepository.findAll();
    }

    @Override
    public Notification retrieveItem(Long idItem) {
        return notificationRepository.findById(idItem).get();
    }

    @Override
    public Notification add(Notification class1) {
        return notificationRepository.save(class1);
    }

    @Override
    public void delete(Long aLong) {
        notificationRepository.deleteById(aLong);
    }

    @Override
    public Notification update(Notification Classe1) {
        return notificationRepository.save(Classe1);
    }
}
