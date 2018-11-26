import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { app_routing } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';
import { MediaComponent } from './components/media/media.component';

const modules = [
	FormsModule,
	ReactiveFormsModule,
	BrowserModule,
	app_routing
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MediaComponent
  ],
  imports: [
	  ...modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
