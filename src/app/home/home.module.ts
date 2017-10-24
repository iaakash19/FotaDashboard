import { HomeRoutingModule } from './home.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ChartModule } from 'angular2-highcharts';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ChartModule,
    CommonModule,
    SharedModule,
    FormsModule,
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
