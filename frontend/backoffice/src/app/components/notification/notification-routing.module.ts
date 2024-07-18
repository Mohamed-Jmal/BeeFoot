import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllNotificationsComponent} from './all-notifications/all-notifications.component';
import {AddNotificationComponent} from './add-notification/add-notification.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all-notifications',
        component: AllNotificationsComponent,
        data: {
          title: 'all-notifications',
          breadcrumb: 'all-notifications'
        }
      },
      {
        path: 'add-notification',
        component: AddNotificationComponent,
        data: {
          title: 'addNotification',
          breadcrumb: 'addNotification'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
