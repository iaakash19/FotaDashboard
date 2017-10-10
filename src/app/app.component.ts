import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
constructor(private AppService: AppService) {

}

ngOnInit() {
//   this.AppService.toggleBody$.subscribe(data => {
//     debugger;
// if(data == 'on') {
//   document.body.classList.add('white-mask');
// }else {
//   document.body.classList.remove('white-mask');
// }
//   })
}
}
