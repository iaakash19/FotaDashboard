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
  token: any = null;
  models: any;
  isMaskOn: boolean = false;
  msgs: Message[] = [];
  isLoading: boolean = false;
  display: boolean = false;
  prop:any;
  isToken: boolean = false;

  isPreview: boolean = false;
  previewConf:any = {
    'Partner Name': null,
    'Device Model': null
  }


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

  showToken() {
    const prop = `# begin fota properties<br/>
    ro.build.date.utc=&lt;Build UTC Time Stamp&gt;<br/>
    ro.fota.platform=&lt;chipset&gt;_&lt;OS&gt;<br/>
    ro.fota.type=phone<br/>
    ro.fota.app=3.0.0<br/>
    ro.fota.oem=&lt;oemname&gt;_&lt;chipset&gt;_&lt;os&gt;<br/>
    ro.fota.device=&lt;ModelMarketName&gt;<br/>
    ro.fota.version=&lt;OEM&gt;_&lt;Modelname&gt;_&lt;buildversioncode&gt;_&lt;ro.build.date.utc&gt;<br/>
    ro.fota.token=${this.token}<br/>
    # end fota properties`;

    return prop;
  }


  showToast() {
    this.messageService.add({
      severity: "success",
      summary: "Message",
      detail: "Build.Prop Copied"
    });
  }


  showDialog(data) {
    this.display = true;
    this.prop = `# begin fota properties<br/>
    ro.build.date.utc=&lt;Build UTC Time Stamp&gt;<br/>
    ro.fota.platform=&lt;chipset&gt;_&lt;OS&gt;<br/>
    ro.fota.type=phone<br/>
    ro.fota.app=3.0.0<br/>
    ro.fota.oem=&lt;oemname&gt;_&lt;chipset&gt;_&lt;os&gt;<br/>
    ro.fota.device=&lt;ModelMarketName&gt;<br/>
    ro.fota.version=&lt;OEM&gt;_&lt;Modelname&gt;_&lt;buildversioncode&gt;_&lt;ro.build.date.utc&gt;<br/>
    ro.fota.token=${data.Token}<br/>
    # end fota properties`;
  }



  showBuild(token) {
    const prop = `# begin fota properties
    ro.build.date.utc=<Build UTC Time Stamp>
    ro.fota.platform=<chipset>_<OS>
    ro.fota.type=phone
    ro.fota.app=3.0.0
    ro.fota.oem=<oemname>_<chipset>_<os>
    ro.fota.device=<ModelMarketName>
    ro.fota.version=<OEM>_<Modelname>_<buildversioncode>_<ro.build.date.utc>
    ro.fota.token=<${token}>
    # end fota properties`;

    return prop;
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
    this.curatePreviewConf();

  }
  handleClose() {
    this.isPreview = false;

  }
  handleSave() {
    this.isLoading = true;
    this.isPreview = false;
    this.token = false;
    this.AppService.registerModel(this.modelRegister.value).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.modelRegister.reset();
        this.messageService.add({
          severity: "success",
          summary: "Message",
          detail: "Model Succesfully regstered"
        });
        this.isToken = true;
        this.token = data.Token;
        this.fetchModels();
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
  }

  curatePreviewConf() {
    this.token = true;
    this.previewConf['Partner Name'] = this.modelRegister.get('partnerName').value;
    this.previewConf['Device Model'] = this.modelRegister.get('DeviceModel').value;

    this.isPreview = true;
    this.AppService.setBodyMask(true);
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
