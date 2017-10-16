import { HomeRoutingModule } from './home.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ChartModule } from 'angular2-highcharts';

@NgModule({
  imports: [
    ChartModule,
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
