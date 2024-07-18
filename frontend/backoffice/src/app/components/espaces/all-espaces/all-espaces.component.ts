import {Component, OnInit} from '@angular/core';
import {Field} from '../../../models/field';
import {Espace} from '../../../models/espace';
import {FieldServiceService} from '../../../services/FieldService/field-service.service';
import {Router} from '@angular/router';
import {FieldImageService} from '../../../services/field-image/field-image.service';
import {map} from 'rxjs/operators';
import {EspaceServiceService} from "../../../services/EspaceService/espace-service.service";
import {EspaceImageService} from "../../../services/espace-image/espace-image.service";

@Component({
  selector: 'app-all-espaces',
  templateUrl: './all-espaces.component.html',
  styleUrls: ['./all-espaces.component.scss']
})
export class AllEspacesComponent implements OnInit {

  espaceList: Espace[] = [];

  constructor(private espaceService: EspaceServiceService, private route: Router, private espaceImageService: EspaceImageService) {
  }

  ngOnInit(): void {
    this.getAllEspaces();
  }

  public getAllEspaces(){
    this.espaceService.getAllEspace()
        .pipe(

            map((x: Espace[], i) => x.map((espace: Espace) => this.espaceImageService.createImagesMal(espace)))
        )
        .subscribe(
            (espaces: Espace[]) => {
              this.espaceList = espaces;
            },
            (error) => {
              console.error('Error fetching espaces:', error);
            }
        );
  }

  deleteEspace(id){
    this.espaceService.deleteEspace(id).subscribe((response) => {
      this.getAllEspaces();
    });
  }

  public editEspaceDetails(espaceId){
    this.route.navigate(['/espaces/add-espace', {espaceId}]);
  }


    affectField(espaceId: any) {
      this.route.navigate(['/fields/add-field', {espaceId}]);  }
}
