import { Component, OnInit } from '@angular/core';
import {NgForm, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {Field} from '../../../models/field';
import {User} from '../../../models/user';
import {DomSanitizer} from '@angular/platform-browser';
import {FieldServiceService} from '../../../services/FieldService/field-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceService} from '../../../services/UserService/user-service.service';
import {FileHandleUser} from "../../../models/FileHandleUser";
import {Espace} from "../../../models/espace";
import {Booking} from "../../../models/Booking";
import {BookingServiceService} from "../../../services/BookingService/booking-service.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public accountForm: UntypedFormGroup;
  public permissionForm: UntypedFormGroup;
  public active = 1;

  array: FileHandleUser[] = [];
  files: File[] = [] ;
  user: User = new User();
  booking: Booking = new Booking();
  private a: number;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: UntypedFormBuilder, private sanitizer: DomSanitizer, private userService: UserServiceService, private bookingservice: BookingServiceService, private activatedRoute: ActivatedRoute, private route: Router) {
    this.createAccountForm();
    this.createPermissionForm();
  }

  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      fname: [''],
      lname: [''],
      email: [''],
      password: [''],
      confirmPwd: ['']
    });
  }
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    });
  }

  onSubmit(userForm: NgForm) {
    this.user.userImages = this.array;
    console.log(this.user);
    const userFormData = this.prepareFormData(this.user);
    this.userService.addUser(userFormData).subscribe(
        (user: User) => {
          console.log('user added successfully', user);
          // Reset the form


          this.user = new User();
          this.route.navigate(['/users/all-users']);
        },
        (error) => {
          console.error('Failed to add user', error);
        }
    );

  }

  onSelect(event) {
    console.log(event);
    // this.files.push(...event.addedFiles);
    if (event.addedFiles){
      const file = event.addedFiles[0];
      const fileHandleUser: FileHandleUser = {
        filemal: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
        )
      };
      // @ts-ignore
      this.array.push(fileHandleUser);
      this.user.userImages = this.array;
    }
  }

  prepareFormData(user: User): FormData{
    const formData = new FormData();

    formData.append('user', new Blob([JSON.stringify(user)], {type: 'application/json'}));
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < user.userImages.length ; i++) {
      formData.append('imageFile', user.userImages[i].filemal, user.userImages[i].filemal.name);
    }
    return formData;
  }

  onRemove(event) {
    console.log(event);
    this.array.splice(this.array.indexOf(event), 1);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        // Fetch the field data by its ID from your backend
        this.userService.getUserDetails(id).subscribe(
            (user: User) => {
              this.user = user;
            },
            (error) => {
              console.error('Failed to fetch user data', error);
            }
        );
      }
    });

    this.activatedRoute.params.subscribe(params => {
      const bookingId = params.bookingId;
      if (bookingId) {
        // Fetch the field data by its ID from your backend
        this.bookingservice.getBookingDetails(bookingId).subscribe(
            (booking: Booking) => {
              this.booking = booking;
            },
            (error) => {
              console.error('Failed to fetch user data', error);
            }
        );
      }
    });
  }
  addBookingToUser(): void {
    const userFormData = this.prepareFormData(this.user);
    this.userService.addUser(userFormData).subscribe(
        (user: User) => {
          console.log('user added successfully', user);
          this.a = user.id ;
          console.log('booking ID:', this.booking.bookingId);

          this.bookingservice.affectBookingToUser(this.booking.bookingId, user.id).subscribe(resp => console.log('affected succ '));
          // Reset the form
          this.user = new User();
        },
        (error) => {
          console.error('Failed to add user', error);
        }
    );
  }
}
