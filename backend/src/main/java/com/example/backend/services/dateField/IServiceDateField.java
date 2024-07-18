package com.example.backend.services.dateField;

import com.example.backend.models.DateField;

import java.util.List;

public interface IServiceDateField {
    public List<DateField> availabilityOfFiled(Long fieldId);
}
