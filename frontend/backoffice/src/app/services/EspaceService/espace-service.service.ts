import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Espace} from '../../models/espace';

@Injectable({
  providedIn: 'root'
})
export class EspaceServiceService {

  readonly AddEspace = 'http://localhost:8085/pfa/espace/addEspace';
  readonly GetAllEspace = 'http://localhost:8085/pfa/espace/findAll';
  readonly DeleteEspace = 'http://localhost:8085/pfa/espace/delete/';
  readonly FindById = 'http://localhost:8085/pfa/espace/retrieveItem/';

  constructor(private httpClient: HttpClient) { }

  addEspace(espace: FormData): Observable<any> {
    return this.httpClient.post(this.AddEspace, espace);
  }

  getAllEspace() {
    return this.httpClient.get<Espace[]>(this.GetAllEspace);
  }

  deleteEspace(id: number) {
    return this.httpClient.delete(this.DeleteEspace + id);
  }

  editEspace(id) {
    return this.httpClient.get<Espace>(this.FindById + id);
  }

  getEspaceDetails(espaceId) {
    return this.httpClient.get<Espace>(this.FindById + espaceId);
  }

  affectFieldToEspace(espaceId: number, fieldId: number): Observable<void> {
    const url = `http://localhost:8085/pfa/espace/affectFieldToEspace/${espaceId}/${fieldId}`;
    return this.httpClient.post<void>(url, {});
  }


}
