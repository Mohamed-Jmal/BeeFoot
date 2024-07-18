import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllFieldsComponent} from './all-fields/all-fields.component';
import {AddFieldComponent} from './add-field/add-field.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all-fields',
        component: AllFieldsComponent,
        data: {
          title: 'Fields',
          breadcrumb: 'Fields'
        }
      },
      {
        path: 'add-field',
        component: AddFieldComponent,
        data: {
          title: 'addField',
          breadcrumb: 'addField'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldsRoutingModule { }
