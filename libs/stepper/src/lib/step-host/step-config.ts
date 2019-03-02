import { Option, OrchestratorConfigItem } from '@orchestrator/core';

import { StepperContext } from '../stepper-host';

export class StepConfig {
  @Option({ required: true })
  id: string;

  @Option()
  name?: string;

  @Option()
  header?: OrchestratorConfigItem<any, StepperContext> | boolean = true;

  @Option()
  footer?: OrchestratorConfigItem<any, StepperContext> | boolean = true;
}
