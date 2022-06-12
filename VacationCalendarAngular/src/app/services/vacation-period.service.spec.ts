import { TestBed } from '@angular/core/testing';

import { VacationPeriodService } from './vacation-period.service';

describe('VacationPeriodServiceService', () => {
  let service: VacationPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacationPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
