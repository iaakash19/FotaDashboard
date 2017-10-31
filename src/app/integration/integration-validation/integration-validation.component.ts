import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {Message} from 'primeng/primeng';
import {MessageService} from 'primeng/components/common/messageservice';
import { AppService } from '../../app.service';
import { ConfirmationService } from 'primeng/primeng';
@Component({
  selector: 'app-integration-validation',
  templateUrl: './integration-validation.component.html',
  styleUrls: ['./integration-validation.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class IntegrationValidationComponent implements OnInit {
  IMEI_details = null;
  showIMEIcheck: boolean = false;
  testUpdate: FormGroup;
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
  
  constructor(private confirmationService: ConfirmationService, private fb: FormBuilder, private AppService: AppService, private messageService: MessageService) {}

  ngOnInit() {
    this.fetchPartners();

    this.testUpdate = this.fb.group({
      partnerName: ['', Validators.required],
      DeviceModel: ['', Validators.required],
      CurrentBuildVersion: ['', Validators.required],
      UpdateName: ['', Validators.required],
      IMEI: ['', Validators.required]
    });
    
    this.testUpdate.get('IMEI').valueChanges.subscribe(data => {
      if(data) {
        data.length == 15 ? this.fetchIMEIDetails() : this.IMEI_details = null;        
      }else {
        this.IMEI_details = null;
      }
    })
  
    this.testUpdate.get("partnerName").valueChanges.subscribe(partner => {
      if(partner) {
        this.fetchDeviceModel(partner);        
      }

    });

    this.testUpdate.get("DeviceModel").valueChanges.subscribe(model => {
      if(model) {
        this.fetchCurrentBuild(model);        
      }

    });

    this.testUpdate.get("CurrentBuildVersion").valueChanges.subscribe(currentVersion => {
      if(currentVersion) {
        this.fetchUpdateAvailable(currentVersion);        
      }

    });

  }

  fetchCurrentBuild(model) {
    this.AppService.getCurrentBuild(this.testUpdate.value.partnerName, model).subscribe((currentBuild:any) => {

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
    this.AppService.getUpdatesAvailable(this.testUpdate.value.partnerName, this.testUpdate.value.DeviceModel, currentVersion, 'Test').subscribe((updates:any) => {

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
  fetchIMEIDetails() {
    this.AppService.getdetailsByIMEI1(this.testUpdate.get('IMEI').value)
      .subscribe((data:any) => {
        this.IMEI_details = data.results[0];
      })
  }
  testUpdates() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.isLoading = true;
        this.testUpdate.value;
        this.AppService.pushUpdate(this.testUpdate.value, 'Test').subscribe(data => {
          this.testUpdate.reset();
          this.isLoading = false;
          this.IMEI_details = null;
          this.messageService.add({severity:'success', summary:'Message', detail:'Success'});
        },
      err => {
        const errMsg = JSON.parse(err.error).err_msg;
        this.isLoading = false;
        this.messageService.add({severity:'error', summary:'Message', detail:errMsg});
  
      }
      )
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });

   
  }

  deleteIMEI(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.isLoading = true;
        this.AppService.deleteIMEI(id).subscribe(data => {
          
          this.isLoading = false;
          this.IMEI_details = null;
          this.testUpdate.get('IMEI').setValue('');
          this.messageService.add({severity:'success', summary:'Message', detail:'Success!!'});
        },
      err => {
        this.isLoading = false;
        this.messageService.add({severity:'error', summary:'Message', detail:'Failed!!'});
      }
      )
      },
      reject: () => {
          this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
  });
   
  }

}
