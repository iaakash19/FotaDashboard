import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterModelComponent } from './containers/register-model/register-model.component';

const ROUTES: Routes = [
    {
        path: 'regsiter-model',
        component: RegisterModelComponent
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
