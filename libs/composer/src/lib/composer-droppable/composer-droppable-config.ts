import { Injectable } from '@angular/core';
import {
  Option,
  OptionRequired,
  OrchestratorConfigItem,
  OrchestratorDynamicComponentType,
} from '@orchestrator/core';

@Injectable({ providedIn: 'root' })
export class ComposerDroppableConfig<C = any>
  implements OrchestratorConfigItem<C> {
  @OptionRequired()
  component: string | OrchestratorDynamicComponentType<C>;

  @Option()
  config?: C;

  @Option()
  id?: string;

  @Option()
  classes?: string | string[] | { [name: string]: boolean };

  @Option()
  attributes?: { [attr: string]: string };

  @Option()
  handlers?: { [event: string]: string | Function };
}
