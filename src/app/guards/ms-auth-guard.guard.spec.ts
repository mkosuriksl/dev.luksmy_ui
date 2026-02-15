import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { msAuthGuardGuard } from './ms-auth-guard.guard';

describe('msAuthGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => msAuthGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
