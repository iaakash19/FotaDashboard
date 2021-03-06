import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() set statuses(data) {

      this.status = data;
      if(this.status) {
        this.status.unshift({
          label: 'Select Status',
          value: null
        })
      }

  }
  selected_status;

  @Input() set type(data) {
    if(data) {
      this.tableType = data;
    }
  }

  @Output() newIMEI: EventEmitter<any> = new EventEmitter();
  @Output() statusChange: EventEmitter<any> = new EventEmitter();
  cols = [];
  rows;
  status;
  tableType;

   objMapper = {
    "partnerName" : "Partner Name",
     "DeviceModel": "Device Model",
     "UpdateName": "Update Name",
     "BaseVersion": "Base Version",
     "AvailVersion": "Avail Version",
     "BuildStatus": "Build Status",
     "Tests": "Tests",
     "id": "id"
  }
  @Output() testClick: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(data) {
    if (data.data && data.data.currentValue) {
      this.rows = data.data.currentValue;
      console.log('this.rows:::', this.rows);
      this.cols = [];
      this.CurateCols();
    }

  }
  CurateCols() {
    if (this.rows.length > 0) {
      Object.keys(this.rows[0]).map(key => {
        this.cols.push(key);
      });

      this.cols = this.cols.filter(col => {
        return (col !== 'id' && col !== 'BuildStatus')
      })
      .map(col => {
        return {
          label: this.objMapper[col],
          value: col
        }
      });
      console.log('this.cols:::', this.cols);
    }
  }

  onTextClick(testid, rowId) {
    const obj = {
      testId: testid,
      rowId: rowId
    }
    this.testClick.emit(obj);
  }

  newImei(rowId) {
    this.newIMEI.emit(rowId);
  }

  Ondelete(rowId) {
    this.delete.emit(rowId);
  }
  onStatusChange(event, rowId) {
    if(event.value) {
      this.statusChange.emit({ rowId, status: event.value });
    }
  }

  handleOnHide(event) {
    this.selected_status = null;
  }

}
