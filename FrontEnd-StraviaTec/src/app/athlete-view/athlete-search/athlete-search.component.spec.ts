import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteSearchComponent } from './athlete-search.component';

describe('AthleteSearchComponent', () => {
  let component: AthleteSearchComponent;
  let fixture: ComponentFixture<AthleteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AthleteSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
