/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InjectorRegistryService } from './injector-registry.service';

describe('Service: InjectorRegistry', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InjectorRegistryService],
    });
  });

  it('should ...', inject(
    [InjectorRegistryService],
    (service: InjectorRegistryService) => {
      expect(service).toBeTruthy();
    },
  ));
});
