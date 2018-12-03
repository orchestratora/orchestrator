import { TestBed } from '@angular/core/testing';

import { COMPONENTS } from '../component-map';
import { ComponentLocatorService } from './component-locator.service';

describe('ComponentLocatorService', () => {
  let service: ComponentLocatorService;
  let compMapMock: any = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
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
