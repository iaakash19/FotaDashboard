import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';


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
    private messageService: MessageService
  ) { }

  wikiForm: FormGroup;
  msgs: Message[] = [];
  isLoading: boolean = false;

  ngOnInit() {
    this.initForm();
  }

  get wikis(): FormArray {
    return <FormArray>this.wikiForm.get('queryBlock');
  }

  initForm() {
    this.wikiForm = this.fb.group({
      queryBlock: this.fb.array([this.initQueryBlock()])
    })
  }

  initQueryBlock() {
    return this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
    })
  }

  addBlock(){
    this.wikis.push(this.initQueryBlock());
  }

  removeBlock(i){
    this.wikis.removeAt(i);
  }

  submit() {

    this.appService.createWiki(this.wikiForm.value.queryBlock).subscribe(data => {
      this.isLoading = true;
      this.isLoading = false;
      this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Wiki Created Successfully...' });
    },
  err => {
    this.isLoading = false;
    const errMsg = JSON.parse(err.error).err_msg;
    this.messageService.add({ severity: 'error', summary: 'Message', detail: errMsg });
  }
  )
  }

}
