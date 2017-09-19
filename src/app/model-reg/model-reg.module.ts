import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterModelComponent } from './containers/register-model/register-model.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModelRoutingModule } from './model-reg.routing';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ModelRoutingModule
  ],
  declarations: [RegisterModelComponent]
})
export class ModelRegModule { }
