import {Component, OnInit} from '@angular/core';
import {map} from "rxjs/operators";
import {Field} from "../../models/field";
import {Router} from "@angular/router";
import {FieldServiceService} from "../../services/field-service/field-service.service";
import {FieldImageService} from "../../services/field-image/field-image.service";
import {AuthService} from "../../services/auth.service";
import {UserServiceService} from "../../services/user-service/user-service.service";
import {Espace} from "../../models/espace";
import {EspaceServiceService} from "../../services/EspaceService/espace-service.service";
import {EspaceImageService} from "../../services/espace-image/espace-image.service";

@Component({
  selector: 'app-nos-activite',
  templateUrl: './nos-activite.component.html',
  styleUrls: ['./nos-activite.component.css']
})
export class NosActiviteComponent implements OnInit{

  espaceList: Espace[] = [];
  currentPage: number = 0;
  p:any;

  pageSize = 12; // Set page size to 12
  constructor(private router: Router,private espaceService: EspaceServiceService,  private espaceImageService: EspaceImageService, public authService:AuthService,private userService: UserServiceService) {
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


  fetchfields() {
    this.router.navigateByUrl("fields")
  }
}
