import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiLibModule } from '@technest/api-lib';
import { SecurityModule } from '@technest/security';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    SecurityModule.forRoot(environment.clientID),
    ApiLibModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
