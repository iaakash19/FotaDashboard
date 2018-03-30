import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { AppService } from '../../../app.service';
import { MessageService } from "primeng/components/common/messageservice";
import { Message } from "primeng/primeng";

@Component({
  selector: "app-display-report",
  templateUrl: "./display-report.component.html",
  styleUrls: ["./display-report.component.scss"],
  providers: [MessageService]
})
export class DisplayReportComponent implements OnInit, OnChanges {
  display_report;
  total_count;
  rangeDates: Date[];
  type = "display";
  msgs: Message[] = [];
  filters: any = {};
  currentPage: any;
  hookedState: any = {
    one: null,
    two: null,
    three: null,
    four: null,
    five: null
  };

  constructor(
    private AppService: AppService,
    private messageService: MessageService
  ) {}

  @Input() tabChanged;

  ClearDates() {
    this.AppService.getDisplayReport(1).subscribe((data: any) => {
      this.display_report = data.results;
      this.total_count = data.count;
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  ngOnChanges(value) {
    if (value.tabChanged.currentValue) {
       debugger;
      this.clearAll();
    }
  }

  onDateSelect(event) {
    if (this.rangeDates[0] && this.rangeDates[1]) {
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
        this.display_report = data;
        this.total_count = this.display_report.length;
        this.messageService.add({
          severity: "success",
          summary: "Message",
          detail: "Rows Filtered"
        });
      });
    }
  }

  paginate(event) {
    this.fetchData(event.page + 1);
  }

  triggerFilter(event, key) {
    let value = event.target.value;
    if (value == "") {
      delete this.filters[key];
    } else {
      var found;

      if (Object.keys(this.filters).length == 0) {
        let filter = {
          [key]: event.target.value
        };
        this.filters[key] = event.target.value;
      } else {
        Object.keys(this.filters).map(item => {
          if (item == key) {
            this.filters[key] = event.target.value;
            found = true;
            return;
          }
        });
        if (!found) {
          this.filters[key] = event.target.value;
        }
      }
    }
    console.log("filter here", this.filters);
  }

  triggerSearch() {
    console.log("filters", this.filters);
    this.fetchData(this.currentPage, this.filters);
  }

  // fetchData(page = 1, filters?) {
  //   this.AppService.getActivationReport(page, filters).subscribe(
  //     (data: any) => {
  //       // debugger;
  //       this.activation_report = data.results;
  //       this.total_count = data.count;
  //     })
  // }

  fetchData(page = 1, filters?) {
    this.AppService.getDisplayReport(page, filters).subscribe((data: any) => {
      this.display_report = data.results;
      this.total_count = data.count;
    });
  }

  clearAll() {
    this.filters = {};
    this.hookedState = {
      one: null,
      two: null,
      three: null,
      four: null,
      five: null
    };
    this.fetchData(this.currentPage);
  }

  downloadFile(data) {
    window.open(data);
  }

  triggerExport() {
    this.AppService.getDisplayCsv().subscribe((data: any) => {
      this.downloadFile(data.url);
    });
  }
}
