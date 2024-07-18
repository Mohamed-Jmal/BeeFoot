package com.example.backend.services.review;

import com.example.backend.models.Notification;
import com.example.backend.models.Review;
import com.example.backend.repository.ReviewRepository;
import com.example.backend.services.ICRUDService;
import com.example.backend.services.notification.IServiceNotification;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class ServiceReview implements ICRUDService<Review,Long>, IServiceReview {

    ReviewRepository reviewRepository;
    @Override
    public List<Review> findAll() {
        return reviewRepository.findAll();
    }

    @Override
    public Review retrieveItem(Long idItem) {
        return reviewRepository.findById(idItem).get();
    }

    @Override
    public Review add(Review class1) {
        return reviewRepository.save(class1);
    }

    @Override
    public void delete(Long aLong) {
        reviewRepository.deleteById(aLong);
    }

    @Override
    public Review update(Review Classe1) {
        return reviewRepository.save(Classe1);
    }
}
