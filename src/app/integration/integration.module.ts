import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationValidationComponent } from './integration-validation/integration-validation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditorModule, ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';
import { ListComponent } from './components/list/list.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    EditorModule,
    SharedModule,
    CommonModule,
    ConfirmDialogModule,
    FormsModule

  ],
  declarations: [IntegrationValidationComponent, ListComponent]
})
export class IntegrationModule { }
