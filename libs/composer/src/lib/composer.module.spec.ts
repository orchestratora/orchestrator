import { async, TestBed } from '@angular/core/testing';
import { ComposerModule } from './composer.module';

describe('ComposerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComposerModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ComposerModule).toBeDefined();
  });
});
