package com.example.backend.controllers;

import com.example.backend.models.Booking;
import com.example.backend.models.Review;
import com.example.backend.services.review.ServiceReview;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping("review")
public class ReviewController {

    ServiceReview serviceReview;


    @GetMapping("findAll")
    public List<Review> findAll(){
        return serviceReview.findAll();
    }

    @GetMapping("retrieveItem/{idItem}")
    public Review retrieveItem(@PathVariable("idItem") Long idItem){
        return serviceReview.retrieveItem(idItem);
    }


    @PostMapping("add")
    public Review add(@RequestBody Review class1){
        return serviceReview.add(class1);
    }


    @DeleteMapping("delete/{aLong}")
    public void delete(@PathVariable("aLong") Long aLong){
        serviceReview.delete(aLong);
    }
    @PutMapping("update")
    public Review update(@RequestBody Review Classe1){
        return serviceReview.update(Classe1);
    }
}
