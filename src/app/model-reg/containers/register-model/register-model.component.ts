import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { AppService } from "../../../app.service";
import { Message } from "primeng/primeng";
import { MessageService } from "primeng/components/common/messageservice";
@Component({
  selector: "app-register-model",
  templateUrl: "./register-model.component.html",
  styleUrls: ["./register-model.component.scss"],
  providers: [MessageService]
})
export class RegisterModelComponent implements OnInit {
  modelRegister: FormGroup;
  partners: any;
  token: any;
  models: any;
  isMaskOn: boolean = false;
  msgs: Message[] = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private AppService: AppService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.fetchPartners();
    this.fetchModels();
    this.modelRegister = this.fb.group({
      partnerName: ["", Validators.required],
      DeviceModel: ["", Validators.required]
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

  fetchModels() {
    this.AppService.getDeviceModels().subscribe(data => {
      this.models = data;
    });
  }

  onModelRegister() {
    this.isLoading = true;
    this.AppService.registerModel(this.modelRegister.value).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.modelRegister.reset();
        this.messageService.add({
          severity: "success",
          summary: "Message",
          detail: "Model Succesfully regstered"
        });
        this.token = data.Token;
        this.fetchModels();
      },
      err => {
        this.isLoading = false;
        this.messageService.add({
          severity: "error",
          summary: "Message",
          detail: "Error Registering Model"
        });
      }
    );
  }

  onFocus(event) {
    if (!this.isMaskOn) {
      this.isMaskOn = true;
      this.AppService.setBodyClass("on");
    } else {
      this.isMaskOn = false;
      this.AppService.setBodyClass("off");
    }
  }

  onChange(event) {
    if (!this.isMaskOn) {
      this.isMaskOn = true;
      this.AppService.setBodyClass("on");
    } else {
      this.isMaskOn = false;
      this.AppService.setBodyClass("off");
    }
  }
}
