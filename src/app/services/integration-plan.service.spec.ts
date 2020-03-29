import { TestBed } from '@angular/core/testing';

import { IntegrationPlanService } from './integration-plan.service';

describe('IntegrationPlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntegrationPlanService = TestBed.get(IntegrationPlanService);
    expect(service).toBeTruthy();
  });
});
