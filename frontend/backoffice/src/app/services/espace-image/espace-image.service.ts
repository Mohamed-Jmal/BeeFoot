import { Injectable } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Espace} from '../../models/espace';
import {FileHandleEspace} from '../../models/FileHandleEspace';

@Injectable({
  providedIn: 'root'
})
export class EspaceImageService {

  constructor(private sanitizer: DomSanitizer) { }


  public createImagesMal(espace: Espace) {
    const espaceImages: any[] = espace.espaceImages;
    const espaceImagesToFileHandle: FileHandleEspace[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < espaceImages.length; i++){
      const imageFileData = espaceImages[i];
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
      espaceImagesToFileHandle.push(finalFileHandle);
    }
    espace.espaceImages = espaceImagesToFileHandle;
    return espace;
  }

  public dataURItoBlobMal(pictBytes, imageMalType){
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
