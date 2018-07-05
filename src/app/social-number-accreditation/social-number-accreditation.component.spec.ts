import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialNumberAccreditationComponent } from './social-number-accreditation.component';

describe('SocialNumberAccreditationComponent', () => {
  let component: SocialNumberAccreditationComponent;
  let fixture: ComponentFixture<SocialNumberAccreditationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SocialNumberAccreditationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialNumberAccreditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
