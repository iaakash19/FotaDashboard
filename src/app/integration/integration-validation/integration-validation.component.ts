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
  devices:any;
  data;
  status = 'Active';
  display = false;

  testForm: FormGroup;
  isEditable = false;
  statuses;
  testObj;
  selectedRow;
  openIMEIBox = false;
  selectedIMEI;
  openRemarksModal = false;
  remarks;
rowId;
  status_selected;

  constructor(private confirmationService: ConfirmationService, private fb: FormBuilder, private AppService: AppService, private messageService: MessageService) {}

  ngOnInit() {
    this.getStatus();

    this.fetchIVData();
    this.initTestForm();

    this.fetchPartners();
    this.fetchDevicesForTable();

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

  fetchDevicesForTable() {
    this.AppService.getDevices().subscribe((data:any) =>{
      this.devices = data.results;
    })
  }

  patchRow(id) {
    this.AppService.patchDevice(id).subscribe((data: any) => {
      this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Success' });
      this.fetchDevicesForTable();
    })
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
    this.AppService.getdetailsByIMEI1(this.selectedIMEI)
      .subscribe((data:any) => {
        this.IMEI_details = data.results[0];
      })
  }
  // testUpdates() {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to proceed?',
  //     header: 'Confirmation',
  //     icon: 'fa fa-question-circle',
  //     accept: () => {
  //       this.isLoading = true;
  //       this.testUpdate.value;
  //       this.AppService.pushUpdate(this.testUpdate.value, 'Test').subscribe(data => {
  //         this.testUpdate.reset();
  //         this.isLoading = false;
  //         this.IMEI_details = null;
  //         this.messageService.add({severity:'success', summary:'Message', detail:'Success'});
  //       },
  //     err => {
  //       const errMsg = JSON.parse(err.error).err_msg;
  //       this.isLoading = false;
  //       this.messageService.add({severity:'error', summary:'Message', detail:errMsg});

  //     }
  //     )
  //     },
  //     reject: () => {
  //       this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
  //     }
  //   });


  // }

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

  handleChange(event) {
    const index = event.index;
    index == 0 ? this.status = 'Active' : this.status = 'Inactive';
    this.fetchIVData(this.status);
  }

  fetchIVData(status='Active') {
    this.AppService.getList(status).subscribe((data:any) => {
      this.data = data.map(item => {
          return {
            id: item.id,
            partnerName: item.partnerName,
            DeviceModel: item.DeviceModel,
            UpdateName: item.UpdateName,
            BaseVersion: item.BaseVersion,
            AvailVersion: item.AvailVersion,
            BuildStatus: item.BuildStatus,
            Tests: item.Tests
          }
      })
    })
  }

  handleTestClick(testObj) {
    this.testObj = testObj;
    this.AppService.getTestDetails(testObj).subscribe((data:any) => {
        // open popup with this data
        this.display = true;
        const testObj = {
          TestNo: data[0].TestNo,
          IMEI: data[0].IMEI,
          Status: data[0].Status,
          TestRemarks: data[0].TestRemarks
        }
      this.patchTestForm(testObj);
    })
  }

  initTestForm() {
    this.testForm = this.fb.group({
      TestNo: [''],
      IMEI: [''],
      Status: [''],
      TestRemarks: ['']
    })
  }

  patchTestForm(testObj) {
    this.testForm.patchValue({
      TestNo: testObj.TestNo,
      IMEI: testObj.IMEI,
      Status: testObj.Status,
      TestRemarks: testObj.TestRemarks
    })

  }

  turnOnEdit() {
    this.isEditable = true;
    this.getStatus();
  }

  getStatus() {
    this.AppService.getStatus().subscribe((data:any) => {
      this.statuses = data.map(item => {
        return {
          label: item,
          value: item
        }
      })

    })
  }

  saveTest() {
    let data = Object.assign({}, this.testForm.value, {
      uid: this.testObj.rowId
    });
    this.AppService.saveTest(this.testObj, data).subscribe(data => {
      this.display = false;
    })
  }


  handleOnImeiClick(rowId) {
    this.selectedRow = this.data.filter(item => item.id == rowId);
    this.openIMEIBox = true;
  }

  testIMEI() {

    this.fetchIMEIDetails();

    let data = {
      partnerName: this.selectedRow[0].partnerName,
      DeviceModel: this.selectedRow[0].DeviceModel,
      CurrentBuildVersion: this.selectedRow[0].BaseVersion,
      UpdateName: this.selectedRow[0].UpdateName,
      IMEI: this.selectedIMEI
    }
    this.AppService.pushUpdate(data).subscribe(data => {
      //this.openIMEIBox = false;
      this.fetchIVData(this.status);
    })
  }

  onStatusChange(data) {
    let { rowId, status } = data;
    this.rowId = rowId;
    this.status_selected = status;
    this.openRemarksModal = true;
  }

  saveRemarks() {
    this.AppService.saveRemarkss(this.rowId, this.remarks, this.status_selected).subscribe(data => {
      this.openRemarksModal = false;
      this.fetchIVData(this.status);
    })
  }
}


//Fields to display in table: partnerName, DeviceModel, UpdateName, BaseVersion,AvailVersion, BuildStatus, Tests
