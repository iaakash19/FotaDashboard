import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AppService } from '../../../app.service';

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

  constructor(private fb: FormBuilder, private AppService: AppService) { }

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
      this.token = data.Token;
      this.fetchModels();
    })
  }


}
