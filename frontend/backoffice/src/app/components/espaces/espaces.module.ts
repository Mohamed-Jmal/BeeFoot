import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspacesRoutingModule } from './espaces-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {AllEspacesComponent} from './all-espaces/all-espaces.component';
import {AddEspaceComponent} from './add-espace/add-espace.component';

@NgModule({

  declarations: [AllEspacesComponent, AddEspaceComponent],
  imports: [
    NgxDropzoneModule,
    CommonModule,
    EspacesRoutingModule,
    NgbModule,
    FormsModule,
    SharedModule,
  ]
})
export class EspacesModule { }
