import { Component } from '@angular/core';
import {NgForm, UntypedFormBuilder} from "@angular/forms";
import {User} from "../../models/user";
import {FileHandleUser} from "../../models/FileHandleUser";
import {MatDialogRef} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";
import {UserServiceService} from "../../services/user-service/user-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {

  username: string = '';
  fullName: string = '';
  array: FileHandleUser[] = [];
  files: File[] = [] ;
  // @ts-ignore
  user: User = new User();


  constructor(private formBuilder: UntypedFormBuilder, private sanitizer: DomSanitizer, private userService: UserServiceService, private activatedRoute: ActivatedRoute, private route: Router) {}

  onSubmit(userForm: NgForm) {
    this.user.userImages = this.array;
    console.log(this.user);
    const userFormData = this.prepareFormData(this.user);
    this.userService.UpdateUser(userFormData).subscribe(
      (user: User) => {
        console.log('user added successfully', user);
        // Reset the form


        // @ts-ignore
        this.user = new User();
        this.route.navigate(['acceuil/update-profile']);
      },
      (error) => {
        console.error('Failed to add user', error);
      }
    );

  }

  // @ts-ignore
  onSelect(event) {
    console.log(event);
    // this.files.push(...event.addedFiles);
    if (event.addedFiles){
      const file = event.addedFiles[0];
      const fileHandleUser: FileHandleUser = {
        filemal: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      };
      // @ts-ignore
      this.array.push(fileHandleUser);
      this.user.userImages = this.array;
    }
  }

  prepareFormData(user: User): FormData{
    const formData = new FormData();

    formData.append('user', new Blob([JSON.stringify(user)], {type: 'application/json'}));
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < user.userImages.length ; i++) {
      formData.append('imageFile', user.userImages[i].filemal, user.userImages[i].filemal.name);
    }
    return formData;
  }

  // @ts-ignore
  onRemove(event) {
    console.log(event);
    this.array.splice(this.array.indexOf(event), 1);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      // @ts-ignore
      const id = params.id;
      console.log(id);
      if (id) {
        // Fetch the field data by its ID from your backend
        this.userService.getUserDetails(id).subscribe(
          (user: User) => {
            this.user = user;
            console.log(user);
          },
          (error) => {
            console.error('Failed to fetch user data', error);
          }
        );
      }
    });
  }
}
