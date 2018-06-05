import { AppService } from './../../app.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showWiki = false;

  constructor(
    private AuthService:AuthService,
    private AppService: AppService
  ) { }

  ngOnInit() {
    this.AppService.getWiki().subscribe((data:any) => {
     if(data.length == 0) {
       this.showWiki = false;
     }else {
       this.showWiki = true;
     }
      debugger;
    })
  }

  logOutUser() {
    this.AuthService.logOutUser();
  }

  isSuperUser() {
    return this.AuthService.getUserType();
  }

}
