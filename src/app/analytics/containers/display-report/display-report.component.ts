import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-display-report',
  templateUrl: './display-report.component.html',
  styleUrls: ['./display-report.component.scss']
})
export class DisplayReportComponent implements OnInit {
  display_report;

  constructor(
    private AppService: AppService
  ) { }

  ngOnInit() {
    this.AppService.getDisplayReport().subscribe(data => {
      this.display_report = data;
    })
  }

}
