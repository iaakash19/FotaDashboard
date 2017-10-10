import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule, FileUploadModule, GrowlModule, DataTableModule, PaginatorModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    FileUploadModule
  ],
  exports: [DropdownModule, FileUploadModule, DataTableModule, GrowlModule],
  declarations: []
})
export class SharedModule { }
