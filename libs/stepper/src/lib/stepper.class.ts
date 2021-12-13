import { OrchestratorDynamicComponent } from '@orchestrator/core';

export abstract class Stepper {
  steps: OrchestratorDynamicComponent[] | undefined;
  currentStep: OrchestratorDynamicComponent | undefined;
  currentStepIdx: number | undefined;
  stepsCount: number;
  abstract goTo(offsetOrName: string | number, stepData?: any): Promise<void>;
  abstract goNext(stepData?: any): Promise<void>;
  abstract goBack(stepData?: any): Promise<void>;
  abstract goToStart(stepData?: any): Promise<void>;
  abstract goToEnd(stepData?: any): Promise<void>;
  abstract activateStep(idx: number, stepData?: any): Promise<void>;
}
