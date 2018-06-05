import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsModule, AccordionModule, CalendarModule, TabViewModule, DialogModule, DropdownModule, FileUploadModule, GrowlModule, DataTableModule, PaginatorModule, MultiSelectModule } from 'primeng/primeng';
import { RepOverObjPipe } from './repOver_obj.pipe';
import { PreviewComponent } from './preview/preview.component';
import { HasRoleDirective } from './is_superuser.directive';


@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    FileUploadModule,
    TabViewModule,
    CalendarModule,
    AccordionModule
  ],
  exports: [ChipsModule, PreviewComponent, CalendarModule, AccordionModule, DropdownModule, DialogModule, PaginatorModule, FileUploadModule, DataTableModule, GrowlModule, RepOverObjPipe, MultiSelectModule, TabViewModule, HasRoleDirective],
  declarations: [RepOverObjPipe, PreviewComponent, HasRoleDirective]
})
export class SharedModule { }
