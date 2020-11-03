import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceManagementComponent } from './race-management.component';

describe('RaceManagementComponent', () => {
  let component: RaceManagementComponent;
  let fixture: ComponentFixture<RaceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
