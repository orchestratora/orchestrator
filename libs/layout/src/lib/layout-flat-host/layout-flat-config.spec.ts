import { LayoutFlatConfig } from './layout-flat-config';

describe('LayoutFlatConfig', () => {
  describe('static merge()', () => {
    it('should return new merged config', () => {
      const config1 = new LayoutFlatConfig();
      const config2 = new LayoutFlatConfig();

      config1.justify = 'flex-end';
      config1.direction = 'inherit';
      config2.alignItems = 'baseline';
      config2.wrap = 'nowrap';

      expect(LayoutFlatConfig.merge(config1, config2)).toEqual({
        justify: 'flex-end',
        direction: 'inherit',
        alignItems: 'baseline',
        wrap: 'nowrap',
      });
    });

    it('should merged configs with last overriding previous', () => {
      const config1 = new LayoutFlatConfig();
      const config2 = new LayoutFlatConfig();
      const config3 = new LayoutFlatConfig();

      config1.wrap = 'inherit';
      config2.wrap = 'wrap';
      config3.wrap = 'nowrap';

      expect(LayoutFlatConfig.merge(config1, config2, config3)).toEqual({ wrap: 'nowrap' });
    });
  });
});
