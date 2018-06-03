import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationValidationComponent } from './integration-validation/integration-validation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';
import { ListComponent } from './components/list/list.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    ConfirmDialogModule
  ],
  declarations: [IntegrationValidationComponent, ListComponent]
})
export class IntegrationModule { }
