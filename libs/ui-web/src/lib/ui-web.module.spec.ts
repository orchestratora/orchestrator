import { async, TestBed } from '@angular/core/testing';
import { UiWebModule } from './ui-web.module';

describe('UiWebModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiWebModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiWebModule).toBeDefined();
  });
});
