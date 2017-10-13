import { AppService } from "./../../app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  partnerStats = [
    {
      count: null, value: null, label: 'Partners Active:'
    },
    { key: 'deviceModels', label: 'total device models', value:null },
    { key: 'devicesActivated', label: 'total devices activated',value:null },
    { key: 'updatesPushed', label: 'Total updates pushed',value:null },
    { key: 'updatesCompleted', label: 'Total updates completed',value:null }
  ];

  constructor(private AppService: AppService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.AppService.getPartnersData().subscribe((data: any) => {
      this.partnerStats[0]['value'] = data.length;
    });

    this.AppService.getDeviceModelsData().subscribe((data: any) => {
      this.partnerStats[1]['value'] = data.length;
    });

    this.AppService.getDevicesActivated().subscribe((data: any) => {
      this.partnerStats[2]['value'] = data.count;
    });

    this.AppService.getUpdatesPushed().subscribe((data: any) => {
      this.partnerStats[3]['value'] = data.length;
    });
  }
}
