import { TestBed } from '@angular/core/testing';

import { TemplateserviceService } from './templateservice.service';

describe('TemplateserviceService', () => {
  let service: TemplateserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
