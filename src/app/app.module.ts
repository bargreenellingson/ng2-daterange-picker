import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DaterangePickerModule } from './daterange-picker/daterange.picker.module';
import { MatInputModule, MatCardModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DaterangePickerModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
