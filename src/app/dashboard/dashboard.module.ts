import { WikiModule } from './../wiki/wiki.module';
import { GenerateUpdateModule } from './../generate-update/generate-update.module';
import { ModelRegModule } from './../model-reg/model-reg.module';
import { OemRegModule } from './../oem-reg/oem-reg.module';
import { HomeModule } from './../home/home.module';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IntegrationModule } from '../integration/integration.module';
import { AnalyticsModule } from '../analytics/analytics.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    OemRegModule,
    ModelRegModule,
    IntegrationModule,
    GenerateUpdateModule,
    DashboardRoutingModule,
    AnalyticsModule,
    WikiModule,
    SharedModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }

