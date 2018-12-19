import { TestBed, inject } from '@angular/core/testing';

import { UserIconService } from './user-icon.service';

describe('UserIconService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserIconService]
    });
  });

  it('should be created', inject([UserIconService], (service: UserIconService) => {
    expect(service).toBeTruthy();
  }));
});
