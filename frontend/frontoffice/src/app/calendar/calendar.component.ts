import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  @Input() showCalendar: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeCalendar() {
    this.close.emit();
  }

}
