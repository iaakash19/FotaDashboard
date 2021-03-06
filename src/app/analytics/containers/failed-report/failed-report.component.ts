import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { MessageService } from "primeng/components/common/messageservice";
import { Message } from "primeng/primeng";

@Component({
  selector: 'app-failed-report',
  templateUrl: './failed-report.component.html',
  styleUrls: ['./failed-report.component.scss'],
  providers: [MessageService]
  
})
export class FailedReportComponent implements OnInit {

  failed_report:any;
  total_count;
  rangeDates: Date[];
  type = 'failedReport';
  msgs: Message[] = [];
  constructor(private AppService:AppService, private messageService: MessageService) { }

  ClearDates() {
    this.AppService.getFailedReport().subscribe(data => {
      this.failed_report = data;
      this.total_count = this.failed_report.length;
    })
  }

  ngOnInit() {
    this.AppService.getFailedReport().subscribe(data => {
      this.failed_report = data;
      this.total_count = this.failed_report.length;
    })
  }

  onDateSelect(event) {
    if(this.rangeDates[0] && this.rangeDates[1] ) {
      var fromDate = new Date(this.rangeDates[0]);
      
      var year1 = fromDate.getFullYear();
      var month1 = fromDate.getMonth();
      var date1 = fromDate.getDate();

      var toDate = new Date(this.rangeDates[1]);
      
      var year2 = toDate.getFullYear();
      var month2 = toDate.getMonth();
      var date2 = toDate.getDate();
      
      const from = `${year1}-${month1}-${date1}`;
      const to = `${year2}-${month2}-${date2}`;

      this.AppService.filterRowsByDate(from, to, this.type).subscribe(data => {
        this.failed_report = data;
        this.total_count = this.failed_report.length;
        this.messageService.add({
          severity: "success",
          summary: "Message",
          detail: "Rows Filtered"
        });
      })
    }
  }

}
