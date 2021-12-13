/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ComponentsRegistryService } from './components-registry.service';

describe('Service: ComponentsRegistry', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentsRegistryService],
      teardown: { destroyAfterEach: false },
    });
  });

  it('should ...', inject(
    [ComponentsRegistryService],
    (service: ComponentsRegistryService) => {
      expect(service).toBeTruthy();
    },
  ));
});
