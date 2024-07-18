import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: UntypedFormGroup;
  public registerForm: UntypedFormGroup;
  public active = 1;

  formRegister!: FormGroup;

  formLogin!: FormGroup;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private formBuilder: UntypedFormBuilder, private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.createLoginForm();
    this.createRegisterForm();
  }

  owlcarousel = [
    {
      title: 'Welcome to Multikart',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy.',
    },
    {
      title: 'Welcome to Multikart',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy.',
    },
    {
      title: 'Welcome to Multikart',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy.',
    }
  ];
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: [''],
    });
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: [''],
      password: [''],
      email: [''],
      confirmPassword: [''],
    });
  }


  ngOnInit(): void {
    this.formRegister = this.fb.group({
      username : this.fb.control(''),
      password : this.fb.control(''),
      email : this.fb.control('')
    });
    this.formLogin = this.fb.group({
      username : this.fb.control(''),
      password : this.fb.control('')
    });
  }

  onSubmit() {
  }


  handleLogin(){
    const username = this.formLogin.value.username;
    const pwd = this.formLogin.value.password;
    this.authService.login(username, pwd).subscribe({
      next : data => {
        this.authService.loadProfile(data);
        this.router.navigateByUrl('/dashboard/default');
      },
      error : err => {
        this.errorMessage = 'Incorrect username or password';
        console.log(err);
      }
    });
  }

  registrer(): void {
    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;
    const email = this.registerForm.value.email;


    this.authService.register(username, email, password).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigateByUrl('/dashboard/default');
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
    );
  }

}
