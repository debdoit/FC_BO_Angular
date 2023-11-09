import { TestBed } from '@angular/core/testing';

import { GetcustomerdetailsService } from './getcustomerdetails.service';

describe('GetcustomerdetailsService', () => {
  let service: GetcustomerdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetcustomerdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
