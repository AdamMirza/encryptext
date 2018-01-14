import { TestBed, inject } from '@angular/core/testing';

import { PrivateKeyService } from './private-key.service';

describe('PrivateKeyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrivateKeyService]
    });
  });

  it('should be created', inject([PrivateKeyService], (service: PrivateKeyService) => {
    expect(service).toBeTruthy();
  }));
});
