import { PushUpdateComponent } from './../generate-update/containers/push-update/push-update.component';
import { GenerateUpdateComponent } from './../generate-update/containers/generate-update/generate-update.component';
import { RegisterOemComponent } from './../oem-reg/containers/register-oem/register-oem.component';
import { RegisterModelComponent } from './../model-reg/containers/register-model/register-model.component';
import { HomeComponent } from './../home/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuardService } from '../auth/auth.guard';

const ROUTES: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardService],

        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'push-update',
                component: PushUpdateComponent
            },
            {
                path: 'generate-update',
                component: GenerateUpdateComponent
            },
            {
                path: 'register-oem',
                component: RegisterOemComponent
            },
            {
                path: 'regsiter-model',
                component: RegisterModelComponent
            }
        ]
    }
]

    @NgModule({
        imports: [
          RouterModule.forChild(ROUTES)
        ],
        exports: [RouterModule]
      })
export class DashboardRoutingModule {

}