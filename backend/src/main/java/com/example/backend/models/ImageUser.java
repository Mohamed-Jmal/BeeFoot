package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Table(name="images_User")
public class ImageUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id ;
    private String name ;
    private String type ;
    @Column(length = 50000000)
    private byte[] picByte;
    public ImageUser(String originalFilename, String contentType, byte[] bytes) {
        this.name=originalFilename;
        this.type=contentType;
        this.picByte=bytes;
    }
}
