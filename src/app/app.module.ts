import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpInterceptorService } from "./app.http_interceptor";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes.module';
import { AppService } from './app.service';
import { ChartModule } from 'angular2-highcharts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LocalStorageModule } from "angular-2-local-storage";

import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';

declare var require: any;
export function highchartsFactory() {
    const hc = require('highcharts/highstock');
    const dd = require('highcharts/modules/exporting');
    dd(hc);
    return hc;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ChartModule,
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
    multi: true
  },
  {
		provide: HighchartsStatic,
		useFactory: highchartsFactory
	}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
