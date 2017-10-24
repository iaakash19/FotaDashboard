import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationValidationComponent } from './integration-validation/integration-validation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    ConfirmDialogModule
  ],
  declarations: [IntegrationValidationComponent]
})
export class IntegrationModule { }
