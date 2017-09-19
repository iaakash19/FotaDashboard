import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";


@Injectable()
export class AppService {

  BASE_URL = `http://devfota.gammo.me/notify/fotav/`;

  constructor(
    private Http: HttpClient
  ) { }

  registerOem(data) {
    debugger;
    this.Http.post(`${this.BASE_URL}deviceConfig/`, data).subscribe(data => {
      debugger;
    })
  }

  getPartners() {
    return this.Http.get(`${this.BASE_URL}deviceConfig/`);
  }

  registerModel(data) {
    debugger;
    this.Http.post(`${this.BASE_URL}oemRegister/`, data).subscribe(data => {
      debugger;
    })
  }

  generateUpdate(data) {
    return this.Http.post(`${this.BASE_URL}updateGen/`, data);
  }

  getDeviceModel(partner='intex') {
    return this.Http.get(`${this.BASE_URL}oemRegister/`,{
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      params: new HttpParams()
        .set("partnerName", partner)
    });
  }

}
