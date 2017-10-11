import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { LocalStorageService } from "angular-2-local-storage";


@Injectable()
export class AuthService {
  BASE_URL = `http://devfota.gammo.me/notify/fotav/login/`;

  private currentToken = null;
  private currentTokenSubject = new ReplaySubject<Object>(1);
  public currentToken$ = this.currentTokenSubject.asObservable();

  constructor(
    private http: HttpClient,
    private LocalStorage: LocalStorageService
  ) {
    const tokenInLS = this.LocalStorage.get("token");
    tokenInLS ? this.currentTokenSubject.next(tokenInLS) : this.currentTokenSubject.next(null);
  }

  login(user) {
    return this.http.post(this.BASE_URL, user);
  }

  setToken(token) {
    this.currentTokenSubject.next(token);
    this.LocalStorage.set("token", token);
  }

  logOutUser() {
    this.currentTokenSubject.next(null);
    this.LocalStorage.clearAll();
  }

  isLoggedIn(): boolean {
    this.currentToken = this.getToken();
    return this.currentToken ? true : false;
  }

  getToken() {
    return this.LocalStorage.get("token");
  }
}
