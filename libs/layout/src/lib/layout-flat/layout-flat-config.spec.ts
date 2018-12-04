import { OrchestratorLayoutFlatConfig } from './layout-flat-config';

xdescribe('OrchestratorLayoutFlatConfig', () => {
  it('should have sensible default values', () => {
    const config = new OrchestratorLayoutFlatConfig();

    expect(config.direction).toMatch('row');
    expect(config.wrap).toBe('wrap');
    expect(config.justify).toBe('space-between');
    expect(config.alignItems).toBe('center');
  });
});
