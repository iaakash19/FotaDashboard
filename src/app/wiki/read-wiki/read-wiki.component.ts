import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-read-wiki',
  templateUrl: './read-wiki.component.html',
  styleUrls: ['./read-wiki.component.scss']
})
export class ReadWikiComponent implements OnInit {

  wikiWrap: any;

  constructor(
    private AppService: AppService
  ) { }

  ngOnInit() {
    this.AppService.getWiki().subscribe(data => {
      this.wikiWrap = data;
      debugger;
    })
  }

}
