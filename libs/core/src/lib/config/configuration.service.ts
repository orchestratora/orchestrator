import { Injectable, Type } from '@angular/core';
import { genIoType } from '@orchestrator/gen-io-ts';
import { left } from 'fp-ts/lib/Either';
import { none, Option, some } from 'fp-ts/lib/Option';
import { Errors, Type as IoCodec, Validation } from 'io-ts';

import { ConfigurationMeta, getConfigs } from '../metadata/configuration';
import { ConfigurationErrorStrategy } from './configuration-error-strategy';

@Injectable()
export class ConfigurationService {
  private codecMap = new Map<Type<any>, IoCodec<any>>();

  constructor(private configurationErrorStrategy: ConfigurationErrorStrategy) {}

  decode<T, C extends T>(type: Type<T>, config: C): T | C {
    return this.validate(type, config).fold(
      () => config,
      decodedConfig => decodedConfig,
    );
  }

  validate<T, C extends T>(type: Type<T>, config: C): Validation<T | C> {
    const validation = this.getCodecFor(type).foldL(
      () => left<Errors, T | C>([]),
      codec => codec.decode(config),
    );

    if (validation.isLeft() && type) {
      this.configurationErrorStrategy.handle(validation, type, config);
    }

    return validation;
  }

  getMetaOf(type: Type<any>): ConfigurationMeta[] {
    return getConfigs(type);
  }

  private getCodecFor<T>(type: Type<T>): Option<IoCodec<T>> {
    if (!type) {
      return none;
    }

    try {
      const codec = this.codecMap.get(type) || genIoType(type);
      this.codecMap.set(type, codec); // Set codec back to cache
      return some(codec);
    } catch {
      return none;
    }
  }
}
