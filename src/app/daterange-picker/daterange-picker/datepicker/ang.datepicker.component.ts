import {
  animate, Component, ElementRef, EventEmitter, Input, keyframes, OnChanges,
  OnInit, Output, SimpleChange, state, style, transition, trigger
} from '@angular/core';
import { Calendar } from './ang.calendar';
import moment from 'moment-es6';

type DateFormatFunction = (date: Date) => string;

interface ValidationResult {
  [key: string]: boolean;
}

@Component({
  selector: 'ang-datepicker',
  animations: [
    trigger('calendarAnimation', [
      transition('* => left', [
        animate(180, keyframes([
          style({ transform: 'translateX(105%)', offset: 0.5 }),
          style({ transform: 'translateX(-130%)', offset: 0.51 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ]),
      transition('* => right', [
        animate(180, keyframes([
          style({ transform: 'translateX(-105%)', offset: 0.5 }),
          style({ transform: 'translateX(130%)', offset: 0.51 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ])
  ],
  templateUrl: './ang.datepicker.component.html',
  styleUrls: ['./ang.datepicker.component.scss']
})
export class DatePickerComponent implements OnInit, OnChanges {

  private readonly DEFAULT_FORMAT = 'YYYY-MM-DD';
  private dateVal: Date;

  @Output() dateChange = new EventEmitter<Date>();
  @Input() get date(): Date { return this.dateVal; }
  set date(val: Date) {
    this.dateVal = val;
    this.dateChange.emit(val);
    this.setCurrentYear(val.getFullYear());
  }
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() disabled: boolean;
  @Input() accentColor: string;
  @Input() altInputStyle: boolean;
  @Input() private dateFormat: string | DateFormatFunction;
  @Input() fontFamily: string;
  @Input() rangeStart: Date;
  @Input() rangeEnd: Date;
  @Input() inputText: string;
  @Input() weekStart = 0;
  @Input() calendarDays: Array<number>;
  @Input() currentMonth: string;
  @Input() dayNames: Array<String> = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; // Default order: firstDayOfTheWeek = 0
  @Input() hoveredDay: Date;
  @Input() months: Array<string>;
  @Input() isValid: Boolean;
  public disableLeft = false;
  public disableRight = false;
  public disableLeftYear = false;
  public disableRightYear = false;

  @Output() onSelect = new EventEmitter<any>();

  dayNamesOrdered: Array<String>;
  calendar: Calendar;
  currentMonthNumber: number;
  currentYear: number;
  animate: string;
  colors: { [id: string]: string };

  constructor(private elementRef: ElementRef) {

    this.dateFormat = this.DEFAULT_FORMAT;
    this.colors = {
      'black': '#333333',
      'blue': '#1285bf',
      'lightBlue': '#daedf7',
      'lightGrey': '#f1f1f1',
      'white': '#ffffff'
    };
    this.accentColor = this.colors['blue'];
    this.altInputStyle = false;
    this.updateDayNames();

    this.months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', ' December'
    ];
  }

  ngOnInit() {
    this.updateDayNames();
    this.syncVisualsWithDate();
    this.updateArrows();
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if ((changes['date'] || changes['dateFormat'])) {
      this.syncVisualsWithDate();
    }
    if (changes['firstDayOfTheWeek'] || changes['dayNames']) {
      this.updateDayNames();
    }
    this.updateArrows();
  }

  private setCurrentValues(date: Date) {
    this.currentMonthNumber = date.getMonth();
    this.currentMonth = this.months[this.currentMonthNumber];

    this.currentYear = date.getFullYear();

    const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
    this.calendarDays = [].concat.apply([], calendarArray);
    this.calendarDays = this.filterInvalidDays(this.calendarDays);
  }

  private updateDayNames() {
    this.dayNamesOrdered = this.dayNames.slice(); // Copy DayNames with default value (weekStart = 0)
    if (this.weekStart < 0 || this.weekStart >= this.dayNamesOrdered.length) {
      // Out of range
      throw Error(`The weekStart is not in range between ${0} and ${this.dayNamesOrdered.length - 1}`);
    } else {
      this.calendar = new Calendar(this.weekStart);
      this.dayNamesOrdered = this.dayNamesOrdered.slice(this.weekStart, this.dayNamesOrdered.length)
        .concat(this.dayNamesOrdered.slice(0, this.weekStart)); // Append beginning to end
    }
  }

  syncVisualsWithDate(): void {
    if (this.date) {
      this.setInputText(this.date);
      this.setCurrentValues(this.date);
    } else {
      this.inputText = '';
      this.setCurrentValues(new Date());
    }
  }

  setCurrentMonth(monthNumber: number): void {
    this.currentMonth = this.months[monthNumber];
    const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
    this.calendarDays = [].concat.apply([], calendarArray);
    this.calendarDays = this.filterInvalidDays(this.calendarDays);
  }

  setCurrentYear(year: number): void {
    this.currentYear = year;
  }

  setInputText(date: Date): void {
    let inputText = '';
    const dateFormat: string | DateFormatFunction = this.dateFormat;
    if (dateFormat === undefined || dateFormat === null) {
      inputText = moment(date).format(this.DEFAULT_FORMAT);
    } else if (typeof dateFormat === 'string') {
      inputText = moment(date).format(dateFormat);
    } else if (typeof dateFormat === 'function') {
      inputText = dateFormat(date);
    }
    this.inputText = inputText;
  }

  public updateArrows(): void {
    const directions = ['left', 'right'];
    this.disableLeftYear = false;
    this.disableRightYear = false;
    this.disableLeft = false;
    this.disableRight = false;
    directions.forEach( (direction) => {
      const nextYearValid = this.isNextDateValid(this.currentYear, this.currentMonthNumber, direction, 12);
      const nextMonthValid = this.isNextDateValid(this.currentYear, this.currentMonthNumber, direction, 1);
      if (!nextMonthValid) {
        (direction === 'left') ? this.disableLeft = true : this.disableRight = true;
      }
      if (!nextYearValid) {
        (direction === 'left') ? this.disableLeftYear = true : this.disableRightYear = true;
      }
    });
  }

  onYearArrowClick(direction: string): void {
    const currentMonth: number = this.currentMonthNumber;
    let newYear: number = this.currentYear;
    // sets the newMonth
    // changes newYear is necessary
    if (direction === 'left') {
        newYear = this.currentYear - 1;
    } else if (direction === 'right') {
        newYear = this.currentYear + 1;
    }
    // check if new date would be within range
    const newDateValid = this.isNextDateValid(newYear, this.currentMonthNumber, direction, 0);
    if (newDateValid) {
      this.setCurrentYear(newYear);
      this.triggerAnimation(direction);
      this.setCurrentMonth(this.currentMonthNumber);
    }
    this.updateArrows();
  }

  onArrowClick(direction: string): void {
    const currentMonth: number = this.currentMonthNumber;
    let newYear: number = this.currentYear;
    let newMonth: number;
    // sets the newMonth
    // changes newYear is necessary
    if (direction === 'left') {
      if (currentMonth === 0) {
        newYear = this.currentYear - 1;
        newMonth = 11;
      } else {
        newMonth = currentMonth - 1;
      }
    } else if (direction === 'right') {
      if (currentMonth === 11) {
        newYear = this.currentYear + 1;
        newMonth = 0;
      } else {
        newMonth = currentMonth + 1;
      }
    }
    // check if new date would be within range
    const newDateValid = this.isNextDateValid(newYear, newMonth, direction, 0);
    if (newDateValid) {
      this.setCurrentYear(newYear);
      this.currentMonthNumber = newMonth;
      this.setCurrentMonth(newMonth);
      this.triggerAnimation(direction);
    }
    this.updateArrows();
  }

  isNextDateValid(year, month, direction, amount): Boolean {
    const newDate = new Date(year, month);
    // Adjust month depending on the direction
    if (direction === 'right') {
      newDate.setMonth(newDate.getMonth() + amount);
      if (moment(newDate).isBefore(this.rangeStart) && moment(newDate).isBefore(this.rangeEnd) || this.rangeStart === undefined) {
        return true;
      }
    } else {
      newDate.setMonth(newDate.getMonth() - amount);
      if (moment(newDate).isAfter(this.rangeStart) && moment(newDate).isAfter(this.rangeEnd) || this.rangeEnd === undefined) {
        return true;
      }
    }
    let newDateValid: boolean;
    newDateValid = moment(newDate).isBetween(this.rangeStart, this.rangeEnd, 'month', '[]'); // true
    return newDateValid;
  }

  isDayValid(day) {
    const isBetween = moment(day).isBetween(this.rangeStart, this.rangeEnd, 'day', '[]'); // true
    const dateValid = !this.rangeStart || isBetween;
    return dateValid;
  }

  filterInvalidDays(calendarDays: Array<number>): Array<number> {
    const newCalendarDays: any = [];
    calendarDays.forEach((day: number | Date) => {
      if (day === 0) {
        newCalendarDays.push(0);
      } else {
        newCalendarDays.push(day);
      }
    });
    return newCalendarDays;
  }

  onSelectDay(day: Date): void {
    this.date = day;
    this.syncVisualsWithDate();
    this.onSelect.emit({date: day, dateText: this.inputText});
  }

  getDayBackgroundColor(day: Date): string {
    let color = this.colors['white'];
    if (this.isChosenDay(day)) {
      color = this.accentColor;
    } else if (this.isCurrentDay(day)) {
      color = this.colors['lightGrey'];
    } else if (this.isBetweenSelectedDateRange(day)) {
      color = this.colors['lightBlue'];
    }
    return color;
  }

  getDayFontColor(day: Date): string {
    let color = this.colors['black'];
    if (this.isChosenDay(day)) {
      color = this.colors['white'];
    }
    return color;
  }

  isChosenDay(day: Date): boolean {
    if (day) {
      return this.date ? day.toDateString() === this.date.toDateString() : false;
    } else {
      return false;
    }
  }

  isCurrentDay(day: Date): boolean {
    if (day) {
      return day.toDateString() === new Date().toDateString();
    } else {
      return false;
    }
  }

  isBetweenSelectedDateRange(day: Date): boolean {

    if (!day) {
      return false;
    }

    if (this.startDate instanceof Date && this.startDate != undefined && (this.startDate.valueOf() > day.valueOf())) {
      return false;
    }

    if (this.endDate instanceof Date && this.endDate != undefined && (this.endDate.valueOf() < day.valueOf())) {
      return false;
    }

    if ( (this.startDate instanceof Date) && (this.endDate instanceof Date) &&
        (this.startDate == undefined && this.endDate == undefined)) {
      return false;
    }

    return true;
  }

  isHoveredDay(day: Date): boolean {
    return this.hoveredDay ? this.hoveredDay === day && !this.isChosenDay(day) : false;
  }

  triggerAnimation(direction: string): void {
    this.animate = direction;
    setTimeout(() => this.animate = 'reset', 185);
  }

}
