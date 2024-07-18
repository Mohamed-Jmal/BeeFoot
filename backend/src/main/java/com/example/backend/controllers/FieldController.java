package com.example.backend.controllers;


import com.example.backend.models.Espace;
import com.example.backend.models.Field;
import com.example.backend.models.ImageAM;
import com.example.backend.models.User;
import com.example.backend.repository.EspaceRepository;
import com.example.backend.services.MailService;
import com.example.backend.services.field.ServiceField;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping("field")

public class FieldController {

    ServiceField serviceField;

    MailService mailService;

    EspaceRepository espaceRepository;



    @PostMapping(value="/addField",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    //@PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    public Field add2(@RequestPart("field") Field field,
                     @RequestPart("imageFile") MultipartFile[] file){
        //mailService.sendEmailToUsersWithUserRole("this is a mail", "mailtester");
        try {
            Set<ImageAM> images = uploadImage(file);
            field.setFieldImages(images);
            return serviceField.add(field);
        }catch(Exception e){
            System.out.println(e.getMessage());
            return null ;
        }
    }







    public Set<ImageAM> uploadImage(MultipartFile[] multipartFiles)  throws IOException {
        Set<ImageAM> ImageAMs = new HashSet<>();
        for(MultipartFile file : multipartFiles){
            ImageAM ImageAM =new ImageAM(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            ImageAMs.add(ImageAM);
        }
        return ImageAMs ;
    }

    @GetMapping("findAll")
    public List<Field> findAll(){
        return serviceField.findAll();
    }

    @GetMapping("retrieveItem/{idItem}")
    public Field retrieveItem(@PathVariable("idItem") Long idItem){
        return serviceField.retrieveItem(idItem);
    }

    @DeleteMapping("delete/{aLong}")
    public void delete(@PathVariable("aLong") Long aLong){
        serviceField.delete(aLong);
    }
    @PutMapping("update")
    public Field update(@RequestBody Field Classe1){
        return serviceField.update(Classe1);
    }
    @PostMapping("Reserver/{fieldId}/{username}")
    public void Reserver(@PathVariable("fieldId")Long fieldId,@PathVariable("username") String username ,@RequestBody String selectedDate){
     serviceField.Reserverr(fieldId,username,selectedDate);
    }

}
