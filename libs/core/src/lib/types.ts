import { Type } from '@angular/core';

export interface OrchestratorConfigItem<T extends OrchestratorDynamicComponent<any>, C = any> {
  component: Type<T> | string;
  items?: OrchestratorConfigItem<OrchestratorDynamicComponent<any>>[];
  config?: C;
}

export interface OrchestratorDynamicComponentInputs<C = any> {
  items?: OrchestratorConfigItem<OrchestratorDynamicComponent<any>>[];
  config?: C;
}

// tslint:disable-next-line:no-empty-interface
export interface OrchestratorDynamicComponent<T, C = any>
  extends OrchestratorDynamicComponentInputs<C>,
    Type<T> {}
