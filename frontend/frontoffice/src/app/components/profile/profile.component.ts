import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserServiceService} from "../../services/user-service/user-service.service";
import {MatDialog} from "@angular/material/dialog";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {User} from "../../models/user";
import {UserImageService} from "../../services/user-image/user-image.service";
import {FileHandleMal} from "../../models/FlileHandleMal";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  currentUser: User | null = null;
  constructor(private authService: AuthService,private userService: UserServiceService,private route: Router, private dialog: MatDialog,private userImageService: UserImageService) {
  }

  currentuser :any;

  ngOnInit(): void {
    console.log('ProfileComponent ngOnInit');
    this.userService.findUserByUsername(this.authService.username).subscribe(
      (user: User) => {
        if (user) {
          this.userImageService.createImagesMal(user).subscribe(
            (userWithImages: User) => {
              this.currentuser = userWithImages;
              console.log(this.currentuser);
            },
            (imageError) => {
              console.error('Error fetching user image:', imageError);
            }
          );
        } else {
          console.error('No user found with the given username');
        }
      },
      (error:any) => {
        console.error('Error fetching user:', error);
      }
    );
  }




  /*openEditDialog() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '1000px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed (e.g., refresh data)
    });
  }*/
  editUserDetails(id:any) {
    this.route.navigate(['acceuil/update-profile', {id}]);
  }


}
//this is the main onInit: /*console.log('ProfileComponent ngOnInit');
//     this.userService.findUserByUsername(this.authService.username).subscribe((data:any)=>{
//       this.currentuser=data;
//       console.log("console loula ",this.currentUser);
//     });
