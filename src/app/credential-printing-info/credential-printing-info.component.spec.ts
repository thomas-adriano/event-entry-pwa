import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialPrintingInfoComponent } from './credential-printing-info.component';

describe('CredentialPrintingInfoComponent', () => {
  let component: CredentialPrintingInfoComponent;
  let fixture: ComponentFixture<CredentialPrintingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialPrintingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialPrintingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
