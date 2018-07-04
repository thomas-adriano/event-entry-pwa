import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosAccreditationComponent } from './pos-accreditation.component';

describe('PosAccreditationComponent', () => {
  let component: PosAccreditationComponent;
  let fixture: ComponentFixture<PosAccreditationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosAccreditationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosAccreditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
