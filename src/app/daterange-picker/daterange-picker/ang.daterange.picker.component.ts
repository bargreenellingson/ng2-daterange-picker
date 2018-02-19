import { Component,
  ComponentRef,
  Renderer2,
  ElementRef,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewContainerRef } from '@angular/core';
import { DatePickerComponent } from './datepicker/ang.datepicker.component';
import moment from 'moment-es6';


@Component({
  selector: 'app-daterange',
  templateUrl: './ang.daterange.picker.component.html',
  styleUrls: ['./ang.daterange.picker.component.scss']
})
export class DaterangePickerComponent implements OnInit {

  @Input() public startDate = new Date();
  @Output() public startDateChange = new EventEmitter<Date>();
  @Input() public endDate = new Date();
  @Output() public endDateChange = new EventEmitter<Date>();
  @Input() public rangeStart: Date;
  @Input() public rangeEnd: Date;
  @Input() public dateFormat = 'YYYY-MM-DD';
  @Input() ranges: Array<{dateStart: Date, dateEnd: Date, name: String}>;
  public hovering = true;
  @Input() public isValid = true;
  @Output() public isValidChange = new EventEmitter<Boolean>();
  @Input() public msg = [];
  @Output() public msgChange = new EventEmitter();
  @Output() public OnCloseCalendar = new EventEmitter();
  @Output() public OnPanelChange = new EventEmitter();
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

  constructor(_el: ElementRef) {
    this.el = _el;
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
    this.startDateChange.emit(this.startDate);
  }

  onSelectEndDate($event: any) {
    this.endDate = $event.date;
    this.endDateChange.emit(this.endDate);
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

  OnPredefinedRangeSelect($event) {
    this.startDate = $event.dateStart;
    this.endDate = $event.dateEnd;
    this.onApplySelectedDateRange();
  }

  closeCalendar() {
    this.OnCloseCalendar.emit();
  }

  onPanelChange(state) {
    this.OnPanelChange.emit(state);
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
}
