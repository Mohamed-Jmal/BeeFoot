import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Field} from "../../models/field";
import {Booking} from "../../models/Booking";

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  readonly AddBooking = 'http://localhost:8085/pfa/booking/add';
  readonly GetAllBookings = 'http://localhost:8085/pfa/booking/findAll';
  readonly DeleteBooking = 'http://localhost:8085/pfa/booking/delete/';
  readonly FindById = 'http://localhost:8085/pfa/booking/retrieveItem/';
  apiUrl = 'http://localhost:9092/COCO/api/storecatalog';

  constructor(private httpClient: HttpClient) { }

  addBooking(booking: Booking): Observable<any> {
    return this.httpClient.post(this.AddBooking, booking);
  }

  getAllBookings() {
    return this.httpClient.get<Booking[]>(this.GetAllBookings);
  }

  deleteBooking(id: number) {
    return this.httpClient.delete(this.DeleteBooking + id);
  }

  editBooking(id) {
    return this.httpClient.get<Booking>(this.FindById + id);
  }

  getBookingDetails(bookingId) {
    return this.httpClient.get<Booking>(this.FindById + bookingId);
  }
  affectBookingToUser(bookingId: number, id: number): Observable<void> {
    const url = `http://localhost:8085/pfa/booking/affectBookingToUser/${bookingId}/${id}`;
    return this.httpClient.post<void>(url, {});
  }
}
