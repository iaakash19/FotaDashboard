import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "../../../app.service";
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: "app-push-update",
  templateUrl: "./push-update.component.html",
  styleUrls: ["./push-update.component.scss"],
  providers: [MessageService, ConfirmationService]
})
export class PushUpdateComponent implements OnInit {

  pushUpdate: FormGroup;
  partners: any;
  models: any;
  currentVersions: any;
  updates: any;
  isLoading: boolean = false;
  isDeviceModel: boolean = false;
  isCurrentBuild: boolean = false;
  isUpdate: boolean = false;
  optionsPanel: any;
  msgs: Message[] = [];
  data;
  status = 'Active';
  openPreview = false;
  previewObj;
  editObj;
  showEdit = false;
  selectedobj;
  showDelete = false;
  dataForTable;
remarks;
  update_types = [
    {
      label: "Select Mode",
      value: null
    },
    {
      label: "Normal",
      value: "NORMAL"
    },
    {
      label: "Forced",
      value: "FORCED"
    }
  ];
  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService, private AppService: AppService, private messageService: MessageService) { }

  ngOnInit() {
    this.fetchUpdateData(this.status);

  }

  //UpdateName, partnerName, DeviceModel, BaseVersion,AvailVersion,Date, BuildStatus.
  fetchUpdateData(status) {
      this.AppService.fetchUpdateData(status).subscribe((data:any) => {
        this.data = data.map(item => {
          return {
            partnerName: item.partnerName,
            UpdateName: item.UpdateName,
            DeviceModel: item.DeviceModel,
            BaseVersion: item.BaseVersion,
            AvailVersion: item.AvailVersion,
            Date: item.Date,
            BuildStatus: item.BuildStatus,
            id: item.id,
            BuildRemarks: item.BuildRemarks,
            Md5: item.Md5,
            DownloadUrl: item.DownloadUrl,

          }
        });

        this.dataForTable = data.map(item => {
          return {
            partnerName: item.partnerName,
            UpdateName: item.UpdateName,
            DeviceModel: item.DeviceModel,
            BaseVersion: item.BaseVersion,
            AvailVersion: item.AvailVersion,
            Date: item.Date,
            BuildState: item.BuildState,
            BuildStatus: item.BuildStatus,
            id: item.id
          }
        });

       })
  }


  handleChange(event) {
    const index = event.index;
    index == 0 ? this.status = 'Active' : this.status = 'Inactive';
    this.fetchUpdateData(this.status);
  }

  openPreviewRow(data) {
    this.openPreview = true;
    this.previewObj = data;
  }

  openEditBox(data) {
    this.showEdit = true;
    this.editObj = {
      partnerName: data.partnerName,
      DeviceModel: data.DeviceModel,
      BaseVersion: data.BaseVersion,
      Date: data.Date,
      UpdateName: data.UpdateName ,
      UpdateType: data.UpdateType,
      AvailVersion: data.AvailVersion,
      id: data.id
    }
  }

  triggerEdit() {
    this.AppService.editUpdate(this.editObj.id, this.editObj).subscribe(data => {
      this.showEdit = false;
      })
  }

  openDeleteBox(data) {
    this.showDelete = true;
  }

  delete() {
    this.AppService.deleteUpdateRevised(this.selectedobj.id, this.remarks).subscribe(data => {
      this.showDelete = false;
      this.fetchUpdateData(this.status);
      if (this.status == 'Inactive') {
        this.AppService.triggerDeleteOnExpired(this.selectedobj.id).subscribe(data => {
          this.showDelete = false;
          this.fetchUpdateData(this.status);
        })
      }
    })
  }

  handlePush() {
    // partnerName: ['', Validators.required],
    //   DeviceModel: ['', Validators.required],
    //     CurrentBuildVersion: ['', Validators.required],
    //       UpdateName: ['', Validators.required]
    // this.selectedobj;
    let data = {
      partnerName: this.selectedobj.partnerName,
      DeviceModel: this.selectedobj.DeviceModel,
      BaseVersion: this.selectedobj.BaseVersion,
      UpdateName: this.selectedobj.UpdateName
    }
    this.AppService.pushUpdate(data).subscribe(res => {
      this.fetchUpdateData(this.status);
    })
  }

  triggerTestAgain() {
    this.AppService.testAgain(this.selectedobj.id).subscribe(data => {
      this.fetchUpdateData(this.status);
    })
  }

  triggerDeleteOnExpired() {
    // this.AppService.triggerDeleteOnExpired().subscribe(data => {

    // })
  }
  handleAction(data) {
    console.log('data:::', this.data); // type and id
    this.selectedobj = this.data.filter(item => item.id == data.id)[0];

    switch (data.type) {
      case 'more': {
        this.openPreviewRow(this.selectedobj);
        break;
      }
      case 'edit': {
        this.selectedobj;
        this.openEditBox(this.selectedobj);
        break;
      }
      case 'delete': {
        this.openDeleteBox(this.selectedobj);
        break;
      }
      case 'push': {
        this.handlePush();
        break;
      }
      case 'test_again': {
        this.triggerTestAgain();
        break;
      }
      case 'delete_on_expired': {
        // this.triggerDeleteOnExpired();
        this.openDeleteBox(this.selectedobj);
        break;
      }
      default:
        break;
    }
  }
}

