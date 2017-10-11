import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpInterceptorService } from "./app.http_interceptor";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes.module';
import { AppService } from './app.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { LocalStorageModule } from "angular-2-local-storage";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LocalStorageModule.withConfig({
      storageType: "localStorage"
    }),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AppService, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
