import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanIntegrationComponent } from './plan-integration.component';

describe('PlanIntegrationComponent', () => {
  let component: PlanIntegrationComponent;
  let fixture: ComponentFixture<PlanIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
