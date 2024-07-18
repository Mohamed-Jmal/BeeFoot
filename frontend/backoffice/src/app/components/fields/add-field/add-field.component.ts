import {Component, OnInit} from '@angular/core';
import {NgForm, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {FieldServiceService} from '../../../services/FieldService/field-service.service';
import {Field} from '../../../models/field';
import {FileHandleMal} from '../../../models/FlileHandleMal';
import {Espace} from "../../../models/espace";
import {EspaceServiceService} from "../../../services/EspaceService/espace-service.service";

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.scss']
})
export class AddFieldComponent implements OnInit{

  public generalForm: UntypedFormGroup;
  public seoForm: UntypedFormGroup;
  errorMessage = 'null';

  array: FileHandleMal[] = [];
  files: File[] = [] ;
  selectedItems: string[] = [''];
  espace: Espace = new Espace();
  field: Field = new Field();
  // tslint:disable-next-line:max-line-length
  private a: number;
  constructor(private formBuilder: UntypedFormBuilder, private sanitizer: DomSanitizer, private fieldService: FieldServiceService, private activatedRoute: ActivatedRoute, private route: Router, private espaceService: EspaceServiceService) {
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

  onSubmit(fieldForm: NgForm) {
    this.field.fieldImages = this.array;
    console.log(this.field);
    const fieldFormData = this.prepareFormData(this.field);
    this.fieldService.addField(fieldFormData).subscribe(
        (field: Field) => {
          console.log('field added successfully', field);
          // Reset the form


          this.field = new Field();
          this.route.navigate(['/fields/all-fields']);
        },
        (error) => {
          console.error('Failed to add field', error);
        }
    );

  }
  /*onSubmit() {
    this.fieldService.addField(this.field).subscribe(
        (field: Field) => {
          console.log('Field added successfully', field);
          // Reset the form
          this.field = new Field();
          this.route.navigate(['/fields/all-fields']);
        },
        (error) => {
          console.error('Failed to add field', error);
        }
    );
  }*/


  onSelect(event) {
    console.log(event);
    // this.files.push(...event.addedFiles);
    if (event.addedFiles){
      const file = event.addedFiles[0];
      const fileHandleMal: FileHandleMal = {
        filemal: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
        )
      };
      // @ts-ignore
      this.array.push(fileHandleMal);
      this.field.fieldImages = this.array;
    }
  }

  prepareFormData(field: Field): FormData{
    const formData = new FormData();

    formData.append('field', new Blob([JSON.stringify(field)], {type: 'application/json'}));
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < field.fieldImages.length ; i++) {
      formData.append('imageFile', field.fieldImages[i].filemal, field.fieldImages[i].filemal.name);
    }
    return formData;
  }

  onRemove(event) {
    console.log(event);
    this.array.splice(this.array.indexOf(event), 1);
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const fieldId = params.fieldId;
      if (fieldId) {
        // Fetch the field data by its ID from your backend
        this.fieldService.getFieldDetails(fieldId).subscribe(
            (field: Field) => {
              this.field = field;
            },
            (error) => {
              console.error('Failed to fetch field data', error);
            }
        );
      }
    });
    console.log(this.field.fieldId);
    this.activatedRoute.params.subscribe(params => {
      const espaceId = params.espaceId;
      if (espaceId) {
        // Fetch the field data by its ID from your backend
        this.espaceService.getEspaceDetails(espaceId).subscribe(
            (espace: Espace) => {
              this.espace = espace;
            },
            (error) => {
              console.error('Failed to fetch field data', error);
            }
        );
      }
    });
  }


  affectFieldToEspace(): void {
    const fieldFormData = this.prepareFormData(this.field);
    this.fieldService.addField(fieldFormData).subscribe(
        (field: Field) => {
          console.log('field added successfully', field);
          this.a = field.fieldId ;
          console.log('Espace ID:', this.espace.espaceId);

          this.espaceService.affectFieldToEspace(this.espace.espaceId, field.fieldId).subscribe(resp => console.log('affected succ '));
          // Reset the form
          this.field = new Field();
        },
        (error) => {
          console.error('Failed to add field', error);
        }
    );
  }




}
