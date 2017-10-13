import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import {Message} from 'primeng/primeng';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;


  loginForm: FormGroup;
  msgs: Message[] = [];
  username_errorMsg:string = null;
  password_errorMsg = null;

  username_control: AbstractControl;
  userNameBlurs$: Observable<any>;

  password_control: AbstractControl;
  passwordBlurs$: Observable<any>;

  errorMsgs = {
    required: 'This field is Required',
    minLength: 'This field should have minimum length'
  }

  constructor( private Router: Router, private AuthService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    
    // username
    this.username_control =  this.loginForm.get('username');
    this.userNameBlurs$ = Observable.fromEvent(this.username.nativeElement, 'blur');
    let username_control$ = this.loginForm.get('username').valueChanges;

    Observable.merge(username_control$, this.userNameBlurs$).subscribe(data => this.checkControl(this.username_control, 'username'));

    //password
    this.password_control =  this.loginForm.get('password');
    this.passwordBlurs$ = Observable.fromEvent(this.password.nativeElement, 'blur');
    let password_control$ = this.loginForm.get('password').valueChanges;

    Observable.merge(password_control$, this.passwordBlurs$).subscribe(data => this.checkControl(this.password_control, 'password'));

  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    
    this.ControlObserver();
  }

  ControlObserver() {

    const password_control = this.loginForm.get('password');
    password_control.valueChanges.subscribe(data => this.checkControl(password_control, 'password'));

  }

  checkControl(c: AbstractControl, control) {
    if(control == 'username') {
      this.username_errorMsg = null;
      if( (c.touched || c.dirty) && c.errors) {
        this.username_errorMsg = Object.keys(c.errors).map(key => {
          return this.errorMsgs[key]
        }).join(' ');
      }
    }else {
      this.password_errorMsg = null;
      if( (c.touched || c.dirty) && c.errors) {
        this.password_errorMsg = Object.keys(c.errors).map(key => {
          return this.errorMsgs[key]
        }).join(' ');
      }
    }
   
   
  }

  onLogin() {
    this.AuthService.login(this.loginForm.value).subscribe(
      (data:any) => {
        this.AuthService.setToken(data.token);
        this.Router.navigate(['dashboard/home']);
      },
      err =>  {
        this.msgs.push({severity:'error', summary:'Error', detail:err.error.ErrMsg})
        setTimeout(() => {
          this.msgs = [];
        }, 1500);
      }
    )
  }
}
