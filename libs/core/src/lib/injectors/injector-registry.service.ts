import {
  Injectable,
  InjectFlags,
  InjectionToken,
  Injector,
  StaticProvider,
  Type,
} from '@angular/core';

@Injectable()
export class InjectorRegistryService implements Injector {
  private injector = this.parentInjector;

  constructor(private parentInjector: Injector) {}

  get<T>(
    token: Type<T> | InjectionToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags,
  ): T;
  get(token: any, notFoundValue?: any, flags?: InjectFlags): any;
  get(token: any, notFoundValue?: any, flags?: InjectFlags): any {
    return this.injector.get(token, notFoundValue, flags);
  }

  addProviders(providers: StaticProvider[]) {
    this.injector = Injector.create({
      providers,
      parent: this.injector,
    });
  }

  reset(parentInjector?: Injector) {
    this.injector = parentInjector || this.parentInjector;
  }
}
