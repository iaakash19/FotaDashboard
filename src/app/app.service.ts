import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";


@Injectable()
export class AppService {

  BASE_URL = `http://devfota.gammo.me/notify/fotav/`;

  constructor(
    private Http: HttpClient
  ) { }

  // createPartner(partner) {
  //   let input = new FormData();
  //   Object.keys(partner).map(key => {
  //       input.append(key, partner[key]);
  //   });
  //   return this.http.post(`${this.BASE_URL}partner/`, input);
  // }


  registerOem(data) {
    let input = new FormData();
    Object.keys(data).map(key => {
      input.append(key, data[key]);
  });
    this.Http.post(`${this.BASE_URL}deviceConfig/`, input).subscribe(data => {
      debugger;
    })
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
  debugger;
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

}
