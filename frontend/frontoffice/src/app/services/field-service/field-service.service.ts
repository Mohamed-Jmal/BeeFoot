import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Field} from "../../models/field";

@Injectable({
  providedIn: 'root'
})
export class FieldServiceService {

  readonly GetAllField = 'http://localhost:8085/pfa/field/findAll';

  readonly FindById = 'http://localhost:8085/pfa/field/retrieveItem/';
  readonly FindByAv = 'http://localhost:8085/pfa/dateField/availability/';
  readonly REs = 'http://localhost:8085/pfa/field/Reserver';

  constructor(private httpClient: HttpClient) { }

  getAllField() {
    return this.httpClient.get<Field[]>(this.GetAllField);
  }

  getFieldDetails(fieldId:any) {
    return this.httpClient.get<Field>(this.FindById + fieldId);
  }
  getAvailb(fieldId:any) {
    return this.httpClient.get<any>(this.FindByAv + fieldId);
  }
  Reserve(fieldId: any, selectedDate: any,username:any) {
    const url = `${this.REs}/${fieldId}/${username}`;
    const requestBody = { selectedDate: selectedDate };
    return this.httpClient.post(url, requestBody);
  }

}
