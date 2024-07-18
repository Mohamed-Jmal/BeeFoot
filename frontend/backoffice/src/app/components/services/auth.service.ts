import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import jwtDecode from "jwt-decode";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {FileHandleMal} from "../../models/FlileHandleMal";



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static userImages: FileHandleMal[];
  userImages: FileHandleMal[];
  constructor(private http: HttpClient, private router: Router) { }
  isAuthenticated = false;
  roles: any;
  username: any;

  accessToken!: any;

  public login(username: string, password: string){
    const options = {
      headers : new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const params = new HttpParams()
      .set('username', username).set('password', password);
    return this.http.post('http://localhost:8085/pfa/auth/login', params, options);
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];
    const decodedJwt: any = jwtDecode(this.accessToken);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.scope;
    window.localStorage.setItem('jwt-token', this.accessToken);

  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = undefined;
    this.username = undefined;
    this.roles = undefined;
    window.localStorage.removeItem('access-token');
    this.router.navigateByUrl('/auth/login');
  }

  loadJwtTokenFromLocalStorage() {
    const token = window.localStorage.getItem('jwt-token');
    if (token){
      this.loadProfile({'access-token' : token});
      this.router.navigateByUrl('/auth/login');
    }
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8085/pfa/auth/signup', {
      username,
      email,
      password
    }, httpOptions);
  }



  registerwithImage(username: string, email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8085/pfa/auth/signup', {
      username,
      email,
      password
    }, httpOptions);
  }
}
