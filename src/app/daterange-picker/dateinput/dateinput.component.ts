import { Component, Input, Output, EventEmitter } from '@angular/core';

import moment from 'moment-es6';

@Component({
  selector: 'app-date-input',
  templateUrl: './dateinput.component.html',
  styleUrls: ['./dateinput.component.scss']
})
export class DateinputComponent {
  @Input() rangeStart: Date;
  @Input() rangeEnd: Date;
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() isValidRange = true;
  @Input() dateFormat: string;
  @Output() OnToggleCalendar = new EventEmitter();
  @Output() OnSelectStartDate = new EventEmitter();
  @Output() OnSelectEndDate = new EventEmitter();
  @Output() OnApplyDateRange = new EventEmitter();
  isValidDate = true;
  get startDateFormat() {
    return moment(this.startDate).format(this.dateFormat);
  }

  // set startDateFormat(val) {
  //   if (!(isNaN(tempDate.getTime()))) {
  //     this.startDate = tempDate;
  //     this.errorMessages = [];
  //   }
  // }

  get endDateFormat() {
    return moment(this.endDate).format(this.dateFormat);
  }

  public errorMessages = [];

  constructor () { }

  public toggleCalendar() {
    this.OnToggleCalendar.emit();
  }

  public updateStartDate(val) {
    const tempDate = moment(val, this.dateFormat, true);
    this.isValidDate = tempDate.isValid();
    if (tempDate.isValid()) {
      this.OnSelectStartDate.emit({date: tempDate.toDate()});
    }
  }

  public updateEndDate(val) {
    const tempDate = moment(val, this.dateFormat, true);
    this.isValidDate = tempDate.isValid();
    if (tempDate.isValid()) {
      this.OnSelectEndDate.emit({date: tempDate.toDate()});
    }
  }

  OnApplySelectedDateRange() {
    this.OnApplyDateRange.emit();
  }
}