import { Injectable } from '@angular/core';
import { Option, OrchestratorConfigItem } from '@orchestrator/core';

/**
 * @internal
 */
@Injectable({ providedIn: 'root' })
export class ComposerDroppableConfig<C = any> {
  @Option()
  item?: OrchestratorConfigItem<C>;
}
