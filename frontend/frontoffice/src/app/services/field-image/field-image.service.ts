import { Injectable } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Field} from '../../models/field';
import {FileHandleMal} from '../../models/FlileHandleMal';

@Injectable({
  providedIn: 'root'
})
export class FieldImageService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImagesMal(field: Field) {
    const fieldImages: any[] = field.fieldImages;
    const fieldImagesToFileHandle: FileHandleMal[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < fieldImages.length; i++){
      const imageFileData = fieldImages[i];
      const imageBlobMAL = this.dataURItoBlobMal(imageFileData.picByte, imageFileData.type);
      const imageFileMal = new File([imageBlobMAL], imageFileData.name, {type: imageFileData.type});
      const reader = new FileReader();
      reader.readAsDataURL(imageFileMal);
      // @ts-ignore
      // @ts-ignore
      const finalFileHandle: FileHandle = {
        filemal: imageFileMal,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFileMal)),
        preview: reader.result as string
      };
      fieldImagesToFileHandle.push(finalFileHandle);
    }
    field.fieldImages = fieldImagesToFileHandle;
    return field;
  }
  public dataURItoBlobMal(pictBytes:any, imageMalType:any){
    const byteString = window.atob(pictBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++){
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: imageMalType });
    return blob;
  }
}
