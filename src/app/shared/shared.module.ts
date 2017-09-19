import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule
  ],
  exports: [DropdownModule],
  declarations: []
})
export class SharedModule { }
