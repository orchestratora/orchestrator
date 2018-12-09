import { UiWebTextAreaConfig } from './ui-web-textarea-config';
import { TestBed } from '@angular/core/testing';

describe('UiWebTextAreaConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiWebTextAreaConfig],
    });
  });

  it('should exist', () => {
    expect(UiWebTextAreaConfig).toBeTruthy();
  });

  it('should set `cols` to `20`', () => {
    expect(getConfig().cols).toBe(20);
  });

  it('should set `rows` to `2`', () => {
    expect(getConfig().rows).toBe(2);
  });

  function getConfig(): UiWebTextAreaConfig {
    return TestBed.get(UiWebTextAreaConfig);
  }
});
