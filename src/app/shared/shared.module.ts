import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule, FileUploadModule, GrowlModule, DataTableModule, PaginatorModule } from 'primeng/primeng';
import { RepOverObjPipe } from './repOver_obj.pipe';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    FileUploadModule
  ],
  exports: [DropdownModule, FileUploadModule, DataTableModule, GrowlModule,RepOverObjPipe],
  declarations: [RepOverObjPipe]
})
export class SharedModule { }
