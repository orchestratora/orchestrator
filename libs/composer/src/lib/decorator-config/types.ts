import { Type } from '@angular/core';
import { ControlContainer, ValidatorFn } from '@angular/forms';

export interface ControlConfigComponent<E = any> {
  /** @Input() */
  name: string;
  /** @Input() */
  parent: ControlContainer;
  /** @Input() */
  extras?: E;
}

export type GetControlConfigComponentExtras<
  C
> = C extends ControlConfigComponent<infer E> ? E : C;

/**
 * Represents instruction to render and validate configuration for specific Decorator
 */
export interface ControlConfig<C = any> {
  validators: ValidatorFn[];
  component: Type<C>;
  default?: any;
  required?: boolean;
  extras: GetControlConfigComponentExtras<C>;
}

export interface ControlConfigObject {
  [key: string]: ControlConfig;
}

/**
 * Type that represents any property decorator factory
 */
export type PropDecoratorFactory = (...args: any[]) => PropertyDecorator;

/**
 * Function that instructs how to render and validate configuration for specific Decorator
 */
export type DecoratorConfigFn<T extends PropDecoratorFactory, C = any> = (
  config: ControlConfig<C>,
  args: Parameters<T>,
  type: any,
) => void;

export type DecoratorConfigInitFn<T extends PropDecoratorFactory, C = any> = (
  config: ControlConfig<C>,
  args: Parameters<T>,
  type: any,
  decorator: T,
) => void;

/**
 * Same as {@see DecoratorConfigFn} but with extra DI injected arguments at the beginning
 */
export type DecoratorConfigFnWithDeps<
  T extends PropDecoratorFactory,
  D extends any[],
  C = any
> = (deps: D, config: ControlConfig<C>, args: Parameters<T>) => void;

export type AnyDecoratorConfigFn<
  T extends PropDecoratorFactory = any,
  D extends any[] = any,
  C = any
> = DecoratorConfigFn<T, C> | DecoratorConfigFnWithDeps<T, D, C>;

/**
 * Internal representation of required data
 * to apply custom Decorator configuration functions
 * @internal
 */
export interface DecoratorConfigDef<
  T extends PropDecoratorFactory,
  D extends any[] = any[]
> {
  type: PropDecoratorFactory;
  symbol: symbol;
  fn: AnyDecoratorConfigFn<T, D>;
}

/**
 * Factory type that produces {@see DecoratorConfigDef}
 */
export type DecoratorConfigDefFactory = (
  ...args: []
) => DecoratorConfigDef<any>;

/**
 * Same as {@see DecoratorConfigDefFactory} but with DI dependencies
 */
export type DecoratorConfigDefFactoryWithDeps<D extends any[]> = (
  ...args: D
) => DecoratorConfigDef<any, D>;

/**
 * Factory type that produces {@see DecoratorConfigDef}
 * and runs for all decorators as initializer
 */
export type InitialDecoratorConfigDefFactory = (
  ...args: any[]
) => DecoratorConfigInitFn<any, any>;
