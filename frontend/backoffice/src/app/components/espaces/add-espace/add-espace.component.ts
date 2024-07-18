import {Component, OnInit} from '@angular/core';
import {NgForm, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {FileHandleMal} from '../../../models/FlileHandleMal';
import {Field} from '../../../models/field';
import {FileHandleEspace} from '../../../models/FileHandleEspace';
import {Espace} from '../../../models/espace';
import {DomSanitizer} from '@angular/platform-browser';
import {FieldServiceService} from '../../../services/FieldService/field-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EspaceServiceService} from '../../../services/EspaceService/espace-service.service';

@Component({
  selector: 'app-add-espace',
  templateUrl: './add-espace.component.html',
  styleUrls: ['./add-espace.component.scss']
})
export class AddEspaceComponent implements OnInit{

  public generalForm: UntypedFormGroup;
  public seoForm: UntypedFormGroup;

  array: FileHandleEspace[] = [];
  files: File[] = [] ;
  espace: Espace = new Espace();

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: UntypedFormBuilder, private sanitizer: DomSanitizer, private espaceService: EspaceServiceService, private activatedRoute: ActivatedRoute, private route: Router) {
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

  onSubmit(espaceForm: NgForm) {
    this.espace.espaceImages = this.array;
    console.log(this.espace);
    const espaceFormData = this.prepareFormData(this.espace);
    this.espaceService.addEspace(espaceFormData).subscribe(
        (espace: Espace) => {
          console.log('espace added successfully', espace);
          // Reset the form


          this.espace = new Espace();
          this.route.navigate(['/espaces/all-espaces']);
        },
        (error) => {
          console.error('Failed to add espace', error);
        }
    );

  }
  onSelect(event) {
    console.log(event);
    // this.files.push(...event.addedFiles);
    if (event.addedFiles){
      const file = event.addedFiles[0];
      const fileHandleEspace: FileHandleEspace = {
        filemal: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
        )
      };
      // @ts-ignore
      this.array.push(fileHandleEspace);
      this.espace.espaceImages = this.array;
    }
  }
  prepareFormData(espace: Espace): FormData{
    const formData = new FormData();

    formData.append('espace', new Blob([JSON.stringify(espace)], {type: 'application/json'}));
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < espace.espaceImages.length ; i++) {
      formData.append('imageFile', espace.espaceImages[i].filemal, espace.espaceImages[i].filemal.name);
    }
    return formData;
  }

  onRemove(event) {
    console.log(event);
    this.array.splice(this.array.indexOf(event), 1);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const espaceId = params.espaceId;
      if (espaceId) {
        // Fetch the field data by its ID from your backend
        this.espaceService.getEspaceDetails(espaceId).subscribe(
            (espace: Espace) => {
              this.espace = espace;
            },
            (error) => {
              console.error('Failed to fetch espace data', error);
            }
        );
      }
    });
  }


}
