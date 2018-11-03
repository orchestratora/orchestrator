import { OrchestratorFlatLayoutConfig } from './layout-flat-config';

describe('flat-layout-config', () => {
  it('should have sensible default values', () => {
    const config = new OrchestratorFlatLayoutConfig();

    expect(config.direction).toMatch('row');
    expect(config.wrap).toBe('wrap');
    expect(config.justify).toBe('space-between');
    expect(config.alignItems).toBe('center');
    expect(config.columns).toBe(3);
  });
});
