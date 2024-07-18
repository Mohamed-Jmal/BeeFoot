import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Field} from "../../models/field";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  readonly AddUser = 'http://localhost:8085/pfa/user/addUserWithImage';
  readonly GetAllUser = 'http://localhost:8085/pfa/user/findAll';
  readonly DeleteUser = 'http://localhost:8085/pfa/user/delete/';
  readonly updateUser = 'http://localhost:8085/pfa/user/updateUserWithImage';
  readonly FindById = 'http://localhost:8085/pfa/user/retrieveItem/';
  apiUrl = 'http://localhost:9092/COCO/api/storecatalog';

  constructor(private httpClient: HttpClient) { }

  addUser(user: FormData): Observable<any> {
    return this.httpClient.post(this.AddUser, user);
  }
  UpdateUser(user: FormData): Observable<any> {
    return this.httpClient.put(this.updateUser, user);
  }

  getAllUser() {
    return this.httpClient.get<User[]>(this.GetAllUser);
  }

  deleteUser(id: number) {
    return this.httpClient.delete(this.DeleteUser + id);
  }

  editUser(id) {
    return this.httpClient.get<User>(this.FindById + id);
  }

  getUserDetails(id) {
    return this.httpClient.get<User>(this.FindById + id);
  }


}
