import { Component, Input, Output, EventEmitter, ngOnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import moment from 'moment-es6';

@Component({
  selector: 'app-date-input',
  templateUrl: './dateinput.component.html',
  styleUrls: []
})
export class DateinputComponent implements OnInit {
  @Input() rangeStart: Date;
  @Input() rangeEnd: Date;
  @Input() public startDate = new Date();
  @Output() public startDateChange = new EventEmitter<Date>();
  @Input() public endDate = new Date();
  @Output() public endDateChange = new EventEmitter<Date>();
  @Input() isValidRange = true;
  @Input() dateFormat: string;
  @Input() showApplyButton: boolean;
  @Output() OnToggleCalendar = new EventEmitter();
  @Output() OnSelectStartDate = new EventEmitter();
  @Output() OnSelectEndDate = new EventEmitter();
  @Output() OnApplyDateRange = new EventEmitter();
  @Output() OnFocus = new EventEmitter();
  hintDateFormat: string;
  isValidDate = true;

  get startDateFormat() {
    return moment(this.startDate).format(this.dateFormat);
  }

  get endDateFormat() {
    return moment(this.endDate).format(this.dateFormat);
  }

  public errorMessages = [];

  constructor () { }

  public ngOnInit () {
    if (this.dateFormat[0].toUpperCase() == "L") {  // Set up hint for localized formats
      moment.locale(navigator.language);
      this.hintDateFormat = moment.localeData().longDateFormat(this.dateFormat);
    }  else {
      this.hintDateFormat = this.dateFormat;
    }
  }

  public toggleCalendar() {
    this.OnToggleCalendar.emit();
  }

  public updateStartDate(val) {
    const tempDate = moment(val, this.dateFormat, true);
    this.isValidDate = tempDate.isValid();
    if (tempDate.isValid()) {
      this.startDateChange.emit(tempDate.toDate());
    }
  }

  public updateEndDate(val) {
    const tempDate = moment(val, this.dateFormat, true);
    this.isValidDate = tempDate.isValid();
    if (tempDate.isValid()) {
      this.endDateChange.emit(tempDate.toDate());
    }
  }

  public openCalendar() {
    this.OnFocus.emit();
  }

  onSubmit() {
    this.OnApplyDateRange.emit();
  }
}
