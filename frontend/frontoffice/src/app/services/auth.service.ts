import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import jwtDecode from "jwt-decode";
import {User} from "../models/user";
import {UserServiceService} from "./user-service/user-service.service";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})


export class AuthService {

  isAuthenticated : boolean =false;
  roles:any;
  username:any;
  phoneNumber: any;
  currentUser: any;  // Store the current user

  accessToken!: any;

  constructor(private http:HttpClient, private router : Router,private userService: UserServiceService) { }



  public login(username : string, password : string){
    let options ={
      headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    let params=new HttpParams()
      .set("username",username).set("password",password);
    return this.http.post("http://localhost:8085/pfa/auth/login", params,options)
  }

  public getCurrentUser(username:string){
    this.username=username;
    this.currentUser=this.userService.findUserByUsername(username);
  }







  loadProfile(data: any) {
    this.isAuthenticated=true;
    this.accessToken = data['access-token'];
    let decodedJwt:any =jwtDecode(this.accessToken);
    this.username=decodedJwt.sub;
    this.roles=decodedJwt.scope;
    this.userService.findUserByUsername(this.username).subscribe((data:any)=>{
      this.currentUser=data;
      console.log("console loula ",this.currentUser);
    });
    console.log("console theniya ",this.currentUser);
    window.localStorage.setItem("jwt-token",this.accessToken);
  }

  logout() {
    this.isAuthenticated=false;
    this.accessToken=undefined;
    this.username=undefined;
    this.roles=undefined;
    window.localStorage.removeItem("access-token");
    this.router.navigateByUrl("/login");
  }


  loadJwtTokenFromLocalStorage() {
    let token = window.localStorage.getItem("jwt-token");
    if (token){
      this.loadProfile({"access-token" : token});
      this.router.navigateByUrl("/admin/customers");
    }
  }


  register(username: string, email: string,fullName:string,phoneNumber:string,gender:string, password: string,confirmPassword:string): Observable<any> {
    return this.http.post("http://localhost:8085/pfa/auth/signup", {
      username,
      email,
      fullName,
      phoneNumber,
      gender,
      password,
      confirmPassword
    }, httpOptions);
  }


  registerMod(username: string, email: string,fullName:string,phoneNumber:string,gender:string, password: string,confirmPassword:string): Observable<any> {
    return this.http.post("http://localhost:8085/pfa/auth/signupmod", {
      username,
      email,
      fullName,
      phoneNumber,
      gender,
      password,
      confirmPassword
    }, httpOptions);
  }
}
