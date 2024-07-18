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
@Table(name = "field")
public class Field {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fieldId;


    private String fieldName;

    private String location;

    private Boolean availability;

    @Enumerated(EnumType.STRING)
    private FieldType fieldType;


    @ManyToMany(fetch= FetchType.EAGER ,cascade = CascadeType.ALL)
    @JoinTable(name="field_images",
            joinColumns = {
                    @JoinColumn(name="field_id")
            },inverseJoinColumns = {
            @JoinColumn(name = "image_id")
    }
    )
    private Set<ImageAM> fieldImages;

    @OneToMany
    @JsonIgnore
    private List<DateField> dateFields;

    @ManyToOne
    @JoinColumn(name = "espace_id") // Name of the column in the Field table that references the Espace table
    private Espace espace;
}
