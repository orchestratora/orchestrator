/* eslint-disable @typescript-eslint/no-unused-vars */
import { TestBed, inject } from '@angular/core/testing';
import { InjectorRegistryService } from './injector-registry.service';

describe('Service: InjectorRegistry', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InjectorRegistryService],
      teardown: { destroyAfterEach: false },
    });
  });

  it('should ...', inject(
    [InjectorRegistryService],
    (service: InjectorRegistryService) => {
      expect(service).toBeTruthy();
    },
  ));
});
