import { DashboardModule } from './dashboard/dashboard.module';
import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OemRegModule } from './oem-reg/oem-reg.module';
import { ModelRegModule } from './model-reg/model-reg.module';
import { GenerateUpdateModule } from  './generate-update/generate-update.module';
import { AuthModule } from './auth/auth.module';

export const routes: Routes = [

    //   { path: 'client/home', component: HomeComponent},
    //   { path: 'testing', component: TestingComponent  },
      { path: '**', redirectTo: ''},

    ];

    @NgModule({
        imports: [
          // HomeModule,
          // OemRegModule,
          // ModelRegModule,
          // GenerateUpdateModule,
          DashboardModule,
          AuthModule,
          RouterModule.forRoot(routes)
        ],
        exports: [RouterModule]
      })
export class AppRoutingModule {

}
