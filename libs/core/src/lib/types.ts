import { Type } from '@angular/core';

export interface OrchestratorConfigItem<C = any> {
  component: OrchestratorDynamicComponentType<C> | string;
  items?: OrchestratorConfigItem<any>[];
  config?: C;
  id?: string;
  classes?: string | string[] | { [name: string]: boolean };
  attributes?: { [attr: string]: string };
}

export interface OrchestratorDynamicComponentInputs<C = any> {
  items?: OrchestratorConfigItem<any>[];
  config?: C;
}

export interface OrchestratorDynamicComponent<C = any>
  extends OrchestratorDynamicComponentInputs<C> {}

export interface OrchestratorDynamicComponentType<C = any>
  extends Type<OrchestratorDynamicComponent<C>> {}

export type GetOrchestratorDynamicComponentConfig<T> = T extends Type<
  OrchestratorDynamicComponent<infer C>
>
  ? C
  : any;
