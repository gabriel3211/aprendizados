import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HotObservableSubjectComponent } from './hot-observable-subject/hot-observable-subject.component';

@NgModule({
  declarations: [
    AppComponent,
    HotObservableSubjectComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
