import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-predefined-range',
  templateUrl: './predefined-range.component.html',
  styleUrls: ['./predefined-range.component.scss']
})
export class PredefinedRangeComponent implements OnInit {
  @Input() ranges: Array<{dateStart: Date, dateEnd: Date, name: String}>;
  @Output() OnRangeSelect = new EventEmitter<{dateStart: Date, dateEnd: Date, name: String}>();
  constructor() { }

  ngOnInit() {
  }
  emitDate(range) {
    this.OnRangeSelect.emit(range);
  }

}
