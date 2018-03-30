import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-read-wiki',
  templateUrl: './read-wiki.component.html',
  styleUrls: ['./read-wiki.component.scss']
})
export class ReadWikiComponent implements OnInit {

  wikiWrap: any;
  isLoading: boolean = false;

  constructor(
    private AppService: AppService,
    private router: Router,
    private AuthService: AuthService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.AppService.getWiki().subscribe(data => {
      this.isLoading = false;
      this.wikiWrap = data;
    })
  }

  removeBlock(id:number) {
    this.isLoading = true;
    this.AppService.deleteWikiBlock(id).subscribe(data => {
      this.isLoading = false;
      this.wikiWrap = this.wikiWrap.filter(block => {
        return block.id !== id
      });
    })
  }

  editBlock(id) {
    this.router.navigate([`dashboard/wiki/edit/${id}`]);
  }

  isSuperUser() {
    return this.AuthService.getUserType();
  }

}
