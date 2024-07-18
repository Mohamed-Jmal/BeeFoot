import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxDropzoneModule} from 'ngx-dropzone';


// import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UsersRoutingModule } from './users-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateUserComponent } from './create-user/create-user.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [ListUserComponent, CreateUserComponent, UpdateUserComponent],
  imports: [
    NgxDropzoneModule,
    FormsModule,
    CommonModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
