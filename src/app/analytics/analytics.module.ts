import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './components/reports/reports.component';
import { DisplayReportComponent } from './containers/display-report/display-report.component';
import { UpdateReportComponent } from './containers/update-report/update-report.component';
import { ActivationReportComponent } from './containers/activation-report/activation-report.component';
import { FailedReportComponent } from './containers/failed-report/failed-report.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DeletedReportComponent } from './containers/deleted-report/deleted-report.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [ReportsComponent, DisplayReportComponent, UpdateReportComponent, ActivationReportComponent, FailedReportComponent, DeletedReportComponent]
})
export class AnalyticsModule { }
