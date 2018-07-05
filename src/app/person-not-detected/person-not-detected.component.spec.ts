import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonNotDetectedComponent } from './person-not-detected.component';

describe('PersonNotDetectedComponent', () => {
  let component: PersonNotDetectedComponent;
  let fixture: ComponentFixture<PersonNotDetectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonNotDetectedComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonNotDetectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
