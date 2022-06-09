import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomCalendarComponent } from './custom-calendar/custom-calendar.component';
import { WeekPipe } from './week.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CustomCalendarComponent,
    WeekPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
