import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOemComponent } from './register-oem.component';

describe('RegisterOemComponent', () => {
  let component: RegisterOemComponent;
  let fixture: ComponentFixture<RegisterOemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterOemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
