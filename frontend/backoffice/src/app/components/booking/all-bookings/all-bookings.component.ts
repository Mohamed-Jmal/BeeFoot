import {Component, OnInit} from '@angular/core';
import {Booking} from '../../../models/Booking';
import {Router} from '@angular/router';
import {BookingServiceService} from '../../../services/BookingService/booking-service.service';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.scss']
})
export class AllBookingsComponent implements OnInit{
  bookingList: Booking[] = [];

  constructor(private bookingService: BookingServiceService, private route: Router) {
  }

  ngOnInit(): void {
    this.getAllBookings();
    console.log(this.getAllBookings());
  }


  public getAllBookings(){
    this.bookingService.getAllBookings()
        .subscribe(
            (bookings: Booking[]) => {
              this.bookingList = bookings;
            },
            (error) => {
              console.error('Error fetching bookings:', error);
            }
        );
  }


    editBookingDetails(bookingId) {
      this.route.navigate(['/booking/add-booking', {bookingId}]);
    }

    deleteBooking(id) {
      this.bookingService.deleteBooking(id).subscribe(() =>{
          this.getAllBookings();
      });

    }
  affectBooking(bookingId: any) {
    this.route.navigate(['/users/add-user', {bookingId}]);  }
}
