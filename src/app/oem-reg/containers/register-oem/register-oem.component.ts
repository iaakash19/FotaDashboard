import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from '../../../app.service';
import {Message} from 'primeng/primeng';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: "register-oem",
  templateUrl: "./register-oem.component.html",
  styleUrls: ["./register-oem.component.scss"],
  providers: [MessageService]
})
export class RegisterOemComponent implements OnInit {


  oemRegister: FormGroup;
  editConfigForm: FormGroup;
  partners:any;
  idOfEditedConfig:number;
  isLoading:boolean = false;
  iseditConfig: boolean = false;
  msgs: Message[] = [];
  
  optionsPanel = [
    {
      control: 'Notif_Frequency',
      label : "Notification Frequency",
      map: [
        {
          field: '1 Day',
          value: 1
        },
        {
          field: '7 Days',
          value: 7
        },
        {
          field: '14 Days',
          value: 14
        },
        {
          field: '30 Days',
          value: 30
        }
      ]
    },
    {
      control: 'checkForUpdate',
      label : "Check For Update",
      map: [
        {
          field: '1 Day',
          value: 1
        },
        {
          field: '7 Days',
          value: 7
        },
        {
          field: '14 Days',
          value: 14
        },
        {
          field: '30 Days',
          value: 30
        }
      ]
    },
    {
      control: 'downloadAutoOnWiFi',
      label : "Download on WIFI",
      map: [
        {
          field: 'Yes',
          value: 'y'
        },
        {
          field: 'No',
          value: 'n'
        }
      ]
    },

  ]

  constructor(private fb: FormBuilder, private AppService: AppService, private messageService: MessageService) {}

  ngOnInit() {

    this.fetchPartners();

    this.oemRegister = this.fb.group({
      partnerName: ["", Validators.required],
      config: this.fb.group({
        Url: ["", Validators.required],
        Notif_Frequency: ["", Validators.required],
        checkForUpdate: ["", Validators.required],
        btnName: ["", Validators.required],
        downloadAutoOnWiFi: ["", Validators.required]
      })
    });

    this.editConfigForm = this.fb.group({
      partnerName: ["", Validators.required],
      config: this.fb.group({
        Url: ["", Validators.required],
        Notif_Frequency: ["", Validators.required],
        checkForUpdate: ["", Validators.required],
        btnName: ["", Validators.required],
        downloadAutoOnWiFi: ["", Validators.required]
      })
    });
  }
fetchPartners() {
  this.AppService.getPartners().subscribe((data:any) => {
    this.partners = data;
  })
}
  registerOem() {
    this.isLoading = true;
    this.AppService.registerOem(this.oemRegister.value).subscribe(
      data => {
        this.fetchPartners();
        this.oemRegister.reset();
        this.isLoading = false;
        this.messageService.add({severity:'success', summary:'Message', detail:'OEM Succesfully registered'});
      },
      err => {
        this.isLoading = false;
        this.messageService.add({severity:'error', summary:'Message', detail:'OEM Registration Failed!!'});
      }
    )
  }

  editConfig(data) {
    this.idOfEditedConfig = data.id;
    
    this.iseditConfig = true;
    this.AppService.setBodyMask(true);
    this.populateForm(data);
  }

  populateForm(data) {
    this.editConfigForm.patchValue({
      partnerName: data.partnerName,
      config: {
        Url: data.config.Url,
        Notif_Frequency: data.config.Notif_Frequency,
        checkForUpdate: data.config.checkForUpdate,
        btnName: data.config.btnName,
        downloadAutoOnWiFi: data.config.downloadAutoOnWiFi
      }
    })
  }

  saveConfig() {
    
    this.AppService.editOem(this.idOfEditedConfig, this.editConfigForm.value).subscribe(data => {
      this.dismissModal();
      this.fetchPartners();
      this.messageService.add({severity:'success', summary:'Message', detail:'OEM Succesfully Edited'});
    },
    err => {
      this.messageService.add({severity:'error', summary:'Message', detail:'OEM Edit Failed!!'});
    })
  }

  dismissModal() {
    this.iseditConfig = false;
    this.AppService.setBodyMask(false);
    
  }
}
