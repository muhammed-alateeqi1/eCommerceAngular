import { TestBed } from '@angular/core/testing';

import { SignupAuthService } from './signup-auth.service';

describe('SignupAuthService', () => {
  let service: SignupAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
