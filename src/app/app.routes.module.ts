import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OemRegModule } from './oem-reg/oem-reg.module';
import { ModelRegModule } from './model-reg/model-reg.module';
import { GenerateUpdateModule } from  './generate-update/generate-update.module';

export const routes: Routes = [

    //   { path: 'client/home', component: HomeComponent},
    //   { path: 'testing', component: TestingComponent  },
      { path: '**', redirectTo: ''},

    ];

    @NgModule({
        imports: [
          OemRegModule,
          ModelRegModule,
          GenerateUpdateModule,
          RouterModule.forRoot(routes)
        ],
        exports: [RouterModule]
      })
export class AppRoutingModule {

}
