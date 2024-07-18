import {SafeUrl} from '@angular/platform-browser';

export interface FileHandleUser{
    filemal: File;
    url: SafeUrl;
    preview?: string;
}
