import { AuthService } from './auth/auth.service';
import { routerTransition } from './app.routeAnim';
import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routerTransition ]
})
export class AppComponent implements OnInit {
  isMaskOn: boolean = false;

constructor(private AppService: AppService, private AuthService: AuthService, private Router: Router) {

}

ngOnInit() {
  this.AppService.toggleBodyShadow$.subscribe(value => {
    this.isMaskOn = value;
  });
  
  this.AuthService.currentToken$.subscribe(data => {
    if(!data){
      this.Router.navigate(['/login']);
    }
  });
}




}
