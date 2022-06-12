import { TestBed } from '@angular/core/testing';

import { HandleErrorMessageInterceptor } from './handle-error-message.interceptor';

describe('HandleErrorMessageInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HandleErrorMessageInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HandleErrorMessageInterceptor = TestBed.inject(HandleErrorMessageInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
