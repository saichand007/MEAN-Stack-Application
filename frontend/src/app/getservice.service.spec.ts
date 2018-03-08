import { TestBed, inject } from '@angular/core/testing';

import { GetserviceService } from './getservice.service';

describe('GetserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetserviceService]
    });
  });

  it('should be created', inject([GetserviceService], (service: GetserviceService) => {
    expect(service).toBeTruthy();
  }));
});
