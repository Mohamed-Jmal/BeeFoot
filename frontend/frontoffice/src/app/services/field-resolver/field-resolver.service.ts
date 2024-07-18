import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Field} from '../../models/field';
import {FieldImageService} from '../field-image/field-image.service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {FieldServiceService} from "../field-service/field-service.service";

@Injectable({
  providedIn: 'root'
})
export class FieldResolverService implements Resolve<Field>{

  constructor(private fieldService: FieldServiceService, private fieldImageService: FieldImageService) { }

  field: Field = new Field();
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Field> {
    const id = route.paramMap.get('fieldId');
    if (id){
      return this.fieldService.getFieldDetails(id).pipe(map(p => this.fieldImageService.createImagesMal(p)));
    } else {
      return of(this.getFieldDetails());
    }
  }

  getFieldDetails(){
    return this.field;
  }
}
