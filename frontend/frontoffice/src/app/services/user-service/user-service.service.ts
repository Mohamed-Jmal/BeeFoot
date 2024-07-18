import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  readonly FindById = 'http://localhost:8085/pfa/user/retrieveItem/';
  readonly updateUser = 'http://localhost:8085/pfa/user/updateUserWithImage';

  constructor(private http:HttpClient, private router : Router) { }

  public findUserByUsername(username:string):any{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt-token') // Include the JWT token if needed
    });

    // Use the headers in your HTTP request
    const options = { headers: headers };

    // Make the HTTP GET request with the specified headers
    return this.http.get<any>(`http://localhost:8085/pfa/user/findByUsername/${username}`, options);
  }

  // @ts-ignore
  getUserDetails(id) {
    return this.http.get<User>(this.FindById + id);
  }

  UpdateUser(user: FormData): Observable<any> {
    return this.http.put(this.updateUser, user);
  }
}
