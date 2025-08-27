import { TestBed } from '@angular/core/testing';

import { AngularSetupLibService } from './angular-setup-lib.service';

describe('AngularSetupLibService', () => {
  let service: AngularSetupLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularSetupLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
