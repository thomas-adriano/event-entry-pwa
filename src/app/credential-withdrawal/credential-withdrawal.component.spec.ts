import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialWithdrawalComponent } from './credential-withdrawal.component';

describe('CredentialWithdrawalComponent', () => {
  let component: CredentialWithdrawalComponent;
  let fixture: ComponentFixture<CredentialWithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredentialWithdrawalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
