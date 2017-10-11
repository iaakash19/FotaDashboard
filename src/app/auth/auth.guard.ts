import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private AuthService: AuthService, private Router: Router) {}

  canActivate(
    Route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
      return this.checkLoggedIn();
  }

  checkLoggedIn(): boolean {
    if (this.AuthService.isLoggedIn()) {
      return true;
    } else {
      this.Router.navigate(["/login"]);
      return false;
    }
  }
}
