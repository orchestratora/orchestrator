import { INJECTOR_MAP_TOKEN } from '@orchestrator/core';

import { Stepper } from './stepper.class';
import { StepperModule } from './stepper.module';

describe('StepperModule', () => {
  describe('static forRoot()', () => {
    it('should return same `ngModule`', () => {
      const res = StepperModule.forRoot();

      expect(res.ngModule).toBe(StepperModule);
    });

    it('should provide `provideInjectorMap` with `Stepper: Stepper`', () => {
      const res = StepperModule.forRoot();

      expect(res.providers).toContainEqual(
        expect.objectContaining({
          provide: INJECTOR_MAP_TOKEN,
          useValue: { Stepper: Stepper },
          multi: true,
        }),
      );
    });
  });
});
