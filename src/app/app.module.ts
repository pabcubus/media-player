import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from './components/components.module';

import { app_routing } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';

const modules = [
	ComponentsModule,
	FormsModule,
	ReactiveFormsModule,
	BrowserModule,
	app_routing
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
	  ...modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
