import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {

  @Input() data;


  @Input() set type(data) {
    if (data) {
      this.tableType = data;
    }
  }

  @Output() action: EventEmitter<any> = new EventEmitter();

  tableType;
  cols = [];
  rows;
  status;

  objMapper = {
    "partnerName": "Partner Name",
    "DeviceModel": "Device Model",
    "UpdateName": "Update Name",
    "BaseVersion": "Base Version",
    "AvailVersion": "Avail Version",
    "Date": "Date",
    "id": "id"
  }

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(data) {
    if (data.data && data.data.currentValue) {
      this.rows = data.data.currentValue;

      this.cols = [];
      this.CurateCols();
    }

  }
  CurateCols() {
    if (this.rows.length > 0) {
      Object.keys(this.rows[0]).map(key => {
        this.cols.push(key);
      });

      // this.cols = this.cols.filter(col => {
      //   console.log('col:::', col);
      //   if(col !== 'id') {
      //     return {
      //       label: this.objMapper[col],
      //       value: col
      //     }
      //   }else {
      //     return;
      //   }
      // });

      this.cols = this.cols.filter(col => {
        return (col !== 'BuildStatus' && col !== 'id')
      }).map(col => {
        console.log('col:::', col);
        return {
          label: this.objMapper[col],
          value: col
        }
      })

      console.log('this.cols:::', this.cols);
    }
  }


  actionButtonClick(type, id) {
    const data = {
      type, id
    }
    this.action.emit(data);
  }

}
