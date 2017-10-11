import { AuthRoutingModule } from './auth.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuardService } from './auth.guard';
import {GrowlModule} from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    GrowlModule
  ],
  declarations: [LoginComponent],
  providers: [AuthService, AuthGuardService]
})
export class AuthModule { }
