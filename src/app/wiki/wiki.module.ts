import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateWikiComponent } from './create-wiki/create-wiki.component';
import { ReadWikiComponent } from './read-wiki/read-wiki.component';
import { EditorModule } from 'primeng/primeng';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    EditorModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [CreateWikiComponent, ReadWikiComponent]
})
export class WikiModule { }
