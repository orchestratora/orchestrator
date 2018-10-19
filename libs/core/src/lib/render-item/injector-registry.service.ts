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
  private injector: Injector;

  constructor(injector: Injector) {
    this.injector = injector;
  }

  get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
  get(token: any, notFoundValue?: any): any;
  get(token, notFoundValue?, flags?: InjectFlags): any {
    return this.injector.get(token, notFoundValue, flags);
  }

  addProviders(providers: StaticProvider[]) {
    this.injector = Injector.create({
      providers,
      parent: this.injector,
    });
  }
}
