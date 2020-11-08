import { TestBed } from '@angular/core/testing';

import { ComunicationService } from './comunication.service';

describe('ComunicationService', () => {
  let service: ComunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
