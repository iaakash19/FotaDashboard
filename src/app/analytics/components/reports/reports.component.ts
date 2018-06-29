import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"]
})
export class ReportsComponent implements OnInit {
  constructor() {}
  tabChanged = false;
  tab = 0;
  ngOnInit() {}

  handleChange(event) {
   this.tab = event.index;
    // this.tabChanged = !this.tabChanged;
  }
}
