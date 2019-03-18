import { Component, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { COMPONENTS } from '../component-map';
import { DynamicComponent } from '../metadata';
import { ComponentLocatorService } from './component-locator.service';

@Component({ selector: 'orc-test-comp', template: '' })
class TestComponent {}

@Component({ selector: 'orc-test-comp2', template: '' })
class Test2Component {}

@NgModule({
  declarations: [TestComponent, Test2Component],
  entryComponents: [TestComponent, Test2Component],
})
class TestModule {}

describe('ComponentLocatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        ComponentLocatorService,
        { provide: COMPONENTS, useValue: [], multi: true },
      ],
      teardown: { destroyAfterEach: false },
    });
  });

  describe('resolve() method', () => {
    it('should return same component if it`s a function', () => {
      const myComp: any = () => null;
      expect(getService().resolve(myComp)).toBe(myComp);
    });

    it('should return `undefined` if string does not match', () => {
      expect(getService().resolve('comp')).toBeUndefined();
    });

    describe('when components as array', () => {
      beforeEach(() =>
        TestBed.configureTestingModule({
          providers: [
            { provide: COMPONENTS, useValue: [TestComponent], multi: true },
          ],
          teardown: { destroyAfterEach: false },
        }),
      );

      it('should return component by it`s selector', () => {
        expect(getService().resolve('orc-test-comp')).toEqual(TestComponent);
      });
    });

    describe('when components as map', () => {
      beforeEach(() =>
        TestBed.configureTestingModule({
          providers: [
            {
              provide: COMPONENTS,
              useValue: { comp1: 'comp1', comp2: 'comp2' },
              multi: true,
            },
          ],
          teardown: { destroyAfterEach: false },
        }),
      );

      it('should return mapped component when match', () => {
        expect(getService().resolve('comp1')).toBe('comp1');
        expect(getService().resolve('comp2')).toBe('comp2');
      });

      it('should return `undefined` when no match', () => {
        expect(getService().resolve('comp3')).toBeUndefined();
      });
    });
  });

  describe('getDefaultConfig() method', () => {
    it('should return `null` if component undefined', () => {
      expect(getService().getDefaultConfig(undefined)).toBeNull();
    });

    it('should return `null` if metadata does NOT exist', () => {
      expect(getService().getDefaultConfig(class {})).toBeNull();
    });

    it('should return resolved config via DI', () => {
      class MyConfig {
        myVal: true;
      }

      @DynamicComponent({ config: MyConfig })
      class MyComp {}

      TestBed.configureTestingModule({
        providers: [MyConfig],
        teardown: { destroyAfterEach: false },
      });

      expect(getService().getDefaultConfig(MyComp)).toEqual(
        expect.any(MyConfig),
      );
    });
  });

  describe('getComponents() method', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: COMPONENTS,
            useValue: { test: TestComponent },
            multi: true,
          },
          { provide: COMPONENTS, useValue: [Test2Component], multi: true },
        ],
      });
    });

    it('should return all available components flattened', () => {
      const comps = getService().getComponents();

      expect(comps).toEqual(
        expect.arrayContaining([TestComponent, Test2Component]),
      );
    });
  });
});

function getService(): ComponentLocatorService {
  return TestBed.inject(ComponentLocatorService);
}
