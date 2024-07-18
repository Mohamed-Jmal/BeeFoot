import {Component, OnInit} from '@angular/core';
import {Booking} from "../../../models/Booking";
import {DateField} from "../../../models/dateField";
import {BookingServiceService} from "../../../services/BookingService/booking-service.service";
import {Router} from "@angular/router";
import {DateFieldServiceService} from "../../../services/DateFieldService/date-field-service.service";

@Component({
  selector: 'app-all-date-fields',
  templateUrl: './all-date-fields.component.html',
  styleUrls: ['./all-date-fields.component.scss']
})
export class AllDateFieldsComponent implements OnInit{
  dateFieldList: DateField[] = [];

  constructor(private dateFieldService: DateFieldServiceService, private route: Router) {
  }

  ngOnInit(): void {
    this.getAllDateFields();
    console.log(this.getAllDateFields());
  }
  public getAllDateFields(){
    this.dateFieldService.getAllDateFields()
        .subscribe(
            (dateFields: DateField[]) => {
              this.dateFieldList = dateFields;
            },
            (error) => {
              console.error('Error fetching dateFields:', error);
            }
        );
  }


  editDateFieldDetails(dateFieldId) {
    this.route.navigate(['/date-field/add-date-field', {dateFieldId}]);
  }

  deleteDateField(id) {
    this.dateFieldService.deleteDateField(id).subscribe(() => {
      this.getAllDateFields();
    });

  }

}
