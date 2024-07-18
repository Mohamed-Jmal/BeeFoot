import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingRoutingModule } from './booking-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {AllBookingsComponent} from './all-bookings/all-bookings.component';
import {AddBookingComponent} from './add-booking/add-booking.component';

@NgModule({

  declarations: [AllBookingsComponent, AddBookingComponent],
  imports: [
    NgxDropzoneModule,
    CommonModule,
    BookingRoutingModule,
    NgbModule,
    FormsModule,
    SharedModule,
  ]
})
export class BookingModule { }
