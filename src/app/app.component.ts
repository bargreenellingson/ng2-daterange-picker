import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public rangeStart = new Date('2018-04-07');
  public rangeEnd = new Date('2018-06-07');
  public startDate = new Date('2018-04-07');
  public endDate = new Date('2018-06-07');
  public isOpen = false;
  public openCalendar() {
    this.isOpen = !this.isOpen;
  }
  public dateTest(startDate, endDate): Array<String> {
    const errorArray = [];
    console.log( endDate.valueOf() + ' ' + startDate.valueOf() );
    if (endDate.valueOf() < startDate.valueOf()) {
      errorArray.push('Start date is greater than end date');
    }
    if (startDate.valueOf() < this.rangeStart || startDate.valueOf() > this.rangeEnd) {
      errorArray.push('Start date out of range');
    }
    if (endDate.valueOf() < this.rangeStart || endDate.valueOf() > this.rangeEnd) {
      errorArray.push('End date out of range');
    }
    return errorArray;
  }

  public applyDates($event) {
    this.startDate = $event.startDate;
    this.endDate = $event.endDate;
    this.openCalendar();
  }
}
