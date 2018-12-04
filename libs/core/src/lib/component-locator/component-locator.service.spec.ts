import { Component, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { COMPONENTS } from '../component-map';
import { ComponentLocatorService } from './component-locator.service';

@Component({ selector: 'orc-test-comp', template: '' })
class TestComponent {}

@NgModule({
  declarations: [TestComponent],
  entryComponents: [TestComponent],
})
class TestModule {}

describe('ComponentLocatorService', () => {
  let service: ComponentLocatorService;
  let compMapMock: any = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        ComponentLocatorService,
        { provide: COMPONENTS, useValue: compMapMock, multi: true },
      ],
    });
    service = TestBed.get(ComponentLocatorService);
  });

  it('should return same component if it`s a function', () => {
    const myComp: any = () => null;
    expect(service.resolve(myComp)).toBe(myComp);
  });

  it('should return `undefined` if string does not match', () => {
    expect(service.resolve('comp')).toBeUndefined();
  });

  describe('when components as array', () => {
    beforeAll(() => (compMapMock = [TestComponent]));

    it('should return component by it`s selector', () => {
      expect(service.resolve('orc-test-comp')).toEqual(TestComponent);
    });
  });

  describe('when map has component', () => {
    beforeAll(() => (compMapMock = { comp1: 'comp1', comp2: 'comp2' }));

    it('should return mapped component when match', () => {
      expect(service.resolve('comp1')).toBe('comp1');
      expect(service.resolve('comp2')).toBe('comp2');
    });

    it('should return `undefined` when no match', () => {
      expect(service.resolve('comp3')).toBeUndefined();
    });
  });
});
