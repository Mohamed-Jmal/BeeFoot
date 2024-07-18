import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFieldRoutingModule } from './dateField-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {AllDateFieldsComponent} from './all-date-fields/all-date-fields.component';
import {AddDateFieldComponent} from './add-date-field/add-date-field.component';

@NgModule({

  declarations: [AllDateFieldsComponent, AddDateFieldComponent],
  imports: [
    NgxDropzoneModule,
    CommonModule,
    DateFieldRoutingModule,
    NgbModule,
    FormsModule,
    SharedModule,
  ]
})
export class DateFieldModule { }
