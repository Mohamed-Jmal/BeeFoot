import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllEspacesComponent} from './all-espaces/all-espaces.component';
import {AddEspaceComponent} from './add-espace/add-espace.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all-espaces',
        component: AllEspacesComponent,
        data: {
          title: 'Espaces',
          breadcrumb: 'Espaces'
        }
      },
      {
        path: 'add-espace',
        component: AddEspaceComponent,
        data: {
          title: 'addEspace',
          breadcrumb: 'addEspace'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspacesRoutingModule { }
