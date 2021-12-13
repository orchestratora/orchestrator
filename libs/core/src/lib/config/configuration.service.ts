import { Injectable, Injector, Type } from '@angular/core';
import { genIoType } from '@orchestrator/gen-io-ts';
import { fold as foldEither, isLeft, left, map } from 'fp-ts/lib/Either';
import { fold, none, Option, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/function';
import { Errors, Type as IoCodec, Validation } from 'io-ts';

import { ErrorStrategy } from '../error-strategy/error-strategy';
import { ConfigurationMeta, getConfigs } from '../metadata/configuration';
import { getArgName, isArgOptional } from '../util';
import { FunctionError } from './function-error';
import { InvalidConfigurationError } from './invalid-configuration-error';
import {
  CustomInjectorFactory,
  FunctionWithMeta,
  OptionFunction,
} from './option/function';

@Injectable()
export class ConfigurationService {
  private codecMap = new Map<Type<any>, IoCodec<any>>();

  constructor(
    private errorStrategy: ErrorStrategy,
    private injector: Injector,
  ) {}

  decode<T>(type: Type<T>, config: T, injector?: Injector): T;
  decode<T, C>(type: Type<T>, config: C, injector?: Injector): T | C;
  decode<T, C>(type: Type<T>, config: C, injector?: Injector): T | C {
    return pipe(
      this.validate(type, config),
      map((c) => this.processFunctions(type, c, config, injector)),
      foldEither(
        () => config,
        (decodedConfig) => decodedConfig,
      ),
    );
  }

  validate<T, C>(type: Type<T>, config: C): Validation<T | C> {
    const validation = pipe(
      this.getCodecFor(type),
      fold(
        () => left<Errors, T>([]),
        (codec) => codec.decode(config),
      ),
    );

    if (isLeft(validation) && type) {
      this.errorStrategy.handle(
        new InvalidConfigurationError(type, validation, config),
      );
    }

    return validation;
  }

  getMetaOf(type: Type<any>): ConfigurationMeta[] {
    return getConfigs(type.prototype);
  }

  private getCodecFor<T>(type: Type<T>): Option<IoCodec<T>> {
    if (!type) {
      return none;
    }

    const codec = this.codecMap.get(type) || genIoType(type);
    this.codecMap.set(type, codec); // Set codec back to cache
    return some(codec);
  }

  private processFunctions<T>(
    type: Type<T>,
    config: T,
    originalConfig: any,
    injector = this.injector,
  ): T {
    const meta = this.getMetaOf(type);

    meta
      .filter((m) => m.decorator === OptionFunction && config[m.prop])
      .forEach((m) => {
        const customInjectorFactory = m.args[0] as CustomInjectorFactory;
        const customInjector = customInjectorFactory
          ? customInjectorFactory(injector)
          : injector;

        const { args, fn } = this.bindFunction(config[m.prop], customInjector);

        config[m.prop] = fn;
        config[m.prop] = this.guardFunction(
          config[m.prop],
          type,
          String(m.prop),
          originalConfig[m.prop],
          args,
        );
      });

    return config;
  }

  private bindFunction(
    fn: FunctionWithMeta,
    injector: Injector,
  ): { fn: FunctionWithMeta; args: any[] } {
    const { args, body } = fn;

    const resolvedArgs = args
      .filter((arg) => !arg.startsWith('$'))
      .map((arg) => this.resolveArg(arg, injector));

    const boundFn = fn.bind(null, ...resolvedArgs) as FunctionWithMeta;
    boundFn.args = args;
    boundFn.body = body;

    return { fn: boundFn, args: resolvedArgs };
  }

  private guardFunction(
    fn: FunctionWithMeta,
    configType: Type<any>,
    fnName: string,
    fnBody: string,
    boundArgs: any[],
  ): FunctionWithMeta {
    const guardedFn = ((...args: any[]) => {
      try {
        return fn(...args);
      } catch (e) {
        this.errorStrategy.handle(
          new FunctionError(configType, e, fnName, fnBody, [
            ...boundArgs,
            ...args,
          ]),
        );
      }
    }) as unknown as FunctionWithMeta;

    guardedFn.args = fn.args;
    guardedFn.body = fn.body;

    return guardedFn;
  }

  private resolveArg(argExpr: string, injector: Injector): any {
    const arg = getArgName(argExpr);
    const isOptional = isArgOptional(argExpr);

    // Dynamically resolve function arguments - no type info available
    // tslint:disable-next-line: deprecation
    const res = injector.get(
      arg,
      isOptional ? null : Injector.THROW_IF_NOT_FOUND,
    );

    return res === null && isOptional ? undefined : res;
  }
}
