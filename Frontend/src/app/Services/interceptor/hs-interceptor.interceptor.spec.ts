import { TestBed } from '@angular/core/testing';

import { HSInterceptorInterceptor } from './hs-interceptor.interceptor';

describe('HSInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HSInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HSInterceptorInterceptor = TestBed.inject(HSInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
