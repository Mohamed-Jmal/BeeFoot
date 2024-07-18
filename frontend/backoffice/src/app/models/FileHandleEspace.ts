import {SafeUrl} from '@angular/platform-browser';

export interface FileHandleEspace{
    filemal: File;
    url: SafeUrl;
    preview?: string;
}
