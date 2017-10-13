import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterModelComponent } from './containers/register-model/register-model.component';

const ROUTES: Routes = [
    {
        path: 'register-model',
        component: RegisterModelComponent,
        data: { state: 'register-model'} 
    }
]

    @NgModule({
        imports: [
          RouterModule.forChild(ROUTES)
        ],
        exports: [RouterModule]
      })
export class ModelRoutingModule {

}
