import { async, TestBed } from '@angular/core/testing';
import { StepperModule } from './stepper.module';

describe('StepperModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StepperModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StepperModule).toBeDefined();
  });
});
