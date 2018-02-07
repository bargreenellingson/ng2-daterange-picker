import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MatInputModule, MatCardModule, MatFormFieldModule, MatButtonModule } from '@angular/material';


import { DaterangePickerComponent } from './ang.daterange.picker.component';
import { DatePickerComponent } from './ang.datepicker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ DaterangePickerComponent, DatePickerComponent ],
  exports: [ DaterangePickerComponent ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule  ]
})
export class DaterangePickerModule { }
