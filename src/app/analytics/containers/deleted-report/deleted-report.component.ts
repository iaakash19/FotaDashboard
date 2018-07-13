import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AppService } from '../../../app.service';
import { MessageService } from "primeng/components/common/messageservice";
import { Message } from "primeng/primeng";

@Component({
  selector: 'app-deleted-report',
  templateUrl: './deleted-report.component.html',
  styleUrls: ['./deleted-report.component.scss'],
  providers: [MessageService]

})
export class DeletedReportComponent implements OnInit {

  activation_report: any;
  total_count: number = 0;
  rangeDates: Date[];
  type = "DeletedReport";
  msgs: Message[] = [];
  filters: any = {};
  currentPage: any;
  hookedState = {
    one: null,
    two: null,
    three: null,
    four: null,
    five: null,
    six: null
  };
  dateFrom;
  dateTo;
  dataLoaded = false;
  currentRemarks = false;
  openRemarks;
  BASE_URL = ` http://fota.dynamyn.mobi/notify/fotav/`; //test

  constructor(
    private AppService: AppService,
    private messageService: MessageService
  ) { }

  @Input() tabChanged;




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

  ClearDates() {

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

      const month_from = parseInt(from.split("-")[1]);
      const month_to = parseInt(to.split("-")[1]);

      const newFrom = `${from.split("-")[0]}-${month_from + 1}-${
        from.split("-")[2]
        }`;
      const newTo = `${to.split("-")[0]}-${month_to + 1}-${to.split("-")[2]}`;

      this.filters["Date__gte"] = newFrom;
      this.filters["Date__lte"] = newTo;
    }
  }

  fetchData(page = 1, filters?) {
    this.AppService.getDeletedReport(page, filters).subscribe(
      (data: any) => {
        this.activation_report = data;
        this.total_count = data.count;
        this.dataLoaded = true;
        // debugger;
      }
    );
  }

  paginate(event) {
    this.currentPage = event.page + 1;
    this.fetchData(this.currentPage, this.filters);
  }

  triggerFilter(event, key) {
    if (key == "date") {
      if (!this.dateFrom) this.dateFrom = event;
      else {
        this.dateTo = event;
        this.onDateSelect(event);
      }
    } else {
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
  }

  triggerSearch() {
    console.log("filters", this.filters);
    this.dataLoaded = false;

    this.currentPage = 1;
    this.fetchData(this.currentPage, this.filters);
  }

  clearAll() {
    this.rangeDates = null;
    this.filters = {};
    this.hookedState = {
      one: null,
      two: null,
      three: null,
      four: null,
      five: null,
      six: null
    };
    this.dataLoaded = false;
    setTimeout(() => {
      this.dataLoaded = true;
    }, 100);
    this.currentPage = 1;
    this.fetchData(this.currentPage);
  }

  downloadFile(data) {
    window.open(data);
  }

  triggerExport() {
    window.open(`${this.BASE_URL}updatedeleted?export=true`);
    // this.AppService.getActivationCsv(this.filters).subscribe((data: any) => {
    //   this.downloadFile(data.url);
    // });
  }

  openRemarksModal(remarks) {
    this.openRemarks = true;
      this.currentRemarks = remarks;
  }

}
