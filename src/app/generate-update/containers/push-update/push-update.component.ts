import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "../../../app.service";
import {Message} from 'primeng/primeng';
import {MessageService} from 'primeng/components/common/messageservice';
@Component({
  selector: "app-push-update",
  templateUrl: "./push-update.component.html",
  styleUrls: ["./push-update.component.scss"],
  providers: [MessageService]
})
export class PushUpdateComponent implements OnInit {

  pushUpdate: FormGroup;
  partners:any;
  models:any;
  currentVersions:any;
  updates:any;
  isLoading: boolean = false;
  isDeviceModel: boolean = false;
  isCurrentBuild: boolean = false;
  isUpdate: boolean = false;
  optionsPanel:any;
  msgs: Message[] = [];
  
  constructor(private fb: FormBuilder, private AppService: AppService, private messageService: MessageService) {}

  ngOnInit() {
    this.fetchPartners();


    this.pushUpdate = this.fb.group({
      partnerName: ['', Validators.required],
      DeviceModel: ['', Validators.required],
      CurrentBuildVersion: ['', Validators.required],
      UpdateName: ['', Validators.required]
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
          label: item,
          value: item
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
    this.isLoading = true;
      this.pushUpdate.value;
      this.AppService.pushUpdate(this.pushUpdate.value).subscribe(data => {
        this.isLoading = false;
        this.messageService.add({severity:'success', summary:'Message', detail:'Update Pushed to Production'});
      },
    err => {
      this.isLoading = false;
      this.messageService.add({severity:'error', summary:'Message', detail:'Update Push Failed!!'});

    }
    )
  }
}

