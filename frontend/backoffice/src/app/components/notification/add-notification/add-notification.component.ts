import {Component, OnInit} from '@angular/core';
import {NgForm, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {FileHandleMal} from "../../../models/FlileHandleMal";
import {Booking} from "../../../models/Booking";
import {Notification} from '../../../models/Notification';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {BookingServiceService} from "../../../services/BookingService/booking-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationServiceService} from "../../../services/NotificationService/notification-service.service";

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit{
  public generalForm: UntypedFormGroup;
  public seoForm: UntypedFormGroup;
  errorMessage = 'null';

  array: FileHandleMal[] = [];
  files: File[] = [] ;

  notification: Notification = new Notification();
  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private formBuilder: UntypedFormBuilder, private sanitizer: DomSanitizer, private notificationService: NotificationServiceService, private activatedRoute: ActivatedRoute, private route: Router) {
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

  onSubmit(notificationForm: NgForm) {
    this.notificationService.addNotification(this.notification).subscribe(
        (notification: Notification) => {
          console.log('notification added successfully', notification);
          // Reset the form


          this.notification = new Notification();
          this.route.navigate(['/notification/all-notifications']);
        },
        (error) => {
          console.error('Failed to add notification', error);
        }
    );

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const notificationId = params.notificationId;
      if (notificationId) {
        // Fetch the field data by its ID from your backend
        this.notificationService.getNotificationDetails(notificationId).subscribe(
            (notification: Notification) => {
              this.notification = notification;
            },
            (error) => {
              console.error('Failed to fetch notification data', error);
            }
        );
      }
    });
  }

}
