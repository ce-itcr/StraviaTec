import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTermsComponent } from './app-terms.component';

describe('AppTermsComponent', () => {
  let component: AppTermsComponent;
  let fixture: ComponentFixture<AppTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppTermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
