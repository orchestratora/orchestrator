import { async, TestBed } from '@angular/core/testing';
import { OrchestratorCoreModule } from './core.module';

describe('CoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OrchestratorCoreModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(OrchestratorCoreModule).toBeDefined();
  });
});
