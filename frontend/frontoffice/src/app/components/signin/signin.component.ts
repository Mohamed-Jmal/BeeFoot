import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  formLogin! : FormGroup;
  constructor(private fb : FormBuilder, private authService : AuthService,
              private router : Router
  ) { }

  ngOnInit(): void {
    this.formLogin=this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control("")
    })
  }

  handleLogin(){
    let username = this.formLogin.value.username;
    let pwd = this.formLogin.value.password;
    this.authService.login(username,pwd).subscribe({
      next : data => {
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/acceuil");
      },
      error : err => {
        console.log("slimen")
        //console.log(err);

      }
    })
  }
  loginUser() {
    this.router.navigateByUrl("/acceuil")
  }

  registerUser() {
    this.router.navigateByUrl("/registeruser")
  }

}
