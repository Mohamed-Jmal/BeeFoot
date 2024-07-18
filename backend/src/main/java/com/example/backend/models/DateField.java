package com.example.backend.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "dateField")
public class DateField {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dateFieldId;

    private Date date;

    private Boolean isAvailable;
}
