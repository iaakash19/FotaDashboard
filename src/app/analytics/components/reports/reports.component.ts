import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"]
})
export class ReportsComponent implements OnInit {
  constructor() {}
  tabChanged = false;
  ngOnInit() {}

  handleChange(event) {
    debugger;
    this.tabChanged = !this.tabChanged;
  }
}
