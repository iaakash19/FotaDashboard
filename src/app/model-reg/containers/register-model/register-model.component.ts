import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-register-model',
  templateUrl: './register-model.component.html',
  styleUrls: ['./register-model.component.scss']
})
export class RegisterModelComponent implements OnInit {

  modelRegister: FormGroup;
  partners:any;

  constructor(private fb: FormBuilder, private AppService: AppService) { }

  ngOnInit() {

    this.fetchPartners();
    this.modelRegister = this.fb.group({
      partnerName: [''],
      DeviceModel: ['']
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
  onModelRegister() {
    this.AppService.registerModel(this.modelRegister.value)
  }


}
