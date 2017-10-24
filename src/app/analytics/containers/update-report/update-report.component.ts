import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-update-report',
  templateUrl: './update-report.component.html',
  styleUrls: ['./update-report.component.scss']
})
export class UpdateReportComponent implements OnInit {
  update_report:any;
  total_count: any;

  constructor(
    private AppService:AppService
  ) { }

  ngOnInit() {
    this.AppService.getUpdateReport().subscribe(data => {
      this.update_report = data;
      this.total_count = this.update_report.length;
    })
  }

}
