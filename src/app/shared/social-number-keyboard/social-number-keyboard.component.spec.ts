import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialNumberKeyboardComponent } from './social-number.component';

describe('SocialNumberKeyboardComponent', () => {
  let component: SocialNumberKeyboardComponent;
  let fixture: ComponentFixture<SocialNumberKeyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SocialNumberKeyboardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialNumberKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
