import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {BrowserModule} from "@angular/platform-browser";

import {SigninComponent} from "./components/signin/signin.component";
import {AppComponent} from "./app.component";
import {AccueilComponent} from "./components/accueil/accueil.component";
import {RegisterAdminComponent} from "./components/register-admin/register-admin.component";
import {RegisterUserComponent} from "./components/register-user/register-user.component";
import {UpdateProfileComponent} from "./components/update-profile/update-profile.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {UserResolverService} from "./services/user-resolver/user-resolver.service";
import {ContactFormComponent} from "./components/contact-form/contact-form.component";
import {NosActiviteComponent} from "./components/nos-activite/nos-activite.component";
import {FetchFieldsComponent} from "./components/fetch-fields/fetch-fields.component";
import {DetailFieldComponent} from "./components/detail-field/detail-field.component";



const routes: Routes = [
  { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
  {
    path: 'acceuil', component: AccueilComponent},
  {
    path: 'acceuil/profile', component: ProfileComponent},
  { path: 'signin', component:SigninComponent },
  { path: 'registeradmin', component:RegisterAdminComponent },
  { path: 'registeruser', component:RegisterUserComponent },
  { path: 'contact-form', component:ContactFormComponent },
  { path: 'nos-activite', component:NosActiviteComponent },
  { path: 'fields', component:FetchFieldsComponent },
  { path: 'field', component:DetailFieldComponent },
  { path: 'acceuil/update-profile', component:UpdateProfileComponent ,resolve : {
      user: UserResolverService
    }},


];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
