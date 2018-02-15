import { Component, ComponentRef, Renderer2, ElementRef, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { DatePickerComponent } from './datepicker/ang.datepicker.component';
import moment from 'moment-es6';

@Component({
  selector: 'app-daterange-picker',
  templateUrl: './ang.daterange.picker.component.html',
  styleUrls: ['./ang.daterange.picker.component.scss']
})
export class DaterangePickerComponent implements OnInit {

  @Input() public startDate = new Date();
  @Input() public endDate = new Date();
  @Input() public rangeStart: Date;
  @Input() public rangeEnd: Date;
  @Input() public dateFormat = 'YYYY-MM-DD';
  @Input() ranges: Array<{dateStart: Date, dateEnd: Date, name: String}>;
  public isCalendarOpen = false;
  public isValid = true;
  public msg = [];
  clickListener: Function;
  private el: ElementRef;
  get startDateText() {
    return moment(this.startDate).format(this.dateFormat);
  }
  get endDateText() {
    return moment(this.endDate).format(this.dateFormat);
  }
  private selfComponentRef: ComponentRef<any>;

  @Output() OnCloseDaterangePicker: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnSelectedDaterange: EventEmitter<any> = new EventEmitter<any>();

  constructor(_el: ElementRef, private renderer: Renderer2) {
    this.el = _el;
    this.clickListener = renderer.listen(
      'document',
      'click',
      (event: MouseEvent) => this.handleGlobalClick(event)
    );
  }

  static initWithData(_viewContainer: ViewContainerRef, _componentFactory: any): any {

    const daterangePickerComponentRef: ComponentRef<any> = _viewContainer.createComponent(_componentFactory);
    const instance: DaterangePickerComponent = daterangePickerComponentRef.instance;
    instance.setComponentRef(daterangePickerComponentRef);

    const targetLeftOffset: number = instance.getViewContainerSpaceOffset(_viewContainer, 'left');
    const targetTopOffset: number = instance.getViewContainerSpaceOffset(_viewContainer, 'top');

    instance.setStyleSpaceProperty('left', targetLeftOffset);
    const height: number = instance.getViewContainerDOMSpaceProperty(_viewContainer, 'clientHeight');
    instance.setStyleSpaceProperty('top', targetTopOffset + height + 4);

    return instance;
  }

  @Input() public dateTest = function(datestart, dateend) {
      return [];
  };

  ngOnInit() {
  }

  onSelectStartDate($event: any) {
    this.startDate = $event.date;
    this.runDateTest();
  }

  onSelectEndDate($event: any) {
    this.endDate = $event.date;
    this.runDateTest();
  }

  onApplySelectedDateRange() {
    this.OnSelectedDaterange.emit({startDate: this.startDate, endDate: this.endDate});
    this.destroyComponentRef();
    this.closeCalendar();
  }

  onCloseContextualMenu() {
    this.OnCloseDaterangePicker.emit();
    this.destroyComponentRef();
  }

  destroyComponentRef() {
    if (this.selfComponentRef) { this.selfComponentRef.destroy(); }
  }

  setComponentRef(_componentRef: ComponentRef<any>) {
    this.selfComponentRef = _componentRef;
  }

  OnPredefinedRangeSelect($event) {
    this.startDate = $event.dateStart;
    this.endDate = $event.dateEnd;
    this.onApplySelectedDateRange();
  }

  // Not working for some reason
  handleGlobalClick(event: MouseEvent): void {
    //   console.log(this.el.nativeElement);
    //   const withinElement = this.el.nativeElement.contains(event.target);
    //   if (!(withinElement)) {
    //     this.closeCalendar();
    //   }
  }


  getViewContainerDOMSpaceProperty(_viewContainer: ViewContainerRef, _property: string = ''): number {
    return parseInt(_viewContainer.element.nativeElement[_property]);
  }

  setStyleSpaceProperty(property: string = '', pixels: number = 0) {
    this.el.nativeElement.style[property] = pixels.toString() + 'px';
  }

  getViewContainerSpaceOffset(_viewContainer: ViewContainerRef, _property: string = ''): number {
    let targetMargin = _viewContainer.element.nativeElement.style['margin-' + _property];

    if (!targetMargin) {
      targetMargin = 0;
    } else {
      targetMargin = parseInt(targetMargin.replace( /^\D+/g, '')); // Remove non-number characters like 'px'
    }

    switch (_property) {
      case 'left':  return _viewContainer.element.nativeElement.offsetLeft;

      case 'top':   return _viewContainer.element.nativeElement.offsetTop;

      default:      return 0;
    }

  }
  toggleCalendar() {
    this.isCalendarOpen = !this.isCalendarOpen;
  }

  closeCalendar() {
    this.isCalendarOpen = false;
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
