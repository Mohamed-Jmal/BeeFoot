import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Field} from '../../models/field';

@Injectable({
  providedIn: 'root'
})
export class FieldServiceService {
  readonly AddField = 'http://localhost:8085/pfa/field/addField';
  readonly GetAllField = 'http://localhost:8085/pfa/field/findAll';
  readonly DeleteField = 'http://localhost:8085/pfa/field/delete/';
  readonly FindById = 'http://localhost:8085/pfa/field/retrieveItem/';
  apiUrl = 'http://localhost:9092/COCO/api/storecatalog';

  constructor(private httpClient: HttpClient) { }

    addField(field: FormData): Observable<any> {
    return this.httpClient.post(this.AddField, field);
  }

  getAllField() {
    return this.httpClient.get<Field[]>(this.GetAllField);
  }

  deleteField(id: number) {
    return this.httpClient.delete(this.DeleteField + id);
  }

  editField(id) {
    return this.httpClient.get<Field>(this.FindById + id);
  }

  getFieldDetails(fieldId) {
    return this.httpClient.get<Field>(this.FindById + fieldId);
  }


}
