import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterOemComponent } from './containers/register-oem/register-oem.component';

const ROUTES: Routes = [
    {
        path: 'regsiter-oem',
        component: RegisterOemComponent
    }
]

    @NgModule({
        imports: [
          RouterModule.forChild(ROUTES)
        ],
        exports: [RouterModule]
      })
export class OemRoutingModule {

}
