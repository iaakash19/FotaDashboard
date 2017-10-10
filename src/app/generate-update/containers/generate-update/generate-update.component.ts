import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AppService } from "./../../../app.service";

@Component({
  selector: "app-generate-update",
  templateUrl: "./generate-update.component.html",
  styleUrls: ["./generate-update.component.scss"]
})
export class GenerateUpdateComponent implements OnInit {
  partners: any;
  devices: any;
  models: any;
  isDeviceModel:boolean = false;
  generateUpdate: FormGroup;
  updates:any;

  constructor(private fb: FormBuilder, private AppService: AppService) {}

  ngOnInit() {
    this.fetchPartners();
    this.fetchDeviceType();
    this.fetchAllUpdates();

    this.generateUpdate = this.fb.group({
      partnerName: ["", Validators.required],
      UpdateName: ["", Validators.required],
      AvailVersion: ["", Validators.required],
      BaseVersion: ["", Validators.required],
      ChangeLog: ["", Validators.required],
      DeviceType: ["", Validators.required],
      DeviceModel: ["", Validators.required],
      KeyHighLights: ["", Validators.required],
      File: this.fb.control("", Validators.required)
    });

    this.generateUpdate.get("partnerName").valueChanges.subscribe(data => {
      this.fetchDeviceModel(data);
      this.isDeviceModel = true;
    });
  }

  fetchPartners() {
    this.AppService.getPartners().subscribe((data: any) => {
      this.partners = data.map(obj => {
        return {
          label: obj.partnerName,
          value: obj.partnerName
        };
      });
      this.partners.unshift({
        label: "Select Partner",
        value: null
      });
    });
  }

  onBasicUpload(event) {
    this.generateUpdate.get("File").setValue(event.files[0]);
  }

  fetchDeviceModel(partner) {
    this.AppService.getDeviceModel(partner).subscribe((data: any) => {

      this.models = data.map(item => {
        return {
          label: item.DeviceModel,
          value: item.DeviceModel
        };
      });

      this.models.unshift({
        label: 'Please Select Device Model',
        value: null
      })
    });
  }

  fetchDeviceType() {
    this.AppService.getDeviceType().subscribe((data: any) => {
      this.devices = data.map(item => {
        return {
          label: item,
          value: item
        };
      });

      this.devices.unshift({
        label: "Select Device",
        value: null
      });
    });
  }

  fetchAllUpdates() {
    this.AppService.fetchUpdates().subscribe(data => {
      this.updates = data;
    })
  }

  OnGenerateUpdate() {
    this.generateUpdate.value;
    this.AppService
      .generateUpdate(this.generateUpdate.value)
      .subscribe(data => {
      });
  }
}
