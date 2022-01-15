import { COMPONENTS } from './components-token';
import { OrchestratorCoreModule } from './core.module';
import { ErrorStrategy } from './error-strategy/error-strategy';
import { ThrowErrorStrategy } from './error-strategy/throw-error-strategy';
import { LOCAL_INJECTOR_MAP } from './injectors/local-injector-map';
import { INJECTOR_MAP_TOKEN } from './injectors/mapped-injector';
import { STATIC_INJECTOR_MAP } from './injectors/static-injector-map';

describe('OrchestratorCoreModule', () => {
  describe('forRoot() static method', () => {
    it('should provide `ErrorStrategy` token via useClass `ThrowErrorStrategy`', () => {
      const res = OrchestratorCoreModule.forRoot();

      expect(res.providers).toContainEqual(
        expect.objectContaining({
          provide: ErrorStrategy,
          useClass: ThrowErrorStrategy,
        }),
      );
    });

    it('should provide `INJECTOR_MAP_TOKEN` multi token via useValue `STATIC_INJECTOR_MAP`', () => {
      const res = OrchestratorCoreModule.forRoot();

      expect(res.providers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            provide: INJECTOR_MAP_TOKEN,
            useValue: STATIC_INJECTOR_MAP,
            multi: true,
          }),
        ]),
      );
    });

    it('should provide `INJECTOR_MAP_TOKEN` multi token via useValue `LOCAL_INJECTOR_MAP`', () => {
      const res = OrchestratorCoreModule.forRoot();

      expect(res.providers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            provide: INJECTOR_MAP_TOKEN,
            useValue: LOCAL_INJECTOR_MAP,
            multi: true,
          }),
        ]),
      );
    });
  });

  describe('withComponents() static method', () => {
    it('should provide `COMPONENTS` multi token with `components` array', () => {
      const comps = ['comp1', 'comp2'] as any;

      const res = OrchestratorCoreModule.withComponents(comps);

      expect(res.providers).toContainEqual(
        expect.objectContaining({
          provide: COMPONENTS,
          useValue: comps,
          multi: true,
        }),
      );
    });

    it('should provide `COMPONENTS` multi token with `components` map', () => {
      const comps = { comp1: 'real-comp1', comp2: 'real-comp2' } as any;

      const res = OrchestratorCoreModule.withComponents(comps);

      expect(res.providers).toContainEqual(
        expect.objectContaining({
          provide: COMPONENTS,
          useValue: comps,
          multi: true,
        }),
      );
    });

    it('should provide `ErrorStrategy` token via useClass `ThrowErrorStrategy`', () => {
      const res = OrchestratorCoreModule.withComponents([]);

      expect(res.providers).toContainEqual(
        expect.objectContaining({
          provide: ErrorStrategy,
          useClass: ThrowErrorStrategy,
        }),
      );
    });

    it('should provide `INJECTOR_MAP_TOKEN` multi token via useValue `STATIC_INJECTOR_MAP`', () => {
      const res = OrchestratorCoreModule.withComponents([]);

      expect(res.providers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            provide: INJECTOR_MAP_TOKEN,
            useValue: STATIC_INJECTOR_MAP,
            multi: true,
          }),
        ]),
      );
    });

    it('should provide `INJECTOR_MAP_TOKEN` multi token via useValue `LOCAL_INJECTOR_MAP`', () => {
      const res = OrchestratorCoreModule.withComponents([]);

      expect(res.providers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            provide: INJECTOR_MAP_TOKEN,
            useValue: LOCAL_INJECTOR_MAP,
            multi: true,
          }),
        ]),
      );
    });
  });

  describe('registerComponents() static method', () => {
    it('should provide `COMPONENTS` multi token with `components` array', () => {
      const comps = ['comp1', 'comp2'] as any;

      const res = OrchestratorCoreModule.registerComponents(comps);

      expect(res).toContainEqual(
        expect.objectContaining({
          provide: COMPONENTS,
          useValue: comps,
          multi: true,
        }),
      );
    });

    it('should provide `COMPONENTS` multi token with `components` map', () => {
      const comps = { comp1: 'real-comp1', comp2: 'real-comp2' } as any;

      const res = OrchestratorCoreModule.registerComponents(comps);

      expect(res).toContainEqual(
        expect.objectContaining({
          provide: COMPONENTS,
          useValue: comps,
          multi: true,
        }),
      );
    });
  });
});
