import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "../../../app.service";

@Component({
  selector: "app-push-update",
  templateUrl: "./push-update.component.html",
  styleUrls: ["./push-update.component.scss"]
})
export class PushUpdateComponent implements OnInit {
  pushUpdate: FormGroup;
  partners:any;
  models:any;
  currentVersions:any;
  updates:any;

  isDeviceModel: boolean = false;
  isCurrentBuild: boolean = false;
  isUpdate: boolean = false;

  constructor(private fb: FormBuilder, private AppService: AppService) {}

  ngOnInit() {
    this.fetchPartners();


    this.pushUpdate = this.fb.group({
      partnerName: ['', Validators.required],
      DeviceModel: ['', Validators.required],
      CurrentBuildVersion: ['', Validators.required],
      UpdateName: ['', Validators.required],
      // IMEI1: ['', Validators.required]
    });

    this.pushUpdate.get("partnerName").valueChanges.subscribe(partner => {
      this.fetchDeviceModel(partner);

    });

    this.pushUpdate.get("DeviceModel").valueChanges.subscribe(model => {
      this.fetchCurrentBuild(model);

    });

    this.pushUpdate.get("CurrentBuildVersion").valueChanges.subscribe(currentVersion => {
      this.fetchUpdateAvailable(currentVersion);

    });

  }

  fetchCurrentBuild(model) {
    this.AppService.getCurrentBuild(this.pushUpdate.value.partnerName, model).subscribe((currentBuild:any) => {

      this.currentVersions = currentBuild.map(item => {
        return {
          label: item.BaseVersion,
          value: item.BaseVersion
        }
      });
      this.currentVersions.unshift({
        label: 'Select Base Versions',
        value: null
       });

       this.isCurrentBuild = true;

    })
  }

  fetchUpdateAvailable(currentVersion) {
    this.AppService.getUpdatesAvailable(this.pushUpdate.value.partnerName, this.pushUpdate.value.DeviceModel, currentVersion).subscribe((updates:any) => {

            this.updates = updates.map(item => {
              return {
                label: item.UpdateName,
                value: item.UpdateName
              }
            });
            this.updates.unshift({
              label: 'Select Updates',
              value: null
             });

             this.isUpdate = true;

          })
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
        label: 'Select Model',
        value: null
       });

       this.isDeviceModel = true;

    })
  }


  fetchPartners() {
    this.AppService.getPartners().subscribe((data:any) => {
     this.partners = data.map(obj => {
        return {
          label: obj.partnerName,
          value: obj.partnerName
        }
     });
     this.partners.unshift({
      label: 'Select Partner',
      value: null
     })

    })
  }


  onPushUpdate() {

  }
}
