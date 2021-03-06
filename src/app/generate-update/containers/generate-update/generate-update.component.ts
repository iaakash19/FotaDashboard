import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from "./../../../app.service";
import { Message } from "primeng/primeng";
import { MessageService } from "primeng/components/common/messageservice";
import { ConfirmationService } from "primeng/primeng";
@Component({
  selector: "app-generate-update",
  templateUrl: "./generate-update.component.html",
  styleUrls: ["./generate-update.component.scss"],
  providers: [MessageService, ConfirmationService]
})
export class GenerateUpdateComponent implements OnInit {
  partners: any;
  devices: any;
  models: any;
  isDeviceModel: boolean = false;
  generateUpdate: FormGroup;
  updates: any;
  msgs: Message[] = [];
  isLoading: boolean = false;
  isCurrentBuild: boolean = false;
  baseVersions: any = [];
  isPreview: boolean = false;
  file: any = null;
  u_date: Date;
  isLoadingComp: boolean = false;
  fileUploaded: boolean = false;
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

  modes = [
    {
      label: "Select Mode",
      value: null
    },
    {
      label: "Test",
      value: "Test"
    },
    {
      label: "Production",
      value: "Production"
    }
  ];

  previewConf: any = {
    "Partner Name": null,
    "Device Type": null,
    "Device Model": null,
    "Base Version": null,
    File: this.file,
    "Available Version": null,
    "Update Name": null,
    "Key HighLights": null,
    "Update For": null
  };

  constructor(
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private AppService: AppService,
    private messageService: MessageService
  ) {}

  @ViewChild("logo") logo;

  ngOnInit() {
    this.fetchPartners();
    this.fetchDeviceType();
    this.fetchAllUpdates();

    this.generateUpdate = this.fb.group({
      partnerName: ["", Validators.required],
      BaseVersion: ["", Validators.required],
      UpdateName: ["", Validators.required],
      AvailVersion: ["", Validators.required],
      DeviceType: ["", Validators.required],

      UpdateType: ["", Validators.required],
      DeviceModel: ["", Validators.required],
     KeyHighLights: ["", Validators.required],
      DownloadUrl: this.fb.control(""),
      DownloadSize: this.fb.control(""),
      Md5: this.fb.control("")
    });

    this.generateUpdate.get("partnerName").valueChanges.subscribe(data => {
      if (data) {
        this.fetchDeviceModel(data);
        this.isDeviceModel = true;
      }
    });
    this.generateUpdate.get("DeviceModel").valueChanges.subscribe(data => {
      if (data) {
        this.fetchCurrentBuild(data);
      }
    });
  }

  fetchCurrentBuild(model) {
    this.baseVersions = [];
    this.AppService.getCurrentBuild(
      this.generateUpdate.value.partnerName,
      model
    ).subscribe((data: any) => {
      this.baseVersions = data.map(item => {
        return {
          label: item,
          value: item
        };
      });
      this.baseVersions.unshift({
        label: "Select Base Versions",
        value: null
      });

      this.isCurrentBuild = true;
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
    this.isLoadingComp = true;

    this.file = event.files[0];
    let data = {
      File: this.file
    };

    this.AppService.uploadfile(data).subscribe((data: any) => {
      this.isLoadingComp = false;
      this.fileUploaded = true;
      this.generateUpdate.get("DownloadUrl").setValue(data.DownloadUrl);
      this.generateUpdate.get("DownloadSize").setValue(data.DownloadSize);
      this.generateUpdate.get("Md5").setValue(data.Md5);

    });
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
        label: "Please Select Device Model",
        value: null
      });
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
    });
  }
  deleteUpdate(id) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to proceed?",
      header: "Confirmation",
      icon: "fa fa-question-circle",
      accept: () => {
        this.isLoading = true;
        this.AppService.deleteUpdate(id).subscribe(
          data => {
            this.fetchAllUpdates();
            this.isLoading = false;
            this.messageService.add({
              severity: "success",
              summary: "Message",
              detail: "Update Succesfully Deleted"
            });
          },
          err => {
            const errMsg = JSON.parse(err.error).err_msg;
            this.isLoading = false;
            this.messageService.add({
              severity: "error",
              summary: "Message",
              detail: errMsg
            });
          }
        );
      },
      reject: () => {
        this.msgs = [
          { severity: "info", summary: "Rejected", detail: "You have rejected" }
        ];
      }
    });
  }

  curatePreviewConf() {
    this.generateUpdate.value;
    debugger;
    this.previewConf = {
      "Partner Name": this.generateUpdate.get("partnerName").value,
      "Device Type": this.generateUpdate.get("DeviceType").value,
      "Device Model": this.generateUpdate.get("DeviceModel").value,
      "Base Version": this.generateUpdate.get("BaseVersion").value,
      "Available Version": this.generateUpdate.get("AvailVersion").value,
      "Update Name": this.generateUpdate.get("UpdateName").value,
      "Key HighLights": this.generateUpdate.get("KeyHighLights").value,
      "Update Type": this.generateUpdate.get("UpdateType").value,
      'DownloadUrl': this.generateUpdate.get("DownloadUrl").value,
      'DownloadSize': this.generateUpdate.get("DownloadSize").value,
      'Md5': this.generateUpdate.get("Md5").value,
    };

    this.isPreview = true;
    this.AppService.setBodyMask(true);
  }

  handleClose() {
    this.isPreview = false;
  }
  handleSave() {
    this.isLoading = true;
    this.isPreview = false;

    this.AppService.generateUpdate(
      this.generateUpdate.value
    ).subscribe(
      data => {
        this.fetchAllUpdates();

        this.isLoading = false;

        this.generateUpdate.reset();
        this.logo.clear();

        this.isDeviceModel = false;
        this.isCurrentBuild = false;

        this.messageService.add({
          severity: "success",
          summary: "Message",
          detail: "Update Succesfully generated"
        });
      },
      err => {
        this.isLoading = false;
        this.messageService.add({
          severity: "error",
          summary: "Message",
          detail: "Error generating update"
        });
      }
    );
  }

  OnGenerateUpdate() {
    this.curatePreviewConf();
  }

  onDateSelect(event) {
    var date = new Date(this.u_date);

    var year1 = date.getFullYear();
    var month1 = date.getMonth();
    var date1 = date.getDate();

    const dateFilter = `${year1}-${month1}-${date1}`;

    this.AppService.filtergeUpdateByDate(dateFilter).subscribe(data => {
      this.updates = data;
    });
  }

  ClearDates() {
    this.fetchAllUpdates();
  }
}
