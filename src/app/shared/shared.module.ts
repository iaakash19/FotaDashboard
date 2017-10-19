import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule, DialogModule, DropdownModule, FileUploadModule, GrowlModule, DataTableModule, PaginatorModule, MultiSelectModule } from 'primeng/primeng';
import { RepOverObjPipe } from './repOver_obj.pipe';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    FileUploadModule,
    TabViewModule
  ],
  exports: [DropdownModule, DialogModule, FileUploadModule, DataTableModule, GrowlModule,RepOverObjPipe, MultiSelectModule, TabViewModule],
  declarations: [RepOverObjPipe]
})
export class SharedModule { }
