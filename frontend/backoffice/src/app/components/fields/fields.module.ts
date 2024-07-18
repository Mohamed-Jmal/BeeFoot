import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsRoutingModule } from './fields-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import {AllFieldsComponent} from './all-fields/all-fields.component';
import { AddFieldComponent } from './add-field/add-field.component';
import {NgxDropzoneModule} from 'ngx-dropzone';

@NgModule({

  declarations: [AllFieldsComponent, AddFieldComponent],
  imports: [
    NgxDropzoneModule,
    CommonModule,
    FieldsRoutingModule,
    NgbModule,
    FormsModule,
    SharedModule,
  ]
})
export class FieldsModule { }
