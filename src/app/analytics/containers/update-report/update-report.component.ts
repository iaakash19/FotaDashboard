import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { AppService } from '../../../app.service';
import { MessageService } from "primeng/components/common/messageservice";
import { Message } from "primeng/primeng";
@Component({
  selector: "app-update-report",
  templateUrl: "./update-report.component.html",
  styleUrls: ["./update-report.component.scss"],
  providers: [MessageService]
})
export class UpdateReportComponent implements OnInit, OnChanges {
  update_report: any;
  total_count: any;
  rangeDates: Date[];
  type = "updateReport";
  msgs: Message[] = [];

  filters: any = {};
  currentPage: any;
  hookedState = {
    one: null,
    two: null,
    three: null,
    four: null,
    five: null
  };
  dataLoaded;
  constructor(
    private AppService: AppService,
    private messageService: MessageService
  ) {}

  @Input() tabChanged;

  ClearDates() {
    this.AppService.getUpdateReport(1).subscribe(data => {
      this.update_report = data;
      this.total_count = this.update_report.length;
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  ngOnChanges(value) {
    if (value.tabChanged.currentValue) {
      this.clearAll();
      this.dataLoaded = false;
      this.fetchData();
      setTimeout(() => {
        this.dataLoaded = true;
      }, 10);
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
        this.update_report = data;
        this.total_count = this.update_report.length;
        this.messageService.add({
          severity: "success",
          summary: "Message",
          detail: "Rows Filtered"
        });
      });
    }
  }

  fetchData(page = 1, filters?) {
    this.AppService.getUpdateReport(page, filters).subscribe((data: any) => {
      this.dataLoaded = true;
      this.update_report = data.results;
      this.total_count = data.count;
      debugger;
    });
  }
  paginate(event) {
    this.dataLoaded = false;
    this.fetchData(event.page + 1, this.filters);

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
  }

  triggerSearch() {
    console.log("filters", this.filters);
    this.currentPage = 1;
    this.fetchData(this.currentPage, this.filters);
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
    this.dataLoaded = false;
    setTimeout(() => {
      this.dataLoaded = true;
    }, 100);
    this.fetchData(this.currentPage);
  }

  downloadFile(data) {
    window.open(data);
  }

  triggerExport() {
    this.AppService.getUpdateCsv(this.filters).subscribe((data: any) => {
      this.downloadFile(data.url);
    });
  }
}
