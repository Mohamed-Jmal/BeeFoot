import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllBookingsComponent} from "./all-bookings/all-bookings.component";
import {AddBookingComponent} from "./add-booking/add-booking.component";


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all-bookings',
        component: AllBookingsComponent,
        data: {
          title: 'all-bookings',
          breadcrumb: 'all-bookings'
        }
      },
      {
        path: 'add-booking',
        component: AddBookingComponent,
        data: {
          title: 'addBooking',
          breadcrumb: 'addBooking'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
