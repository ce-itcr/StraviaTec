import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteActivitiesComponent } from './athlete-activities.component';

describe('AthleteActivitiesComponent', () => {
  let component: AthleteActivitiesComponent;
  let fixture: ComponentFixture<AthleteActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AthleteActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
