import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationRoutingModule } from './notification-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {AllNotificationsComponent} from "./all-notifications/all-notifications.component";
import {AddNotificationComponent} from "./add-notification/add-notification.component";

@NgModule({

  declarations: [AllNotificationsComponent, AddNotificationComponent],
  imports: [
    NgxDropzoneModule,
    CommonModule,
    NotificationRoutingModule,
    NgbModule,
    FormsModule,
    SharedModule,
  ]
})
export class NotificationModule { }
