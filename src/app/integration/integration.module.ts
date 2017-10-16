import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationValidationComponent } from './integration-validation/integration-validation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CommonModule
  ],
  declarations: [IntegrationValidationComponent]
})
export class IntegrationModule { }
