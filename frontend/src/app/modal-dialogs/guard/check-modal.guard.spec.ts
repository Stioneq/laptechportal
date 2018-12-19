import { TestBed, async, inject } from '@angular/core/testing';

import { CheckModalGuard } from './check-modal.guard';

describe('CheckModalGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckModalGuard]
    });
  });

  it('should ...', inject([CheckModalGuard], (guard: CheckModalGuard) => {
    expect(guard).toBeTruthy();
  }));
});
