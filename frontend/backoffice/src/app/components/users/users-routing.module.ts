import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import {UpdateUserComponent} from "./update-user/update-user.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all-users',
        component: ListUserComponent,
        data: {
          title: "User List",
          breadcrumb: "User List"
        }
      },
      {
        path: 'add-user',
        component: CreateUserComponent,
        data: {
          title: "Create User",
          breadcrumb: "Create User"
        }
      },
      {
        path: 'update-user',
        component: UpdateUserComponent,
        data: {
          title: "Update User",
          breadcrumb: "Update User"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
