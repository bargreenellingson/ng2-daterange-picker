import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DaterangePickerModule } from './daterange-picker/daterange.picker.module';
import { MatInputModule, MatCardModule, MatFormFieldModule, MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DaterangePickerModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
