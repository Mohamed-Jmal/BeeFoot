import {Component, OnInit} from '@angular/core';
import {Field} from "../../models/field";
import {User} from "../../models/user";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FieldServiceService} from "../../services/field-service/field-service.service";
import {FieldImageService} from "../../services/field-image/field-image.service";
import {AuthService} from "../../services/auth.service";
import {UserServiceService} from "../../services/user-service/user-service.service";
import {of, switchMap} from "rxjs";

@Component({
  selector: 'app-detail-field',
  templateUrl: './detail-field.component.html',
  styleUrls: ['./detail-field.component.css']
})
export class DetailFieldComponent implements OnInit{
  field1 : Field = new  Field()
   filedId =0  ;
  datalist :any  =[];
  selectedDate: Date | null = null;
  currentuser :any;
  user = {
    username: 'John Doe',
    avatar: 'pat',
  };
  constructor(private route :ActivatedRoute,private router: Router,private activatedRoute: ActivatedRoute,private fieldService: FieldServiceService,  private fieldImageService: FieldImageService, public authService:AuthService,private userService: UserServiceService) {
  }

  ngOnInit(): void {
    this.userService.findUserByUsername(this.authService.username).subscribe((data:any)=>{
      this.currentuser=data;
      console.log("console loula ",this.currentuser);
      this.user.username=this.currentuser.username
    });

    console.log('ProfileComponent ngOnInit');
    this.route.params.subscribe((params: Params) => {
      this.filedId = params['fieldId'];

    });
    this.getAvailb();
    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const fieldId = params.get('fieldId');
        if (fieldId) {
          return this.fieldService.getFieldDetails(fieldId);
        } else {
          throw new Error('Field ID not found in URL');
        }
      }),
      switchMap((field: Field) => {
        if (field) {
          // Perform operations on the field here
          const modifiedField = this.fieldImageService.createImagesMal(field); // Assuming this returns a modified Field
          return of(modifiedField); // Wrap the modified field in an observable using 'of'
        } else {
          throw new Error('No field found with the given ID');
        }
      })
    ).subscribe(
      (fieldWithImages: Field) => {
        this.field1 = fieldWithImages;
        console.log(this.field1);
      },
      (error: any) => {
        console.error('Error fetching field details:', error);
      }
    );
  }

 getAvailb(){
    this.fieldService.getAvailb(this.filedId).subscribe((data:any)=>{
      this.datalist = data.map((item: any) => new Date(item.date));
      console.log("hey "+this.datalist);    })
}
onSubmit(){
    console.log("test" , this.selectedDate);
  const formattedDate = this.formatDate(this.selectedDate);
  console.log("test after " , formattedDate);

  this.fieldService.Reserve(this.filedId, formattedDate,this.user.username).subscribe(
    (response:any) => {
      console.log('Reservation successful:', response);
      this.router.navigate(['acceuil']);
    },
    (error:any) => {
      console.error('Reservation failed:', error);
    }
  );

}
  private formatDate(date: Date | null): string {
    if (!date) {
      return '';
    }

    const parsedDate = typeof date === 'string' ? new Date(date) : date;

    const day = parsedDate.getDate().toString().padStart(2, '0');
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = parsedDate.getFullYear();
    const hours = parsedDate.getHours().toString().padStart(2, '0');
    const minutes = parsedDate.getMinutes().toString().padStart(2, '0');
    const seconds = parsedDate.getSeconds().toString().padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }
}
