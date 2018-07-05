import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameAccreditationComponent } from './name-accreditation.component';

describe('NameAccreditationComponent', () => {
  let component: NameAccreditationComponent;
  let fixture: ComponentFixture<NameAccreditationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NameAccreditationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameAccreditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
