import { Component, ComponentRef, ElementRef, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { DatePickerComponent } from './ang.datepicker.component';
import moment from 'moment-es6';

@Component({
  selector: 'ang-daterange-picker',
  templateUrl: './ang.daterange.picker.component.html',
  styleUrls: ['./ang.daterange.picker.component.scss']
})
export class DaterangePickerComponent implements OnInit {

  @Input() public startDate: Date;
  @Input() public endDate: Date;
  @Input() public rangeStart: Date;
  @Input() public rangeEnd: Date;
  @Input() public dateTest: any;
  @Input() public dateFormat = 'YYYY-MM-DD';
  public isValid = true;
  public msg = [];
  private el: ElementRef;
  public startDateText = '';
  public endDateText = '';
  private selfComponentRef: ComponentRef<any>;

  @Output() OnCloseDaterangePicker: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnSelectedDaterange: EventEmitter<any> = new EventEmitter<any>();

  constructor(_el: ElementRef) {
    this.el = _el;
    this.el.nativeElement.style.position = 'absolute';
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

  ngOnInit() {
    if (this.rangeStart && this.rangeEnd) {
      this.startDate = this.rangeStart;
      this.endDate = this.endDate;
    } else {
    this.startDate = new Date();
    this.endDate = new Date();
    }
    this.startDateText = moment(this.startDate).format(this.dateFormat);
    this.endDateText = moment(this.endDate).format(this.dateFormat);
  }

  onSelectStartDate($event: any) {
    this.startDate = $event.date;
    this.startDateText = $event.dateText;
    this.runDateTest();
  }

  onSelectEndDate($event: any) {
    this.endDate = $event.date;
    this.endDateText = $event.dateText;
    this.runDateTest();
  }

  onApplySelectedDateRange() {
    this.OnSelectedDaterange.emit({startDate: this.startDate, endDate: this.endDate});
    this.destroyComponentRef();
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
