package com.example.backend.controllers;


import com.example.backend.models.Terrain;
import com.example.backend.services.MailService;
import com.example.backend.services.terrain.ServiceTerrain;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("terrain")
public class TerrainController {

    ServiceTerrain serviceTerrain;

    MailService mailService;



    @PostMapping("/addTerrain")
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    public Terrain add(@RequestBody Terrain terrain){
        mailService.sendEmailToUsersWithUserRole("this is a mail", "mailtester");
        return serviceTerrain.add(terrain);
    }
}
