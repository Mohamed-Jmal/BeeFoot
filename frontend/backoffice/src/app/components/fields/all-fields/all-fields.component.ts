import {Component, OnInit} from '@angular/core';
import {Field} from '../../../models/field';
import {FieldServiceService} from '../../../services/FieldService/field-service.service';
import {Router} from "@angular/router";
import {FieldImageService} from "../../../services/field-image/field-image.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-all-fields',
  templateUrl: './all-fields.component.html',
  styleUrls: ['./all-fields.component.scss']
})
export class AllFieldsComponent implements OnInit{
  items: string[] = ['Item 1', 'Item 2', 'Item 3'];

  fieldList: Field[] = [];

  constructor(private fieldService: FieldServiceService, private route: Router, private fieldImageService: FieldImageService) {
  }
  ngOnInit(): void {
    this.getAllFields();
  }

  /*getAllFields() {
    this.fieldService.getAllField().subscribe(
        (fields: Field[]) => {
          this.fieldList = fields;
        },
        (error) => {
          console.error('Error fetching fields:', error);
        }
    );
  }*/

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

  deleteField(id){
    this.fieldService.deleteField(id).subscribe((response) => {
      this.getAllFields();
    });
  }

  public editFieldDetails(fieldId){
    this.route.navigate(['/fields/add-field', {fieldId}]);
  }

}
