import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class AppService {

  BASE_URL = `http://devfota.gammo.me/notify/fotav/`;

  private toggleBodyClass$ = new ReplaySubject<any>();
  public toggleBody$ = this.toggleBodyClass$.asObservable();

  constructor(
    private Http: HttpClient
  ) { }


  setBodyClass(key) {
    this.toggleBodyClass$.next(key);
  }
  registerOem(data) {
    let input = new FormData();
    Object.keys(data).map(key => {
      input.append(key, data[key]);
  });
   return this.Http.post(`${this.BASE_URL}deviceConfig/`, input);
  }

  getPartners() {
    return this.Http.get(`${this.BASE_URL}deviceConfig/`);
  }

  getDeviceType() {
    return this.Http.get(`${this.BASE_URL}device/`);
  }

  registerModel(data) {
    let input = new FormData();
    Object.keys(data).map(key => {
      input.append(key, data[key]);
  });
    return this.Http.post(`${this.BASE_URL}oemRegister/`, input);

  }

  generateUpdate(data) {
    let input = new FormData();
    Object.keys(data).map(key => {
      input.append(key, data[key]);
  });
    return this.Http.post(`${this.BASE_URL}updateGen/`, input);
  }

  fetchUpdates() {
    return this.Http.get(`${this.BASE_URL}updateGen/`);
  }

  getCurrentBuild(partner, model) {
    return this.Http.get(`${this.BASE_URL}updateGen/`,{
      params: new HttpParams()
        .set("partnerName", partner)
        .set("DeviceModel", model)
    });
  }

  getUpdatesAvailable(partner, model, currentVersion) {
    return this.Http.get(`${this.BASE_URL}updateGen/`,{
      params: new HttpParams()
        .set("partnerName", partner)
        .set("DeviceModel", model)
        .set("BaseVersion", currentVersion)
    });
  }

  getDeviceModel(partner='intex') {
    return this.Http.get(`${this.BASE_URL}oemRegister/`,{
      params: new HttpParams()
        .set("partnerName", partner)
    });
  }

  getDeviceModels() {
    return this.Http.get(`${this.BASE_URL}oemRegister/`);
  }

  pushUpdate(config) {
    let input = new FormData();
    Object.keys(config).map(key => {
      input.append(key, config[key]);
  });
    return this.Http.post(`${this.BASE_URL}pushUpdates/`, input);
  }

}
