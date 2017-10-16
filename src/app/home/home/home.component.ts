import { AppService } from "./../../app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  deviceActivatedConf: any;
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

  constructor(private AppService: AppService) {
    //   this.options = {
    //     title : { text : 'simple chart' },
    //     series: [{
    //         data: [29.9, 71.5, 106.4, 129.2],
    //     }]
    // };

  }


  ngOnInit() {

    this.fetchData();
  }

  fetchData() {
    // this.AppService.getPartnersData().subscribe((data: any) => {
    //   this.partnerStats[0]['value'] = data.length;
    // });

    // this.AppService.getDeviceModelsData().subscribe((data: any) => {
    //   this.partnerStats[1]['value'] = data.length;
    // });

    this.AppService.getDevicesActivated().subscribe((data: any) => {

      let dataToMap = data.map(item => {
        return {
          name: item.model,
          data: this.collectionCurator(item.count)
        }
      });

      this.deviceActivatedConf = {
        chart: { type: 'column', width: 800 },
        title: {
          text: 'Total Number of Devices Activated'
        },
        //   legend: {
        //     align: 'right',
        //     x: -30,
        //     verticalAlign: 'top',
        //     y: 25,
        //     floating: true,
        //     borderColor: '#CCC',
        //     borderWidth: 1,
        //     shadow: false
        // },
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
          categories: [
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
          ],
          crosshair: true
        },
        yAxis: {
          // tickInterval: 1,
          min: 1,
          stackLabels: {
            enabled: true
          },
          title: {
            text: 'Total Number'
          }
        },
        series: dataToMap
      };
    });


  }

  collectionCurator(dataStack) {

    let res = Array(12).fill(0);
    dataStack.forEach(item => {
      res[item.month - 1] = item.total;
    });
    return res;
  }
}
