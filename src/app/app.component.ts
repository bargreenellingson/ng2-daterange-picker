import { Component, OnInit } from '@angular/core';

import moment from 'moment-es6';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public rangeStart = moment().startOf('year');
  public rangeEnd = moment().endOf('day').toDate();
  public startDate = moment().startOf('year').toDate();
  public endDate = moment().toDate();
  public ranges = [];

  public ngOnInit() {
    for (let i = 0; i < 5; i++) {
      const startDate = new Date('2018-04-07');
      const endDate = new Date('2018-06-07');
      this.ranges.push({dateStart: startDate, dateEnd: endDate, name: 'Test test test'});
    }
  }
  public dateTest(startDate, endDate): Array<String> {
    const errorArray = [];
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
  }
}
