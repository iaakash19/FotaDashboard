import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppService } from "../../../app.service";

@Component({
  selector: "app-push-update",
  templateUrl: "./push-update.component.html",
  styleUrls: ["./push-update.component.scss"]
})
export class PushUpdateComponent implements OnInit {
  pushUpdate: FormGroup;
  partners:any;

  constructor(private fb: FormBuilder, private AppService: AppService) {}

  ngOnInit() {
    this.fetchPartners();
    this.pushUpdate = this.fb.group({
      partnerName: [''],
      DeviceModel: [''],
      CurrentBuildVersion: [''],
      UpdateName: [''],
      IMEI1: ['']
    });
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
  onPushUpdate() {

  }
}
