package com.example.backend.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "espace")
public class Espace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long espaceId;

    private String espaceName;

    private String location;

    private int numberFields;

    private String lieu;

    @OneToMany
    @JsonIgnore
    List<Field> fields;

    @OneToMany
    @JsonIgnore
    List<Booking> bookings;

    @ManyToMany(fetch= FetchType.EAGER ,cascade = CascadeType.ALL)
    @JoinTable(name="espace_images",
            joinColumns = {
                    @JoinColumn(name="espace_id")
            },inverseJoinColumns = {
            @JoinColumn(name = "image_id")
    }
    )
    private Set<ImageEspace> espaceImages;
}
