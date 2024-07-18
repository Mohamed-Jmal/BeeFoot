import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit{

  formRegister!: FormGroup;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createRegisterForm();
  }
  registerAdmin() {
    this.router.navigateByUrl("/acceuil")
  }

  ngOnInit(): void {
  }

  createRegisterForm() {
    this.formRegister = this.fb.group({
      username: [''],
      password: [''],
      email: [''],
      fullName:[''],
      phoneNumber:[''],
      confirmPassword: [''],
      gender:['']
    });
  }

  registerMod(): void {
    const username = this.formRegister.value.username;
    const password = this.formRegister.value.password;
    const fullName = this.formRegister.value.email;
    const phoneNumber = this.formRegister.value.email;
    const email = this.formRegister.value.email;
    const confirmPassword = this.formRegister.value.email;
    const gender = this.formRegister.value.gender;

    this.authService.registerMod(username, email,fullName,phoneNumber,gender, password,confirmPassword).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigateByUrl('/acceuil');
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }


}
