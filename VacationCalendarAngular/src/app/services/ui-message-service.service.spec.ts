import { TestBed } from '@angular/core/testing';

import { UiMessageServiceService } from './ui-message-service.service';

describe('UiMessageServiceService', () => {
  let service: UiMessageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiMessageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
