package com.example.backend.controllers;


import com.example.backend.models.Espace;
import com.example.backend.models.ImageEspace;
import com.example.backend.services.espace.ServiceEspace;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping("espace")
public class EspaceController {
    ServiceEspace serviceEspace;

    @PostMapping(value="/addEspace",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    //@PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    public Espace add(@RequestPart("espace") Espace espace,
                     @RequestPart("imageFile") MultipartFile[] file){
        try {
            Set<ImageEspace> images = uploadImage(file);
            espace.setEspaceImages(images);
            return serviceEspace.add(espace);
        }catch(Exception e){
            System.out.println(e.getMessage());
            return null ;
        }
    }

    public Set<ImageEspace> uploadImage(MultipartFile[] multipartFiles)  throws IOException {
        Set<ImageEspace> ImageEspaces = new HashSet<>();
        for(MultipartFile file : multipartFiles){
            ImageEspace ImageEspace =new ImageEspace(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            ImageEspaces.add(ImageEspace);
        }
        return ImageEspaces ;
    }

    @GetMapping("findAll")
    public List<Espace> findAll(){
        return serviceEspace.findAll();
    }

    @GetMapping("retrieveItem/{idItem}")
    public Espace retrieveItem(@PathVariable("idItem") Long idItem){
        return serviceEspace.retrieveItem(idItem);
    }


    @DeleteMapping("delete/{aLong}")
    public void delete(@PathVariable("aLong") Long aLong){
        serviceEspace.delete(aLong);
    }
    @PutMapping("update")
    public Espace update(@RequestBody Espace Classe1){
        return serviceEspace.update(Classe1);
    }

    @PostMapping("/affectFieldToEspace/{ide}/{idf}")
    public void AffectFieldToEspace(@PathVariable("ide") Long espaceId, @PathVariable("idf") Long fieldId) {
        serviceEspace.AffectFieldToEspace(espaceId, fieldId);
    }






}
