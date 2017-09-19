import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppService } from '../../../app.service';

@Component({
  selector: "register-oem",
  templateUrl: "./register-oem.component.html",
  styleUrls: ["./register-oem.component.scss"]
})
export class RegisterOemComponent implements OnInit {

  oemRegister: FormGroup;
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

  constructor(private fb: FormBuilder, private AppService: AppService) {}

  ngOnInit() {
    this.oemRegister = this.fb.group({
      partnerName: [""],
      config: this.fb.group({
        Url: [""],
        Notif_Frequency: [""],
        checkForUpdate: [""],
        btnName: [""],
        downloadAutoOnWiFi: [""]
      })
    });
  }

  registerOem() {
    // var data = {
    //   partnerName: this.oemRegister.value.partnerName,
    //   config: JSON.stringify(this.oemRegister.value.config)
    // }
    this.AppService.registerOem(this.oemRegister.value);
  }
}
