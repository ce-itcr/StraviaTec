import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesManagementComponent } from './challenges-management.component';

describe('ChallengesManagementComponent', () => {
  let component: ChallengesManagementComponent;
  let fixture: ComponentFixture<ChallengesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengesManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
