import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AppService } from '../../../app.service';
import {Message} from 'primeng/primeng';
import {MessageService} from 'primeng/components/common/messageservice';
@Component({
  selector: 'app-register-model',
  templateUrl: './register-model.component.html',
  styleUrls: ['./register-model.component.scss']
})
export class RegisterModelComponent implements OnInit {

  modelRegister: FormGroup;
  partners:any;
  token:any;
  models:any;
  isMaskOn: boolean = false;
  msgs: Message[] = [];

  constructor(private fb: FormBuilder, private AppService: AppService, private messageService: MessageService) { }

  ngOnInit() {


    this.fetchPartners();
    this.fetchModels();
    this.modelRegister = this.fb.group({
      partnerName: ['', Validators.required],
      DeviceModel: ['', Validators.required]
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

  fetchModels() {
    this.AppService.getDeviceModels().subscribe(data => {
      this.models = data;
    })
  }

  onModelRegister() {
    this.AppService.registerModel(this.modelRegister.value).subscribe((data:any) => {
      this.messageService.add({severity:'success', summary:'Message', detail:'OEM Succesfully regstered'});
      this.token = data.Token;
      this.fetchModels();
    })
  }

  onFocus(event) {
debugger;
   if(!this.isMaskOn) {
      this.isMaskOn = true;
      this.AppService.setBodyClass('on');
   }
    else {
      this.isMaskOn = false;
      this.AppService.setBodyClass('off');
    }


  }

  onChange(event) {
    debugger;
    if(!this.isMaskOn) {
      this.isMaskOn = true;
      this.AppService.setBodyClass('on');
   }
    else {
      this.isMaskOn = false;
      this.AppService.setBodyClass('off');
    }
  }

  // removeMask(event) {
  //   this.AppService.setBodyClass('off');
  // }


}
