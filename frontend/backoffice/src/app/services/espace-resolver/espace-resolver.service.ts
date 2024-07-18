import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Espace} from '../../models/espace';
import {EspaceImageService} from '../espace-image/espace-image.service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {EspaceServiceService} from '../EspaceService/espace-service.service';

@Injectable({
  providedIn: 'root'
})
export class EspaceResolverService implements Resolve<Espace>{

  constructor(private espaceService: EspaceServiceService, private espaceImageService: EspaceImageService) { }


  espace: Espace = new Espace();

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Espace> {
    const id = route.paramMap.get('espaceId');
    if (id){
      return this.espaceService.getEspaceDetails(id).pipe(map(p => this.espaceImageService.createImagesMal(p)));
    } else {
      return of(this.getEspaceDetails());
    }
  }

  getEspaceDetails(){
    return this.espace;
  }
}
