import { InjectionToken, Provider } from '@angular/core';

import {
  AnyDecoratorConfigFn,
  DecoratorConfigDef,
  DecoratorConfigDefFactory,
  DecoratorConfigDefFactoryWithDeps,
  DecoratorConfigFn,
  DecoratorConfigFnWithDeps,
  InitialDecoratorConfigDefFactory,
  PropDecoratorFactory,
  DecoratorConfigInitFn,
} from './types';

/**
 * Multi-token that provides `DecoratorConfigDefFactory`
 * for every `Decorator` used in components configuration
 */
export const DECORATOR_CONFIGS_TOKEN = new InjectionToken<
  DecoratorConfigDef<any>[]
>('DecoratorConfigs');

/**
 * Multi-token that provides `DecoratorConfigDefFactory`
 * for initialization used in components configuration
 */
export const DECORATOR_CONFIGS_INITIALIZER_TOKEN = new InjectionToken<
  DecoratorConfigInitFn<any>[]
>('DecoratorConfigsInitializer');

/**
 * Creates factory for Decorator configuration function
 */
export function createDecoratorConfigFactory<
  C = any,
  T extends PropDecoratorFactory = PropDecoratorFactory
>(decoratorType: T, fn: DecoratorConfigFn<T, C>): DecoratorConfigDefFactory;
/**
 * Creates factory for Decorator configuration function with DI dependencies
 */
export function createDecoratorConfigFactory<
  D extends any[],
  C = any,
  T extends PropDecoratorFactory = PropDecoratorFactory
>(
  decoratorType: T,
  fn: DecoratorConfigFnWithDeps<T, D, C>,
): DecoratorConfigDefFactoryWithDeps<D>;
/**
 * Please use one of the provided overloads
 * @internal
 */
export function createDecoratorConfigFactory<
  D extends any[],
  T extends PropDecoratorFactory
>(
  decoratorType: T,
  fn: AnyDecoratorConfigFn<T, D>,
): DecoratorConfigDefFactory | DecoratorConfigDefFactoryWithDeps<D> {
  return (...args: any[]) => ({
    type: decoratorType,
    symbol: Symbol(decoratorType.name),
    fn: args.length ? fn.bind(null, args) : fn,
  });
}

/**
 * Creates factory for initial Decorator configuration function with optional DI dependencies
 */
export function createDecoratorInitFactory<C = any>(
  fn: DecoratorConfigInitFn<any, C>,
): InitialDecoratorConfigDefFactory {
  return (...args: any[]) => (args.length ? fn.bind(null, args) : fn);
}

/**
 * Creates provider for initial Decorator configuration factory
 */
export function provideInitialDecoratorConfig(
  configDefFactory: InitialDecoratorConfigDefFactory,
  deps?: any[],
): Provider {
  return {
    provide: DECORATOR_CONFIGS_INITIALIZER_TOKEN,
    useFactory: configDefFactory,
    deps,
    multi: true,
  };
}

/**
 * Creates provider for Decorator configuration factory
 */
export function provideDecoratorConfig(
  configDefFactory: DecoratorConfigDefFactory,
): Provider;
/**
 * Creates provider for Decorator configuration factory with DI dependencies
 */
export function provideDecoratorConfig<D extends any[]>(
  configDefFactory: DecoratorConfigDefFactoryWithDeps<D>,
  deps: D,
): Provider;
/**
 * Please use one of the provided overloads
 * @internal
 */
export function provideDecoratorConfig(
  configDefFactory:
    | DecoratorConfigDefFactory
    | DecoratorConfigDefFactoryWithDeps<any>,
  deps?: any[],
): Provider {
  return {
    provide: DECORATOR_CONFIGS_TOKEN,
    useFactory: configDefFactory,
    deps,
    multi: true,
  };
}
