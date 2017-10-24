import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushUpdateComponent } from './containers/push-update/push-update.component';
import { GenerateUpdateRoutingModule } from './generate-update.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GenerateUpdateComponent } from './containers/generate-update/generate-update.component';
import { SharedModule } from '../shared/shared.module';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ConfirmDialogModule,
    GenerateUpdateRoutingModule
  ],
  declarations: [PushUpdateComponent, GenerateUpdateComponent]
})
export class GenerateUpdateModule { }
