import { TestBed } from '@angular/core/testing';

import { FormResetService } from './form-reset.service';

describe('FormResetService', () => {
  let service: FormResetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormResetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
