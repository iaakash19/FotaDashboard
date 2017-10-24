import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-failed-report',
  templateUrl: './failed-report.component.html',
  styleUrls: ['./failed-report.component.scss']
})
export class FailedReportComponent implements OnInit {

  failed_report:any;
  total_count;
  constructor(private AppService:AppService) { }

  ngOnInit() {
    this.AppService.getFailedReport().subscribe(data => {
      this.failed_report = data;
      this.total_count = this.failed_report.length;
    })
  }

}
