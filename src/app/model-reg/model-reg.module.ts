import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterModelComponent } from './containers/register-model/register-model.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModelRoutingModule } from './model-reg.routing';
import { SharedModule } from '../shared/shared.module';

import { ClipboardModule } from 'ngx-clipboard';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ModelRoutingModule,
    ClipboardModule
  ],
  declarations: [RegisterModelComponent]
})
export class ModelRegModule { }
