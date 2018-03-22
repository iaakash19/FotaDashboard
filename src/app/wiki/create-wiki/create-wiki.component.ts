import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-wiki',
  templateUrl: './create-wiki.component.html',
  styleUrls: ['./create-wiki.component.scss'],
  providers: [MessageService]
})
export class CreateWikiComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  wikiForm: FormGroup;
  msgs: Message[] = [];
  isLoading: boolean = false;
  wikiToEdit: any;
  editMode: boolean = false;
  showForm: boolean = false;

  ngOnInit() {

    this.route.params.subscribe((data: any) => {
      debugger;
      if (data && Object.keys(data).length) {
        this.editMode = true;
        this.getWikiBlock(data.id);
        debugger;
      }
      else {
        this.initForm();
      }
    });


  }

  getWikiBlock(id) {
    this.appService.getWikiBlock(id).subscribe(data => {
      this.wikiToEdit = data;
      this.initForm(this.wikiToEdit);
    })
  }

  get wikis(): FormArray {
    return <FormArray>this.wikiForm.get('queryBlock');
  }

  initForm(initData?) {
    this.showForm = true;
    this.wikiForm = this.fb.group({
      queryBlock: this.fb.array([this.initQueryBlock(initData)])
    })
  }

  initQueryBlock(initData?) {
    return this.fb.group({
      question: [initData ? initData.question : '', Validators.required],
      answer: [initData ? initData.answer : '', Validators.required]
    })
  }

  addBlock() {
    this.wikis.push(this.initQueryBlock());
  }

  removeBlock(i) {
    this.wikis.removeAt(i);
  }

  submit() {
    this.isLoading = true;

    if(this.editMode) {
      this.appService.editWikiBlock(this.wikiToEdit.id, this.wikiForm.value.queryBlock).subscribe(data => {
        this.isLoading = false;
        this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Wiki Edited Successfully...' });
        this.router.navigate(['dashboard/wiki']);
      },
        err => {
          this.isLoading = false;
          const errMsg = JSON.parse(err.error).err_msg;
          this.messageService.add({ severity: 'error', summary: 'Message', detail: errMsg });
        }
      );
    }else {
      this.appService.createWiki(this.wikiForm.value.queryBlock).subscribe(data => {
        this.isLoading = false;
        this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Wiki Created Successfully...' });
        this.wikiForm.reset();
      },
        err => {
          this.isLoading = false;
          const errMsg = JSON.parse(err.error).err_msg;
          this.messageService.add({ severity: 'error', summary: 'Message', detail: errMsg });
        }
      );
    }



  }

}
