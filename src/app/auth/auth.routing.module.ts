import { LoginComponent } from './login/login.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [
       
            {
                path: 'login',
                component: LoginComponent
            }
]

    @NgModule({
        imports: [
          RouterModule.forChild(ROUTES)
    ],
        exports: [RouterModule]
      })
export class AuthRoutingModule {

}