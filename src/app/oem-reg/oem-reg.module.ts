import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterOemComponent } from './containers/register-oem/register-oem.component';
import { OemRoutingModule } from './oem-reg.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OemRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [RegisterOemComponent]
})
export class OemRegModule { }
