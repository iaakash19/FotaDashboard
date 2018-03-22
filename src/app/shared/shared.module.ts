import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule, CalendarModule, TabViewModule, DialogModule, DropdownModule, FileUploadModule, GrowlModule, DataTableModule, PaginatorModule, MultiSelectModule } from 'primeng/primeng';
import { RepOverObjPipe } from './repOver_obj.pipe';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    FileUploadModule,
    TabViewModule,
    CalendarModule,
    AccordionModule
  ],
  exports: [PreviewComponent, CalendarModule, AccordionModule, DropdownModule, DialogModule, PaginatorModule, FileUploadModule, DataTableModule, GrowlModule,RepOverObjPipe, MultiSelectModule, TabViewModule],
  declarations: [RepOverObjPipe, PreviewComponent]
})
export class SharedModule { }
