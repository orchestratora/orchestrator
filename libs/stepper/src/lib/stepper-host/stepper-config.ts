import { Injectable } from '@angular/core';
import { Option, OrchestratorConfigItem } from '@orchestrator/core';

import { StepperContext } from '../step-host';

@Injectable()
export class StepperConfig {
  @Option()
  loopSteps?: boolean;

  @Option()
  header?: OrchestratorConfigItem<any, StepperContext>;

  @Option()
  footer?: OrchestratorConfigItem<any, StepperContext>;
}
