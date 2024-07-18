import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  readonly AddNotification = 'http://localhost:8085/pfa/notification/add';
  readonly GetAllNotifications = 'http://localhost:8085/pfa/notification/findAll';
  readonly DeleteNotification = 'http://localhost:8085/pfa/notification/delete/';
  readonly FindById = 'http://localhost:8085/pfa/notification/retrieveItem/';

  constructor(private httpClient: HttpClient) { }


  addNotification(notification: Notification): Observable<any> {
    return this.httpClient.post(this.AddNotification, notification);
  }

  getAllNotifications() {
    return this.httpClient.get<Notification[]>(this.GetAllNotifications);
  }
  deleteNotification(id: number) {
    return this.httpClient.delete(this.DeleteNotification + id);
  }

  editNotification(id) {
    return this.httpClient.get<Notification>(this.FindById + id);
  }
  getNotificationDetails(notificationId) {
    return this.httpClient.get<Notification>(this.FindById + notificationId);
  }

}
