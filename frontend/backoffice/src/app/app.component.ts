import {Component, OnInit} from '@angular/core';
import {AuthService} from "./components/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'multikart-backend';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.loadJwtTokenFromLocalStorage();
  }
}
