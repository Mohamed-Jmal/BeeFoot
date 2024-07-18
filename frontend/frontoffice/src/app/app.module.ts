import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule, RouterOutlet} from "@angular/router";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CalendarComponent } from './calendar/calendar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SigninComponent } from './components/signin/signin.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import {HttpClientModule} from "@angular/common/http";
import jwtDecode from "jwt-decode";
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {MatDialogModule} from "@angular/material/dialog";
import { MatMenuModule } from '@angular/material/menu';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {ContactFormComponent} from "./components/contact-form/contact-form.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NosActiviteComponent} from "./components/nos-activite/nos-activite.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {NgxPaginationModule} from 'ngx-pagination';
import { FetchFieldsComponent } from './components/fetch-fields/fetch-fields.component';
import { DetailFieldComponent } from './components/detail-field/detail-field.component';

library.add(faBars);
@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SigninComponent,
    AccueilComponent,
    RegisterAdminComponent,
    RegisterUserComponent,
    ProfileComponent,
    UpdateProfileComponent,
    EditProfileComponent,
    ContactFormComponent,
    NosActiviteComponent,
    FetchFieldsComponent,
    DetailFieldComponent,
  ],
    imports: [
      MatIconModule,
      NgxPaginationModule,
        FormsModule,
      MatPaginatorModule,
        MatMenuModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        CarouselModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        RouterOutlet,
        FontAwesomeModule,
        AppRoutingModule,
        MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, NgFor, MatDialogModule,
        MatInputModule,
        FormsModule,  NgxDropzoneModule,MatSnackBarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
