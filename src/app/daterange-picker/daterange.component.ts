import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { DaterangePickerComponent } from './daterange-picker/ang.daterange.picker.component';

@Component({
  selector: 'app-daterange',
  templateUrl: './daterange.component.html',
  styleUrls: ['./daterange.component.scss']
})
export class DaterangeComponent implements OnInit {

  @Input() public get startDate() {
    return this._startDate;
  }
  public set startDate(val) {
    this._startDate = val;
    this.runDateTest();
  }
  @Input() public get endDate() {
    return this._endDate;
  }
  public set endDate(val) {
    this._endDate = val;
    this.runDateTest();
  }
  private _endDate = new Date();
  private _startDate = new Date();
  @Input() public rangeStart: Date;
  @Input() public rangeEnd: Date;
  @Input() public dateFormat = 'YYYY-MM-DD';
  @Input() ranges: Array<{dateStart: Date, dateEnd: Date, name: String}>;
  @Input() public isValid = true;
  @Input() public msg = [];
  @Output() OnSelectedDaterange: EventEmitter<any> = new EventEmitter<any>();
  public isCalendarOpen = false;
  public isMouseInElement = true;

  clickListener: Function;

  constructor(private renderer: Renderer2) {
    this.clickListener = renderer.listen(
      'document',
      'click',
      (event: MouseEvent) => this.handleGlobalClick(event)
    );
  }

  ngOnInit() {
  }

  @Input() public dateTest = function(datestart, dateend) {
      return [];
  };

  toggleCalendar() {
    this.isCalendarOpen = !this.isCalendarOpen;
  }

  openCalendar() {
    this.isMouseInElement = true;
    this.isCalendarOpen = true;
  }

  closeCalendar() {
    this.isCalendarOpen = false;
  }

  onMouseLeave() {
    this.isMouseInElement = false;
  }

  onMouseEnter() {
    this.isMouseInElement = true;
  }

  // Not working for some reason
  handleGlobalClick(event: MouseEvent): void {
    if (!(this.isMouseInElement)) {
      this.closeCalendar();
    }
  }

  public onApply() {
    this.closeCalendar();
    this.OnSelectedDaterange.emit({startDate: this.startDate, endDate: this.endDate});
  }

  private runDateTest() {
    if (this.dateTest) {
      const testResult = this.dateTest(this.startDate, this.endDate);
      if (testResult.length > 0) {
        this.isValid = false;
        this.msg = testResult;
      } else {
        this.msg = [];
        this.isValid = true;
      }
    }
  }

}
