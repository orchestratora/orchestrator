import { TestBed } from '@angular/core/testing';
import { ComposerModule } from './composer.module';

describe('ComposerModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComposerModule],
    }).compileComponents();
  });

  it('should create', () => {
    expect(ComposerModule).toBeDefined();
  });
});
