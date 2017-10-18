import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-activation-report',
  templateUrl: './activation-report.component.html',
  styleUrls: ['./activation-report.component.scss']
})
export class ActivationReportComponent implements OnInit {
  activation_report:any;

  constructor(
    private AppService:AppService
  ) { }

  ngOnInit() {
    this.AppService.getActivationReport().subscribe(data => {
      this.activation_report = data;
    })
  }

}
