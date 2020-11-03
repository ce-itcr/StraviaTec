import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliationManagementComponent } from './affiliation-management.component';

describe('AffiliationManagementComponent', () => {
  let component: AffiliationManagementComponent;
  let fixture: ComponentFixture<AffiliationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliationManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
