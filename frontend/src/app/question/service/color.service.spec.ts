import { TestBed, inject } from '@angular/core/testing';

import { ColorService } from './color.service';

describe('ColorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorService]
    });
  });

  it('should return rnd color', inject([ColorService], (service: ColorService) => {
    expect(service.getRandomColor).not.toBeUndefined();
  }));
});
