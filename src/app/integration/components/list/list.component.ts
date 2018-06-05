import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {

  @Input() data;

  cols = [];
  rows;

   objMapper = {
    "partnerName" : "Partner Name",
     "DeviceModel": "Device Model",
     "UpdateName": "Update Name",
     "BaseVersion": "Base Version",
     "AvailVersion": "Avail Version",
     "BuildStatus": "Build Status",
     "Tests": "Tests"
  }
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(data) {
    if (data.data.currentValue) {
      this.rows = data.data.currentValue;
      this.CurateCols();
    }

  }
  CurateCols() {
    if (this.rows.length > 0) {
      Object.keys(this.rows[0]).map(key => {
        this.cols.push(key);
      });

      this.cols = this.cols.map(col => {
        return {
          label: this.objMapper[col],
          value: col
        }
      });

      console.log('this.cols:::', this.cols);

    }

  }

}
