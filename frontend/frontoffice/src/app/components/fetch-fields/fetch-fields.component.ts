import {Component, OnInit} from '@angular/core';
import {Field} from "../../models/field";
import {Router} from "@angular/router";
import {FieldServiceService} from "../../services/field-service/field-service.service";
import {FieldImageService} from "../../services/field-image/field-image.service";
import {AuthService} from "../../services/auth.service";
import {UserServiceService} from "../../services/user-service/user-service.service";
import {map} from "rxjs/operators";
import {Espace} from "../../models/espace";
import {EspaceServiceService} from "../../services/EspaceService/espace-service.service";
import {EspaceImageService} from "../../services/espace-image/espace-image.service";

@Component({
  selector: 'app-fetch-fields',
  templateUrl: './fetch-fields.component.html',
  styleUrls: ['./fetch-fields.component.css']
})
export class FetchFieldsComponent implements OnInit{
  fieldList: Field[] = [];
  currentPage: number = 0;
  p:any;

  pageSize = 12; // Set page size to 12
  constructor(private router: Router,private fieldService: FieldServiceService,  private fieldImageService: FieldImageService, public authService:AuthService,private userService: UserServiceService) {
  }


  ngOnInit(): void {
    this.getAllFields();
  }



  public getAllFields(){
    this.fieldService.getAllField()
      .pipe(

        map((x: Field[], i) => x.map((field: Field) => this.fieldImageService.createImagesMal(field)))
      )
      .subscribe(
        (fields: Field[]) => {
          this.fieldList = fields;
        },
        (error) => {
          console.error('Error fetching fields:', error);
        }
      );
  }


  getField(fieldId: any) {
    this.router.navigate(['field', {fieldId}]);

  }

}
