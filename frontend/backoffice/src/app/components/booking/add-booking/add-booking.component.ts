import {Component, OnInit} from '@angular/core';
import {NgForm, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {FileHandleMal} from '../../../models/FlileHandleMal';
import {Field} from '../../../models/field';
import {DomSanitizer} from '@angular/platform-browser';
import {FieldServiceService} from '../../../services/FieldService/field-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Booking} from '../../../models/Booking';
import {BookingServiceService} from '../../../services/BookingService/booking-service.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss']
})
export class AddBookingComponent implements OnInit{
  public generalForm: UntypedFormGroup;
  public seoForm: UntypedFormGroup;
  errorMessage = 'null';

  array: FileHandleMal[] = [];
  files: File[] = [] ;


  bookingStatusValues: string[] = [];
  booking: Booking = new Booking();
  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private formBuilder: UntypedFormBuilder, private sanitizer: DomSanitizer, private bookingService: BookingServiceService, private activatedRoute: ActivatedRoute, private route: Router) {
    this.createGeneralForm();
    this.createSeoForm();

  }

  createGeneralForm() {
    this.generalForm = this.formBuilder.group({
      name: [''],
      desc: [''],
      status: ['']
    });
  }
  createSeoForm() {
    this.seoForm = this.formBuilder.group({
      title: [''],
      keyword: [''],
      meta_desc: ['']
    });
  }

  onSelect(event) {
    console.log(event);
    // this.files.push(...event.addedFiles);
    if (event.addedFiles){
      const file = event.addedFiles[0];
      const fileHandleMal: FileHandleMal = {
        filemal: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
        )
      };
      // @ts-ignore
      this.array.push(fileHandleMal);
    }
  }
  fetchBookingStatusValues() {
    this.http.get<string[]>('http://localhost:8085/pfa/booking/bookingStatusValues')
        .subscribe((data: string[]) => {
          this.bookingStatusValues = data;
        });
  }

  onSubmit(bookingForm: NgForm) {
    this.bookingService.addBooking(this.booking).subscribe(
        (booking: Booking) => {
          console.log('booking added successfully', booking);
          // Reset the form


          this.booking = new Booking();
          this.route.navigate(['/booking/all-bookings']);
        },
        (error) => {
          console.error('Failed to add booking', error);
        }
    );

  }
  /*onSubmit() {
    this.fieldService.addField(this.field).subscribe(
        (field: Field) => {
          console.log('Field added successfully', field);
          // Reset the form
          this.field = new Field();
          this.route.navigate(['/fields/all-fields']);
        },
        (error) => {
          console.error('Failed to add field', error);
        }
    );
  }*/









  ngOnInit(): void {
    this.fetchBookingStatusValues();
    this.activatedRoute.params.subscribe(params => {
      const bookingId = params.bookingId;
      if (bookingId) {
        // Fetch the field data by its ID from your backend
        this.bookingService.getBookingDetails(bookingId).subscribe(
            (booking: Booking) => {
              this.booking = booking;
            },
            (error) => {
              console.error('Failed to fetch booking data', error);
            }
        );
      }
    });
  }

}
