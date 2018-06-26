import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedReportComponent } from './deleted-report.component';

describe('DeletedReportComponent', () => {
  let component: DeletedReportComponent;
  let fixture: ComponentFixture<DeletedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
