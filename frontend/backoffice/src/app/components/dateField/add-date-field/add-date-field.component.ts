import {Component, OnInit} from '@angular/core';
import {NgForm, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {FileHandleMal} from "../../../models/FlileHandleMal";
import {Booking} from "../../../models/Booking";
import {DateField} from "../../../models/dateField";
import {DomSanitizer} from "@angular/platform-browser";
import {BookingServiceService} from "../../../services/BookingService/booking-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DateFieldServiceService} from "../../../services/DateFieldService/date-field-service.service";
import {Field} from "../../../models/field";

@Component({
  selector: 'app-add-date-field',
  templateUrl: './add-date-field.component.html',
  styleUrls: ['./add-date-field.component.scss']
})
export class AddDateFieldComponent implements OnInit{

  public generalForm: UntypedFormGroup;
  public seoForm: UntypedFormGroup;
  errorMessage = 'null';

  array: FileHandleMal[] = [];
  files: File[] = [] ;


  dateField: DateField = new DateField();

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: UntypedFormBuilder, private sanitizer: DomSanitizer, private dateFieldService: DateFieldServiceService, private activatedRoute: ActivatedRoute, private route: Router) {
    this.createGeneralForm();
    this.createSeoForm();

  }

  createGeneralForm() {
    this.generalForm = this.formBuilder.group({
      name: [''],
      desc: [''],
      status: ['']
    });
  }
  createSeoForm() {
    this.seoForm = this.formBuilder.group({
      title: [''],
      keyword: [''],
      meta_desc: ['']
    });
  }

  onSubmit(dateFieldForm: NgForm) {
    this.dateFieldService.addDateField(this.dateField).subscribe(
        (dateField: DateField) => {
          console.log('date field added successfully', dateField);
          // Reset the form


          this.dateField = new DateField();
          this.route.navigate(['/date-field/all-date-field']);
        },
        (error) => {
          console.error('Failed to add date field', error);
        }
    );

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const dateFieldId = params.dateFieldId;
      if (dateFieldId) {
        // Fetch the field data by its ID from your backend
        this.dateFieldService.getDateFieldDetails(dateFieldId).subscribe(
            (dateField: DateField) => {
              this.dateField = dateField;
            },
            (error) => {
              console.error('Failed to fetch dateField data', error);
            }
        );
      }
    });
  }




























}
