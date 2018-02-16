import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
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
export class DaterangePickerModule { }
