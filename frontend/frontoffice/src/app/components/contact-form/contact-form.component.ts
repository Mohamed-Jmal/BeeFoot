import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent  {


  username: string = '';
  myEmail: string = '';
  telephone: string = '';
  content: string = '';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  sendEmail(): void {
    const emailData = {
      subject: 'Your Subject', // Set your subject here
      body: this.content, // Use the content from the form
      username: this.username,
      myEmail: this.myEmail,
      telephone: this.telephone
    };

    this.http.post('http://localhost:8085/pfa/email/sendEmail', emailData)
      .subscribe(
        () => {
          // Handle success (email sent)
          console.log('Email sent successfully');
          this.showNotification('Email sent successfully');
        },
        (error) => {
          // Handle error
          console.error('Error sending email:', error);
          this.showNotification('Error sending email');
        }
      );
  }
  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds (e.g., 3000 for 3 seconds)
    });
  }


}
