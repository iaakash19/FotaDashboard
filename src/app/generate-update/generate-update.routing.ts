import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PushUpdateComponent } from './containers/push-update/push-update.component';
import { GenerateUpdateComponent } from './containers/generate-update/generate-update.component';

const ROUTES: Routes = [
    {
        path: 'push-update',
        component: PushUpdateComponent
    },
    {
      path: 'generate-update',
      component: GenerateUpdateComponent
  }
]

    @NgModule({
        imports: [
          RouterModule.forChild(ROUTES)
        ],
        exports: [RouterModule]
      })
export class GenerateUpdateRoutingModule {

}
