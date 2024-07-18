import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
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

  registerUser() {
    this.router.navigateByUrl('/signin');
  }

  onSubmit(): void {
    // Handle form submission if needed
  }

  register(): void {
    const username = this.formRegister.value.username;
    const password = this.formRegister.value.password;
    const fullName = this.formRegister.value.fullName;
    const phoneNumber = this.formRegister.value.phoneNumber;
    const email = this.formRegister.value.email;
    const confirmPassword = this.formRegister.value.confirmPasswordx;
    const gender = this.formRegister.value.gender;

    this.authService.register(username, email,fullName,phoneNumber,gender, password,confirmPassword).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigateByUrl('/signin');
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
