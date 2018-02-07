import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public rangeEnd = new Date();
  public startDate = new Date();
  public endDate = new Date();
  public isOpen = false;
  public openCalendar() {
    this.isOpen = !this.isOpen;
  }
  public dateTest(startDate, endDate): { valid: Boolean, msg: String; } {
    console.log( endDate.valueOf() + ' ' + startDate.valueOf() );
    if (endDate.valueOf() < startDate.valueOf()) {
      return {valid: false, msg: 'Start date is greater than end date'};
    } else {
      return {valid: true, msg: 'Great date range!'};
    }
  }

  public applyDates($event) {
    this.startDate = $event.startDate;
    this.endDate = $event.endDate;
    this.openCalendar();
  }
}
