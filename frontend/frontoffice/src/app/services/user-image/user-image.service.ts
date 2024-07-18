import { Injectable } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {User} from '../../models/user';
import {FileHandleUser} from "../../models/FileHandleUser";
import {of} from "rxjs";




@Injectable({
  providedIn: 'root'
})
export class UserImageService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImagesMal(user: User) {
    const userImages: any[] = user.userImages;
    const userImagesToFileHandle: FileHandleUser[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < userImages.length; i++){
      const imageFileData = userImages[i];
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
      userImagesToFileHandle.push(finalFileHandle);
    }
    user.userImages = userImagesToFileHandle;
    return of(user);
  }
  // @ts-ignore
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
