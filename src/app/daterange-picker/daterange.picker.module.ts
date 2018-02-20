import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, isDevMode } from '@angular/core';
import { MatInputModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatSelectModule } from '@angular/material';


import { DaterangePickerComponent } from './daterange-picker/ang.daterange.picker.component';
import { DatePickerComponent } from './daterange-picker/datepicker/ang.datepicker.component';
import { PredefinedRangeComponent } from './predefined-range/predefined-range.component';
import { DateinputComponent } from './dateinput/dateinput.component';
import { MatIconModule } from '@angular/material/icon';
import { DaterangeComponent } from './daterange.component';

@NgModule({
  declarations: [
    DaterangePickerComponent,
    DatePickerComponent,
    PredefinedRangeComponent,
    DateinputComponent,
    DaterangeComponent
  ],
  exports: [ DaterangeComponent ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class DaterangePickerModule {
  /** Reference to the global `document` object. */
  private _document = typeof document === 'object' && document ? document : null;

  constructor () {
    this._checkThemeIsPresent();
  }
  private _checkThemeIsPresent(): void {
    if (this._document && typeof getComputedStyle === 'function') {
      const testElement = this._document.createElement('div');

      testElement.classList.add('datepicker-theme-marker');
      this._document.body.appendChild(testElement);

      const computedStyle = getComputedStyle(testElement);

      // In some situations, the computed style of the test element can be null. For example in
      // Firefox, the computed style is null if an application is running inside of a hidden iframe.
      // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
      if (computedStyle && computedStyle.display !== 'none') {
        console.warn(
          'Could not find datepicker theme. Consult the readme here: \n' +
          'https://github.com/bargreenellingson/ng2-daterange-picker/');
      }

      this._document.body.removeChild(testElement);
    }
  }
}
