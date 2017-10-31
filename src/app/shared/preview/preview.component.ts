import { AppService } from './../../app.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  constructor(
    private AppService: AppService
  ) { }
  
  @Input()
    dataWrap:any;
  
  

  @Output()
    onClose: EventEmitter<any> = new EventEmitter();
  
  @Output()
    onSave: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    
  }

  actionTriggered(type) {
    this.AppService.setBodyMask(false);
    type == 'close' ? this.onClose.emit(true) : this.onSave.emit(true);
  }

}
