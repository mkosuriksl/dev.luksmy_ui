import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { spAuthGuardGuard } from './sp-auth-guard.guard';

describe('spAuthGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => spAuthGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
