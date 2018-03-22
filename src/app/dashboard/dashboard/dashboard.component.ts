import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private AuthService:AuthService
  ) { }

  ngOnInit() {
  }

  logOutUser() {
    this.AuthService.logOutUser();
  }

  isSuperUser() {
    return this.AuthService.getUserType();
  }

}
