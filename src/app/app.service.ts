import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class AppService {
  BASE_URL = ` http://fota.dynamyn.mobi/notify/fotav/`; //test
  // BASE_URL = `http://devfota.gammo.me/notify/fotav/`;

  private toggleBodyClass$ = new ReplaySubject<any>();
  public toggleBody$ = this.toggleBodyClass$.asObservable();

  private toggleBodyMask$ = new ReplaySubject<any>();
  public toggleBodyShadow$ = this.toggleBodyMask$.asObservable();

  constructor(private Http: HttpClient) {}

  setBodyMask(value) {
    this.toggleBodyMask$.next(value);
  }

  getYears() {
     return this.Http.get(`${this.BASE_URL}getYear/`);
  }
  getDevices() {
    return this.Http.get(`${this.BASE_URL}register/?DeviceState=Test`);
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
  patchDevice(id) {
    return this.Http.patch(`${this.BASE_URL}register/${id}/`, { "DeviceState": "Production" });
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

  filtergeUpdateByDate(date) {
    const month_from = parseInt(date.split("-")[1]);

    const newFrom = `${date.split("-")[0]}-${month_from + 1}-${
      date.split("-")[2]
    }`;

    return this.Http.get(`${this.BASE_URL}updateGen/`, {
      params: new HttpParams().set("Date", newFrom)
    });
  }

  getCurrentBuild(partner, model) {
    if (model) {
      return this.Http.get(`${this.BASE_URL}getBaseVersion/`, {
        params: new HttpParams()
          .set("partnerName", partner)
          .set("DeviceModel", model.replace("+", "%2B"))
      });
    }
  }

  getUpdatesAvailable(partner, model, currentVersion, UpdateFor = null) {
    return this.Http.get(`${this.BASE_URL}updateGen/`, {
      params: new HttpParams()
        .set("partnerName", partner)
        .set("DeviceModel", model.replace(" +", "%2B"))
        .set("BaseVersion", currentVersion)
        .set("UpdateFor", UpdateFor)
    });
  }

  getDeviceModel(partner = "intex") {
    return this.Http.get(`${this.BASE_URL}oemRegister/`, {
      params: new HttpParams().set("partnerName", partner)
    });
  }

  getDeviceModels() {
    return this.Http.get(`${this.BASE_URL}oemRegister/`);
  }



  getPartnersData() {
    return this.Http.get(`${this.BASE_URL}partnerRegister/`);
  }

  getDeviceModelsData() {
    return this.Http.get(`${this.BASE_URL}mCount/`);
  }

  getDevicesActivated(year?) {
    return this.Http.get(`${this.BASE_URL}tCount/?year=${year}`);
  }

  getUpdatesPushed(year?) {
    return this.Http.get(`${this.BASE_URL}pCount/?year=${year}`);
  }

  getUpdatesCompleted(year?) {
    return this.Http.get(`${this.BASE_URL}cCount/?year=${year}`);
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

  getDisplayReport(page, filters?) {
    let filterString = null;

    if (filters) {
      let params = [];

      Object.keys(filters).map(key => {
        let param = `${key}=${filters[key]}`;
        params.push(param);
      });
      filterString = params.join("&");
      return this.Http.get(
        `${this.BASE_URL}display/?page=${page}&${filterString}`
      );
    } else {
      return this.Http.get(`${this.BASE_URL}display/?page=${page}`);
    }
  }
  getUpdateReport(page, filters?) {
    let filterString = null;

    if (filters) {
      let params = [];

      Object.keys(filters).map(key => {
        let param = `${key}=${filters[key]}`;
        params.push(param);
      });
      filterString = params.join("&");
      return this.Http.get(
        `${this.BASE_URL}updateReport/?page=${page}&${filterString}`
      );
    } else {
      return this.Http.get(`${this.BASE_URL}updateReport/?page=${page}`);
    }
  }

  getActivationReport(page, filters?) {
    let filterString = null;

    if (filters) {
      let params = [];

      Object.keys(filters).map(key => {
        let param = `${key}=${filters[key]}`;
        params.push(param);
      });
      filterString = params.join("&");
      return this.Http.get(
        `${this.BASE_URL}activationReport/?page=${page}&${filterString}`
      );
    } else {
      return this.Http.get(`${this.BASE_URL}activationReport/?page=${page}`);
    }
  }

  getDeletedReport(page, filters?) {
    let filterString = null;

    if (filters) {
      let params = [];

      Object.keys(filters).map(key => {
        let param = `${key}=${filters[key]}`;
        params.push(param);
      });
      filterString = params.join("&");
      return this.Http.get(
        `${this.BASE_URL}updatedeleted/?page=${page}&${filterString}`
      );
    } else {
      return this.Http.get(`${this.BASE_URL}updatedeleted/?page=${page}`);
    }
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
    const month_from = parseInt(from.split("-")[1]);
    const month_to = parseInt(to.split("-")[1]);

    const newFrom = `${from.split("-")[0]}-${month_from + 1}-${
      from.split("-")[2]
    }`;
    const newTo = `${to.split("-")[0]}-${month_to + 1}-${to.split("-")[2]}`;

    return this.Http.get(
      `${this.BASE_URL}${type}/?Date__gte=${newFrom}&Date__lte=${newTo}`
    );
  }

  createWiki(wiki) {
    return this.Http.post(`${this.BASE_URL}saveQues/`, wiki);
  }

  getWiki() {
    return this.Http.get(`${this.BASE_URL}saveQues/`);
  }

  deleteWikiBlock(id) {
    return this.Http.delete(`${this.BASE_URL}saveQues/${id}`);
  }

  getWikiBlock(id) {
    return this.Http.get(`${this.BASE_URL}saveQues/${id}`);
  }

  editWikiBlock(id, data) {
    return this.Http.put(`${this.BASE_URL}saveQues/${id}/`, data);
  }

  uploadfile(file) {
    let input = new FormData();
    input.append("File", file.File);
    // Object.keys(file).map(key => {
    //   input.append(File, file);
    // });

    return this.Http.post(`${this.BASE_URL}uploadFile/`, input);
  }

  getActivationCsv(filters) {
    let filterString = null;

    if (filters) {
      let params = [];

      Object.keys(filters).map(key => {
        let param = `${key}=${filters[key]}`;
        params.push(param);
      });
      filterString = params.join("&");

      return this.Http.get(`${this.BASE_URL}activationReport/?export=True&${filterString}`);
    } else {
      return this.Http.get(`${this.BASE_URL}activationReport/?export=True`);
    }

  }

  getDisplayCsv(filters) {
    let filterString = null;

    if (filters) {
      let params = [];

      Object.keys(filters).map(key => {
        let param = `${key}=${filters[key]}`;
        params.push(param);
      });
      filterString = params.join("&");

      return this.Http.get(`${this.BASE_URL}display/?export=True&${filterString}`);
    } else {
      return this.Http.get(`${this.BASE_URL}display/?export=True`);
    }

  }

  getUpdateCsv(filters) {
    let filterString = null;

    if (filters) {
      let params = [];

      Object.keys(filters).map(key => {
        let param = `${key}=${filters[key]}`;
        params.push(param);
      });
      filterString = params.join("&");

      return this.Http.get(`${this.BASE_URL}updateReport/?export=True&${filterString}`);
    } else {
      return this.Http.get(`${this.BASE_URL}updateReport/?export=True`);
    }

  }

  getList(status) {
    //http://fota.dynamyn.mobi/notify/fotav/updateGen/?UpdateFor=Test&BuildState=Active
    return this.Http.get(`${this.BASE_URL}updateGen/?UpdateFor=Test&BuildState=${status}`);

  }

  getTestDetails(testObj) {
    return this.Http.get(`${this.BASE_URL}testdata/?uid=${testObj.rowId}&TestNo=${testObj.testId}`);
  }

  getStatus() {
    return this.Http.get(`${this.BASE_URL}teststatus/`);
  }

  saveTest(testObj, data) {
    return this.Http.put(`${this.BASE_URL}testdata/?uid=${testObj.rowId}&TestNo=${testObj.testId}`, data);
  }

  pushUpdate(config, param?) {
    let input = new FormData();
    Object.keys(config).map(key => {
      input.append(key, config[key]);
    });
    return this.Http.post(`${this.BASE_URL}pushUpdates/`, input);
  }

  saveRemarkss(rowId, remarks, status) {
    let config = { 'BuildRemarks': remarks, 'BuildStatus': status };

    let input = new FormData();
    Object.keys(config).map(key => {
      input.append(key, config[key]);
    });
    return this.Http.put(`${this.BASE_URL}updateGen/${rowId}/`, input );
  }

  fetchUpdateData(status) {
    return this.Http.get(`${this.BASE_URL}updateGen/?UpdateFor=Production&BuildState=${status}`);
  }

  editUpdate(rowId, data) {
    // ${ this.BASE_URL } updateGen / { id }
    delete data.id;
    let config = data;

    let input = new FormData();
    Object.keys(config).map(key => {
      input.append(key, config[key]);
    });
    return this.Http.put(`${this.BASE_URL}updateGen/${rowId}/`, input);
  }

  deleteUpdateRevised(rowId, remarks) {
    // http://fota.dynamyn.mobi/notify/fotav/updatedeleted/
    let config = {
      uid: rowId,
      Remarks: remarks
    }
    let input = new FormData();
    Object.keys(config).map(key => {
      input.append(key, config[key]);
    });
    return this.Http.post(`${this.BASE_URL}updatedeleted/`, config);
  }

  testAgain(rowId) {
    let config = {
      UpdateFor: 'Test'
    }

    let input = new FormData();
    Object.keys(config).map(key => {
      input.append(key, config[key]);
    });
    return this.Http.put(`${this.BASE_URL}updateGen/${rowId}/`, input);

  }

  triggerDeleteOnExpired(id) {
    return this.Http.delete(`${this.BASE_URL}updateGen/${id}`);
  }

  uploadAndgeturl(file) {
        let input = new FormData();
  input.append("File", file.File);
  // Object.keys(file).map(key => {
  //   input.append(File, file);
  // });

  return this.Http.post(`${this.BASE_URL}uploadFile/`, input);
  }
}


// uploadfile(file) {
//   let input = new FormData();
//   input.append("File", file.File);
//   // Object.keys(file).map(key => {
//   //   input.append(File, file);
//   // });

//   return this.Http.post(`${this.BASE_URL}uploadFile/`, input);
// }
