import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationServiceService} from '../../../services/NotificationService/notification-service.service';

import {Notification} from '../../../models/Notification';
@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.component.html',
  styleUrls: ['./all-notifications.component.scss']
})
export class AllNotificationsComponent implements OnInit{


  notificationList: Notification[] = [];


  constructor(private notificationService: NotificationServiceService, private route: Router) {
  }

  ngOnInit(): void {
    this.getAllNotifications();
    console.log(this.getAllNotifications());
  }

  public getAllNotifications(){
    this.notificationService.getAllNotifications()
        .subscribe(
            (notifications: Notification[]) => {
              this.notificationList = notifications;
            },
            (error) => {
              console.error('Error fetching notifications:', error);
            }
        );
  }

  editNotificationDetails(notificationId) {
    this.route.navigate(['/notification/add-notification', {notificationId}]);
  }
  deleteNotification(id) {
    this.notificationService.deleteNotification(id).subscribe(() => {
      this.getAllNotifications();
    });

  }

























}
