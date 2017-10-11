import { GenerateUpdateModule } from './../generate-update/generate-update.module';
import { ModelRegModule } from './../model-reg/model-reg.module';
import { OemRegModule } from './../oem-reg/oem-reg.module';
import { HomeModule } from './../home/home.module';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    OemRegModule,
    ModelRegModule,
    GenerateUpdateModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }

