import { Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { Injectable, Injector } from "@angular/core";

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector, private Router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService);
    
    if (this.Router.url == "/login") {
      return next.handle(request);
    } else {
      const token: any = authService.getToken();
      debugger;
      const custom_request = request.clone({
        headers: request.headers.set("Authorization", `Token ${token}`)
      });
      return next.handle(custom_request);
    }
  }
}
