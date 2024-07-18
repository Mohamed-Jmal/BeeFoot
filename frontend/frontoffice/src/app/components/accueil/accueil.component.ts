import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {OwlOptions} from "ngx-owl-carousel-o";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {UserServiceService} from "../../services/user-service/user-service.service";
import { MatMenuTrigger } from '@angular/material/menu';
import {FieldServiceService} from "../../services/field-service/field-service.service";
import {FieldImageService} from "../../services/field-image/field-image.service";
import {Field} from "../../models/field";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-acceuil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit{
  currentUser: User | null = null;
  fieldList: Field[] = [];
  user = {
    username: 'John Doe',
    avatar: 'path_to_user_avatar_image.jpg',
  };
  // @ts-ignore
  @ViewChild(MatMenuTrigger) userMenuTrigger: MatMenuTrigger;

  openUserProfile() {
    // Implement the logic to open the user profile.
  }

  showNotifications() {
    // Implement the logic to show notifications.
  }

  showUserProfile() {
    // Implement the logic to show user profile details.
    this.router.navigateByUrl("acceuil/profile")
  }

  logout() {
    // Implement the logout logic.
  }
  reloadPage() {
    window.location.reload();
  }


  constructor(private router: Router,private fieldService: FieldServiceService,  private fieldImageService: FieldImageService, public authService:AuthService,private userService: UserServiceService) {
  }
  title = 'frontoffice';
  currentuser :any;



  foods  = [
    {value: 'steak-0', viewValue: 'CLUB MIAMI CENTER'},
    {value: 'pizza-1', viewValue: 'SFAX'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  options = ['Option 1', 'Option 2', 'Option 3'];
  policyOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  showHeaderOptions = false;

  toggleHeaderOptions() {
    this.showHeaderOptions = !this.showHeaderOptions;
  }

  navigateToSignUpUser() {
    this.router.navigateByUrl("/registeruser")
  }

  navigateToContactForm() {
    this.router.navigateByUrl("/contact-form")
  }
  navigateToNosActivite() {
    this.router.navigateByUrl("/nos-activite")
  }
  loginUser() {
    this.router.navigateByUrl("/signin")
  }

  registerAdmin() {
    this.router.navigateByUrl("/registeradmin")
  }

  ngOnInit(): void {
    //this.currentUser = this.authService.currentUser;
    this.userService.findUserByUsername(this.authService.username).subscribe((data:any)=>{
      this.currentuser=data;
      console.log("console loula ",this.currentuser);
      this.user.username=this.currentuser.username
    });
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
}
