import { Observable } from 'rxjs/Rx';
import { AppService } from "./../../app.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SelectItem } from 'primeng/primeng';
import 'rxjs/add/operator/distinct';

declare var $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  @ViewChild('container') container: ElementRef;

  deviceActivatedConf: any;
  updatesPushedConf: any;
  updatesCompletedConf: any;
  APKConf: any;
  deviceModelsConf: any;

  activatedDevices: SelectItem[];
  devices_forupdatesPushed: SelectItem[];
  devices_forupdatesCompleted: SelectItem[];
  devices_forAPK: SelectItem[];
  deviceModels: SelectItem[];

  selectedActivatedDevices: string[] = [];
  selected_devices_forupdatesPushed: string[] = [];
  selected_devices_forupdatesCompleted: string[] = [];
  selected_devices_forAPK: string[] = [];
  selected_deviceModels: string[] = [];

  partners1: any;
  selectedPartner1: string;

  partners2: any;
  selectedPartner2: string;

  partners3: any;
  selectedPartner3: string;


  partners4: any;
  selectedPartner4: string;

  partners5: any;
  selectedPartner5: string;

  raw_devicesActivated: any;
  raw_updatesPushed: any;
  raw_updatesCompleted: any;
  raw_apkData: any;

  monthSlab: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  partnerStats = [
    {
      count: null, value: null, label: 'Partners Active:'
    },
    { key: 'deviceModels', label: 'total device models', value: null },
    { key: 'devicesActivated', label: 'total devices activated', value: null },
    { key: 'updatesPushed', label: 'Total updates pushed', value: null },
    { key: 'updatesCompleted', label: 'Total updates completed', value: null }
  ];
  chart1: any;
  chart2: any;
  chart3: any;
  chart4: any;
  chart5: any;

  constructor(private AppService: AppService) {
  }


  ngOnInit() {

    this.fetchData();
  }

  saveInstance1(chartInstance) {
    this.chart1 = chartInstance;
  }
  handleLegendChange1(event) {
    event.value; //array of index
    var series = this.chart1.series;

    for (var i = 0; i < series.length; i++) {
      series[i].hide();
    }
    event.value.map(i => {
      series[i].show();
    })
  }

  saveInstance2(chartInstance) {
    this.chart2 = chartInstance;
  }

  handleLegendChange2(event) {
    event.value; //array of index
    var series = this.chart2.series;

    for (var i = 0; i < series.length; i++) {
      series[i].hide();
    }
    event.value.map(i => {
      series[i].show();
    })
  }

  saveInstance3(chartInstance) {
    this.chart3 = chartInstance;
  }

  handleLegendChange3(event) {
    event.value; //array of index
    var series = this.chart3.series;

    for (var i = 0; i < series.length; i++) {
      series[i].hide();
    }
    event.value.map(i => {
      series[i].show();
    })
  }

  saveInstance4(chartInstance) {
    this.chart4 = chartInstance;
  }

  handleLegendChange4(event) {
    event.value; //array of index
    var series = this.chart4.series;

    for (var i = 0; i < series.length; i++) {
      series[i].hide();
    }
    event.value.map(i => {
      series[i].show();
    })
  }

  saveInstance5(chartInstance) {
    this.chart5 = chartInstance;
  }

  handleLegendChange5(event) {
    event.value; //array of index
    var series = this.chart5.series;

    for (var i = 0; i < series.length; i++) {
      series[i].hide();
    }
    event.value.map(i => {
      series[i].show();
    })
  }

  graphGenerator(graph_title, xTitle = "Months", data, x_Axis, stacked = true) {
    var config = {
      chart: { type: 'column', width: 800 },
      legend: {
        enabled: false
      },
      title: {
        text: graph_title
      },
      plotOptions: {
        series: {
          pointWidth: 30
        },
        column: {
          stacking: 'normal',
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      xAxis: {
        categories: x_Axis,
        // crosshair: true
        title: {
          text: xTitle
        }
      },
      yAxis: {
        // tickInterval: 1,
        min: 0,
        stackLabels: {
          enabled: true
        },
        title: {
          text: 'Total Number'
        }
      },
      series: data
    };

    return config;
  }

  dataMapper(data, selectedPartner) {

    return data.filter(item => item.partner == selectedPartner)
      .map(item => {
        return {
          name: item.model,
          data: this.collectionCurator(item.count)
        }
      });
  }

  optionMaker(data, initiator) {

    return data.map((data, index) => {
      switch (initiator) {
        case 'activated_device':
          this.selectedActivatedDevices.push(index);
          break;
        case 'updates_pushed':
          this.selected_devices_forupdatesPushed.push(index);
          break;
        case 'updates_completed':
          this.selected_devices_forupdatesCompleted.push(index);
          break;
        case 'devices_forAPK':
          this.selected_devices_forAPK.push(index);
      }

      return {
        label: data.name,
        value: index
      }
    });

  }

  makePartnersDrop(data) {
    const partnersWrap = data.map((item: any) => {

      return {
        label: item.partner,
        value: item.partner
      }
    });

    let res = Array.from(new Set(partnersWrap.map(JSON.stringify)));
    return res.map((item: any) => {
      return JSON.parse(item)
    });
  }

  generateGraph1WithDrop(data, selectedPartner) {
    let dataToMap = this.dataMapper(data, selectedPartner);
    this.activatedDevices = this.optionMaker(dataToMap, 'activated_device');
    this.deviceActivatedConf = this.graphGenerator('Total Number of Device Activated', undefined, dataToMap, [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]);
  }

  generateGraph2WithDrop(data, selectedPartner) {
    let dataToMap = this.dataMapper(data, selectedPartner);
    this.devices_forupdatesPushed = this.optionMaker(dataToMap, 'updates_pushed');
    this.updatesPushedConf = this.graphGenerator('Total Number of Updates Pushed', undefined, dataToMap, [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]);
  }

  generateGraph3WithDrop(data, selectedPartner) {
    let dataToMap = data.filter(item => item.partner == selectedPartner)
      .map(item => {
        return {
          name: item.model,
          data: this.collectionCurator1(item.update_count)
        }
      });
    this.devices_forupdatesCompleted = [];
    this.devices_forupdatesCompleted = this.optionMaker(dataToMap, 'updates_completed');
    this.updatesCompletedConf = this.graphGenerator('Total Number of Updates Completed', undefined, dataToMap, [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]);
  }

  generateGraph4WithDrop(data, selectedPartner) {

    let dataToMap = data.filter(item => item.partner == selectedPartner)
      .map(item => {
        return {
          name: item.model,
          data: this.collectionCuratorForApk(item.apk_version_count)
        }
      });
      this.devices_forAPK = this.optionMaker(dataToMap, 'devices_forAPK');      
      this.APKConf = this.graphGenerator('Total Devices on APK version', 'APK Version', dataToMap, ['2.0.2', '2.0.3']);
  }


  fetchData() {

    // 1. Devices Activated
    this.AppService.getDevicesActivated().subscribe((data: any) => {

      this.raw_devicesActivated = data;
      this.partners1 = this.makePartnersDrop(data);
      this.selectedPartner1 = this.partners1[0]['value'];

      this.generateGraph1WithDrop(data, this.selectedPartner1);
    });

    //2. Updates Pushed
    this.AppService.getUpdatesPushed().subscribe((data: any) => {
      this.raw_updatesPushed = data;
      this.partners2 = this.makePartnersDrop(data);
      this.selectedPartner2 = this.partners2[0]['value'];

      this.generateGraph2WithDrop(data, this.selectedPartner2);

    });

    //3. Updates Completed
    this.AppService.getUpdatesCompleted().subscribe((data: any) => {
      this.raw_updatesCompleted = data;
      this.partners3 = this.makePartnersDrop(data);
      this.selectedPartner3 = this.partners3[0]['value'];

      this.generateGraph3WithDrop(data, this.selectedPartner3);

    });
    // 4.
    this.AppService.getTotalOnAPK().subscribe((data: any) => {
      this.raw_apkData = data;
      this.partners4 = this.makePartnersDrop(data);
      this.selectedPartner4 = this.partners4[0]['value'];
      this.generateGraph4WithDrop(data, this.selectedPartner3);
    });

    //5. Device Models
    this.AppService.getDeviceModelsData().subscribe((data: any) => {
      
            this.deviceModels = data.map((item, index) => {
              this.selected_deviceModels.push(index);
              return {
                label: item.partner,
                value: index
              }
            });
      
            let dataToMap = data.map(item => {
              return {
                name: item.partner,
                data: [item.count]
              }
            });
      
            let xAxis = data.map(item => {
              return item.partner
            })
      
            this.deviceModelsConf = this.graphGenerator('Total Device Models', 'Device Models', dataToMap, xAxis, false);
      
          })


  }

  onPartnerChange1(event) {
    this.selectedActivatedDevices = [];
    this.generateGraph1WithDrop(this.raw_devicesActivated, event.value);
  }

  onPartnerChange2(event) {
    this.selected_devices_forupdatesPushed = [];
    this.generateGraph2WithDrop(this.raw_updatesPushed, event.value);
  }

  onPartnerChange3(event) {
    this.selected_devices_forupdatesCompleted = [];
    this.generateGraph3WithDrop(this.raw_updatesCompleted, event.value);
  }

  onPartnerChange4(event) {
    this.selected_devices_forAPK = [];
    this.generateGraph4WithDrop(this.raw_apkData, event.value);
  }




  collectionCurator(dataStack) {

    let res = Array(12).fill(0);
    dataStack.forEach(item => {
      res[item.month - 1] = item.total;
    });
    return res;
  }

  collectionCurator1(dataStack) {

    let res = Array(12).fill(0);
    dataStack.forEach(item => {
      res[item.month - 1] = item.count;
    });

    return res;
  }

  collectionCuratorForApk(dataStack) {
    let res = [];
    Object.keys(dataStack).map(key => {
      res.push(dataStack[key]);
    });
    return res;
  }


}
