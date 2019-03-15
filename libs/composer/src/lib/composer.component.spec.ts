import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposerCanvasModule } from './composer-canvas';
import { ComposerComponentsModule } from './composer-components';
import { ComposerConfigModule } from './composer-config';
import { ComposerControlsModule } from './composer-controls';
import { ComposerErrorsModule } from './composer-errors';
import { ComposerPreviewModule } from './composer-preview';
import { ComposerComponent } from './composer.component';

describe('ComposerComponent', () => {
  let component: ComposerComponent;
  let fixture: ComponentFixture<ComposerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComposerCanvasModule,
        ComposerComponentsModule,
        ComposerPreviewModule,
        ComposerConfigModule,
        ComposerErrorsModule,
        ComposerControlsModule,
      ],
      declarations: [ComposerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
