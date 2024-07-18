import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Booking} from '../../models/Booking';
import {Observable} from 'rxjs';
import {DateField} from '../../models/dateField';

@Injectable({
  providedIn: 'root'
})
export class DateFieldServiceService {

  readonly AddDateField = 'http://localhost:8085/pfa/dateField/add';
  readonly GetAllDateFields = 'http://localhost:8085/pfa/dateField/findAll';
  readonly DeleteDateField = 'http://localhost:8085/pfa/dateField/delete/';
  readonly FindById = 'http://localhost:8085/pfa/dateField/retrieveItem/';

  constructor(private httpClient: HttpClient) { }

  addDateField(dateField: DateField): Observable<any> {
    return this.httpClient.post(this.AddDateField, dateField);
  }


  getAllDateFields() {
    return this.httpClient.get<DateField[]>(this.GetAllDateFields);
  }

  deleteDateField(id: number) {
    return this.httpClient.delete(this.DeleteDateField + id);
  }

  editDateField(id) {
    return this.httpClient.get<DateField>(this.FindById + id);
  }

  getDateFieldDetails(dateFieldId) {
    return this.httpClient.get<DateField>(this.FindById + dateFieldId);
  }



}
