import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerLayoutComponent } from './organizer-layout.component';

describe('OrganizerLayoutComponent', () => {
  let component: OrganizerLayoutComponent;
  let fixture: ComponentFixture<OrganizerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizerLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
