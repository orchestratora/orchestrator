import { Injectable } from '@angular/core';
import {
  Option,
  OrchestratorConfigItem,
  OrchestratorDynamicComponentType,
} from '@orchestrator/core';

/**
 * @internal
 */
@Injectable({ providedIn: 'root' })
export class ComposerDroppableConfig<C = any> {
  @Option()
  component?: string | OrchestratorDynamicComponentType;

  @Option()
  item?: OrchestratorConfigItem<C>;

  @Option()
  prevItem?: OrchestratorConfigItem<C>;
}
