import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushUpdateComponent } from './containers/push-update/push-update.component';
import { GenerateUpdateRoutingModule } from './generate-update.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GenerateUpdateComponent } from './containers/generate-update/generate-update.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    GenerateUpdateRoutingModule
  ],
  declarations: [PushUpdateComponent, GenerateUpdateComponent]
})
export class GenerateUpdateModule { }
