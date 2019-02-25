import { InjectionToken, Type } from '@angular/core';

export interface OrchestratorConfigItem<C = any, CTX = any> {
  component: OrchestratorDynamicComponentType<C> | string;
  items?: OrchestratorConfigItem<any, CTX>[];
  config?: C;
  id?: string;
  classes?: string | string[] | { [name: string]: boolean };
  attributes?: { [attr: string]: string };
  handlers?: { [event: string]: Function | string };
}

export interface OrchestratorDynamicComponentInputs<C = any, CTX = any> {
  items?: OrchestratorConfigItem<any>[];
  config?: C;
  context?: CTX;
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

export interface InjectorMap {
  [token: string]: Type<any> | InjectionToken<any>;
}

export type InferContexts<T> = InferContext<T, keyof T>;

export type InferContext<T, K extends keyof T = never> = K extends never
  ? InferItemContext<T>
  : InferItemContext<T[K]>;

export type InferItemContext<T> = T extends OrchestratorConfigItem<any, infer C>
  ? C
  : never;

export type FunctionWithArg<C, T = void> = ($context: C, ...args: any[]) => T;
