import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class AppService {

  BASE_URL = `http://devfota.gammo.me/notify/fotav/`;

  private toggleBodyClass$ = new ReplaySubject<any>();
  public toggleBody$ = this.toggleBodyClass$.asObservable();
  
  private toggleBodyMask$ = new ReplaySubject<any>();
  public toggleBodyShadow$ = this.toggleBodyMask$.asObservable();

  constructor(
    private Http: HttpClient
  ) { }

setBodyMask(value) {
  this.toggleBodyMask$.next(value);
}

  setBodyClass(key) {
    this.toggleBodyClass$.next(key);
  }
  registerOem(data) {
    //   let input = new FormData();
    //   Object.keys(data).map(key => {
    //     input.append(key, data[key]);
    // });
    return this.Http.post(`${this.BASE_URL}partnerRegister/`, data);
  }

  editOem(id, data) {
    //   let input = new FormData();
    //   Object.keys(data).map(key => {
    //     input.append(key, data[key]);
    // });
    return this.Http.put(`${this.BASE_URL}partnerRegister/${id}/`, data);
  }

  getPartners() {
    return this.Http.get(`${this.BASE_URL}partnerRegister/`);
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

  generateUpdate(data, param) {
    let input = new FormData();
    Object.keys(data).map(key => {
        input.append(key, data[key]);
    });
    return this.Http.post(`${this.BASE_URL}updateGen/`, input);
  }

  fetchUpdates() {
    return this.Http.get(`${this.BASE_URL}updateGen/`);
  }

  filtergeUpdateByDate(date){
    const month_from = parseInt(date.split('-')[1]);
    
    const newFrom = `${date.split('-')[0]}-${month_from+1}-${date.split('-')[2]}`;

    return this.Http.get(`${this.BASE_URL}updateGen/`,{
      params: new HttpParams()
      .set("Date", newFrom)
    });    
  }

  getCurrentBuild(partner, model) {

    return this.Http.get(`${this.BASE_URL}getBaseVersion/`, {
      params: new HttpParams()
        .set("partnerName", partner)
        .set("DeviceModel", model.replace("+", "%2B"))
    });
  }


  getUpdatesAvailable(partner, model, currentVersion, UpdateFor=null) {
    return this.Http.get(`${this.BASE_URL}updateGen/`, {
      params: new HttpParams()
        .set("partnerName", partner)
        .set("DeviceModel", model.replace(" +", "%2B"))
        .set("BaseVersion", currentVersion)
        .set("UpdateFor", UpdateFor)
    });
  }

  getDeviceModel(partner = 'intex') {
    return this.Http.get(`${this.BASE_URL}oemRegister/`, {
      params: new HttpParams()
        .set("partnerName", partner)
    });
  }

  getDeviceModels() {
    return this.Http.get(`${this.BASE_URL}oemRegister/`);
  }

  pushUpdate(config, param) {
    let input = new FormData();
    Object.keys(config).map(key => {
      input.append(key, config[key]);
    });
    return this.Http.post(`${this.BASE_URL}pushUpdates/`, input);
  }


  getPartnersData() {
    return this.Http.get(`${this.BASE_URL}partnerRegister/`);
  }

  getDeviceModelsData() {
    return this.Http.get(`${this.BASE_URL}mCount/`);
  }

  getDevicesActivated() {
    return this.Http.get(`${this.BASE_URL}tCount/`);
  }

  getUpdatesPushed() {
    return this.Http.get(`${this.BASE_URL}pCount/`);
  }

  getUpdatesCompleted() {
    return this.Http.get(`${this.BASE_URL}cCount/`);
  }

  getTotalOnAPK() {
    return this.Http.get(`${this.BASE_URL}aCount/`);
  }

  getdetailsByIMEI1(IMEI1) {
    return this.Http.get(`${this.BASE_URL}register/?IMEI1=${IMEI1}`);
  }

  // Display - http://devfota.gammo.me/display/
  // Update Report - http://devfota.gammo.me/updateReport/
  // Activation report- http://devfota.gammo.me/activationReport/
  // Failed Report - http://devfota.gammo.me/failedReport/

  getDisplayReport() {
    return this.Http.get(`${this.BASE_URL}display/`);
  }
  getUpdateReport() {
    return this.Http.get(`${this.BASE_URL}updateReport/`);
  }

  getActivationReport() {
    return this.Http.get(`${this.BASE_URL}activationReport/`);
  }

  getFailedReport() {
    return this.Http.get(`${this.BASE_URL}failedReport/`);
  }

  deleteIMEI(id) {
    return this.Http.delete(`${this.BASE_URL}register/${id}/`);
  }

  deleteUpdate(id) {
    return this.Http.delete(`${this.BASE_URL}updateGen/${id}/`); 
  }

  filterRowsByDate(from, to, type) {
    const month_from = parseInt(from.split('-')[1]);
    const month_to = parseInt(to.split('-')[1]);
    
    const newFrom = `${from.split('-')[0]}-${month_from+1}-${from.split('-')[2]}`;
    const newTo = `${to.split('-')[0]}-${month_to+1}-${to.split('-')[2]}`;
    

    return this.Http.get(`${this.BASE_URL}${type}/?Date__gte=${newFrom}&Date__lte=${newTo}`);
  }

}
