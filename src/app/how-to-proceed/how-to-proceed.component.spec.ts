import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToProceedComponent } from './how-to-proceed.component';

describe('HowToProceedComponent', () => {
  let component: HowToProceedComponent;
  let fixture: ComponentFixture<HowToProceedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HowToProceedComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToProceedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
