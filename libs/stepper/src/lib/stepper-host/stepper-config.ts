import { Injectable } from '@angular/core';
import { Option, OrchestratorConfigItem } from '@orchestrator/core';

import { StepConfig } from '../step-host';

export interface StepperContext extends OrchestratorConfigItem<StepConfig> {}

@Injectable()
export class StepperConfig {
  @Option()
  loopSteps?: boolean;

  @Option()
  header?: OrchestratorConfigItem<any, StepperContext>;

  @Option()
  footer?: OrchestratorConfigItem<any, StepperContext>;
}
