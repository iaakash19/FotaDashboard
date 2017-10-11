import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    }
]

    @NgModule({
        imports: [
          RouterModule.forChild(ROUTES)
        ],
        exports: [RouterModule]
      })
export class HomeRoutingModule {

}
