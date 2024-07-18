import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllDateFieldsComponent} from './all-date-fields/all-date-fields.component';
import {AddDateFieldComponent} from './add-date-field/add-date-field.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all-date-fields',
        component: AllDateFieldsComponent,
        data: {
          title: 'all-date-fields',
          breadcrumb: 'all-date-fields'
        }
      },
      {
        path: 'add-date-field',
        component: AddDateFieldComponent,
        data: {
          title: 'addDateField',
          breadcrumb: 'addDateField'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DateFieldRoutingModule { }
