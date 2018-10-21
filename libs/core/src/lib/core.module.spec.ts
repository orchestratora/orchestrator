import { OrchestratorCoreModule } from './core.module';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { COMPONENT_MAP, COMPONENTS } from './component-map';

describe('OrchestratorCoreModule', () => {
  describe('withComponents() static method', () => {
    it('should provide `ANALYZE_FOR_ENTRY_COMPONENTS` multi token with `components` array', () => {
      const comps = ['comp1', 'comp2'] as any;

      const res = OrchestratorCoreModule.withComponents(comps);

      expect(res.providers).toContainEqual(
        expect.objectContaining({
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: comps,
          multi: true,
        }),
      );
    });

    it('should provide `COMPONENTS` token with `components` array', () => {
      const comps = ['comp1', 'comp2'] as any;

      const res = OrchestratorCoreModule.withComponents(comps);

      expect(res.providers).toContainEqual(
        expect.objectContaining({
          provide: COMPONENTS,
          useValue: comps,
        }),
      );
    });

    it('should provide `COMPONENT_MAP` token with `compMap`', () => {
      const compMap = 'map' as any;

      const res = OrchestratorCoreModule.withComponents(null, compMap);

      expect(res.providers).toContainEqual(
        expect.objectContaining({
          provide: COMPONENT_MAP,
          useValue: compMap,
        }),
      );
    });
  });
});
