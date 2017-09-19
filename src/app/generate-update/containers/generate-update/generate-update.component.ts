import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../app.service';

@Component({
  selector: 'app-generate-update',
  templateUrl: './generate-update.component.html',
  styleUrls: ['./generate-update.component.css']
})
export class GenerateUpdateComponent implements OnInit {
  partners:any;

  generateUpdate: FormGroup;

  constructor(
    private fb: FormBuilder,
    private AppService: AppService
  ) { }

  ngOnInit() {
    this.fetchPartners();
    this.fetchDeviceModel();
    this.generateUpdate = this.fb.group({
      partnerName: [''],
      UpdateName: [''],
      AvailVersion: [''],
      BaseVersion: [''],
      ChangeLog: [''],
      DeviceType: [''],
      DeviceModel: [''],
      KeyHighLights: ['']
    })
  }

  fetchPartners() {
    this.AppService.getPartners().subscribe((data:any) => {
     this.partners = data.map(obj => {
        return {
          label: obj.partnerName,
          value: obj.partnerName
        }
     })
    })
  }

  fetchDeviceModel() {
    this.AppService.getDeviceModel().subscribe(data => {
      debugger;
    })
  }

  OnGenerateUpdate() {

    this.AppService.generateUpdate(this.generateUpdate.value).subscribe(data => {
      debugger;
    })
  }

}
