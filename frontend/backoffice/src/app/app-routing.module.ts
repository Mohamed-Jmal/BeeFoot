import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { content } from './shared/routes/content-routes';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import {AllFieldsComponent} from './components/fields/all-fields/all-fields.component';
import {AddFieldComponent} from './components/fields/add-field/add-field.component';
import {FieldResolverService} from './services/field-resolver/field-resolver.service';
import {AllBookingsComponent} from './components/booking/all-bookings/all-bookings.component';
import {AddBookingComponent} from './components/booking/add-booking/add-booking.component';
import {ListUserComponent} from './components/users/list-user/list-user.component';
import {CreateUserComponent} from './components/users/create-user/create-user.component';
import {UserResolverService} from './services/user-resolver/user-resolver.service';
import {UpdateUserComponent} from './components/users/update-user/update-user.component';
import {AllEspacesComponent} from "./components/espaces/all-espaces/all-espaces.component";
import {AddEspaceComponent} from "./components/espaces/add-espace/add-espace.component";
import {EspaceResolverService} from "./services/espace-resolver/espace-resolver.service";
import {AddDateFieldComponent} from "./components/dateField/add-date-field/add-date-field.component";
import {AllDateFieldsComponent} from "./components/dateField/all-date-fields/all-date-fields.component";
import {AddNotificationComponent} from "./components/notification/add-notification/add-notification.component";
import {AllNotificationsComponent} from "./components/notification/all-notifications/all-notifications.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'dashboard/default', pathMatch: 'full'},
  {path: '', component: ContentLayoutComponent,
    children: content
  },
  { path: 'users/all-users', component: ListUserComponent },
  {path: 'users/add-user', component: CreateUserComponent, resolve : {
      user: UserResolverService
    }},
  {path: 'users/update-user', component: UpdateUserComponent, resolve : {
      user: UserResolverService
    }},

  {path: 'fields/add-field', component: AddFieldComponent, resolve : {
      field: FieldResolverService , espace:  EspaceResolverService
    }},
  { path: 'fields/all-fields', component: AllFieldsComponent },
  {path: 'espaces/add-espace', component: AddEspaceComponent, resolve : {
      espace: EspaceResolverService
    }},
  { path: 'espaces/all-espaces', component: AllEspacesComponent },
  { path: 'booking/add-booking', component: AddBookingComponent },
  { path: 'booking/all-bookings', component: AllBookingsComponent },
  { path: 'notification/add-notification', component: AddNotificationComponent },
  { path: 'notification/all-notifications', component: AllNotificationsComponent },
  { path: 'date-field/add-date-field', component: AddDateFieldComponent },
  { path: 'date-field/all-date-field', component: AllDateFieldsComponent },
];

/*const routes: Routes = [
  {path: 'auth/login', component: LoginComponent},
  {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  {path : 'admin', component : ContentLayoutComponent , canActivate : [AuthenticationGuard],
    children : content},
  // {path: '', redirectTo: 'dashboard/default', pathMatch: 'full'},
  // {path: '', component: ContentLayoutComponent, children: content}
];*/

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
