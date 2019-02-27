import { OrchestratorDynamicComponent } from '@orchestrator/core';

export abstract class Stepper {
  steps: OrchestratorDynamicComponent[] | undefined;
  currentStep: OrchestratorDynamicComponent | undefined;
  currentStepIdx: number | undefined;
  stepsCount: number;
  abstract async goTo(offsetOrName: string | number, stepData?: any);
  abstract async goNext(stepData?: any);
  abstract async goBack(stepData?: any);
  abstract async goToStart(stepData?: any);
  abstract async goToEnd(stepData?: any);
  abstract async activateStep(idx: number, stepData?: any);
}
