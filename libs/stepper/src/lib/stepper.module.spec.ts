import * as core from '@orchestrator/core';

import { Stepper } from './stepper';
import { StepperModule } from './stepper.module';

describe('StepperModule', () => {
  describe('static forRoot()', () => {
    it('should return same `ngModule`', () => {
      const res = StepperModule.forRoot();

      expect(res.ngModule).toBe(StepperModule);
    });

    it('should provide `provideInjectorMap` with `Stepper: Stepper`', () => {
      const provideInjectorMap = spyOn(
        core,
        'provideInjectorMap',
      ).and.returnValue('stepper-map');

      const res = StepperModule.forRoot();

      expect(provideInjectorMap).toHaveBeenCalledWith({ Stepper: Stepper });
      expect(res.providers).toContainEqual('stepper-map');
    });
  });
});
