import { Injectable } from '@angular/core';
import {FieldServiceService} from '../FieldService/field-service.service';
import {FieldImageService} from '../field-image/field-image.service';
import {AuthService} from '../../components/services/auth.service';
import {UserImageService} from '../user-image/user-image.service';
import {Field} from '../../models/field';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../../models/user';
import {UserServiceService} from '../UserService/user-service.service';


@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User>{

  constructor(private userService: UserServiceService, private userImageService: UserImageService) { }

  user: User = new User();
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    const id = route.paramMap.get('id');
    if (id){
      return this.userService.getUserDetails(id).pipe(map(p => this.userImageService.createImagesMal(p)));
    } else {
      return of(this.getUserDetails());
    }
  }

  getUserDetails(){
    return this.user;
  }
}
