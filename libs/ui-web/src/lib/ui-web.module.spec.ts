import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OrchestratorConfigItem } from '@orchestrator/core';
import { OrchestratorCoreTestingModule } from '@orchestrator/core/testing';
import {
  UiWebButtonHostComponent,
  UiWebHeadingHostComponent,
  UiWebImageHostComponent,
  UiWebInputHostComponent,
  UiWebSelectHostComponent,
  UiWebTextareaHostComponent,
  UiWebTextHostComponent,
} from './components';
import { UiWebModule } from './ui-web.module';

@Component({
  selector: 'orc-host-comp',
  template: ` <orc-orchestrator [config]="config"></orc-orchestrator> `,
})
class HostComponent {
  config: OrchestratorConfigItem;
}

describe('UiWebModule', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComp: HostComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          UiWebModule.forRoot(),
          OrchestratorCoreTestingModule.withComponents([
            UiWebButtonHostComponent,
            UiWebHeadingHostComponent,
            UiWebImageHostComponent,
            UiWebInputHostComponent,
            UiWebSelectHostComponent,
            UiWebTextareaHostComponent,
            UiWebTextHostComponent,
          ]),
        ],
        declarations: [HostComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    hostComp = fixture.componentInstance;
  });

  describe('UiWebButtonHostComponent', () => {
    it('should be rendered from config', () => {
      hostComp.config = {
        component: UiWebButtonHostComponent,
        config: { text: 'text' },
      };

      fixture.detectChanges();

      const buttonElem = fixture.debugElement.query(
        By.directive(UiWebButtonHostComponent),
      );

      expect(buttonElem).toBeTruthy();
    });
  });

  describe('UiWebTextHostComponent', () => {
    it('should be rendered from config', () => {
      hostComp.config = { component: UiWebTextHostComponent };

      fixture.detectChanges();

      const labelElem = fixture.debugElement.query(
        By.directive(UiWebTextHostComponent),
      );

      expect(labelElem).toBeTruthy();
    });
  });

  describe('UiWebImageHostComponent', () => {
    it('should be rendered from config', () => {
      hostComp.config = {
        component: UiWebImageHostComponent,
        config: { src: 'url' },
      };

      fixture.detectChanges();

      const imageElem = fixture.debugElement.query(
        By.directive(UiWebImageHostComponent),
      );

      expect(imageElem).toBeTruthy();
    });
  });

  describe('UiWebHeadingHostComponent', () => {
    it('should be rendered from config', () => {
      hostComp.config = {
        component: UiWebHeadingHostComponent,
        config: { text: 'text' },
      };

      fixture.detectChanges();

      const headingElem = fixture.debugElement.query(
        By.directive(UiWebHeadingHostComponent),
      );

      expect(headingElem).toBeTruthy();
    });
  });

  describe('UiWebInputHostComponent', () => {
    it('should be rendered from config', () => {
      hostComp.config = { component: UiWebInputHostComponent };

      fixture.detectChanges();

      const inputElem = fixture.debugElement.query(
        By.directive(UiWebInputHostComponent),
      );

      expect(inputElem).toBeTruthy();
    });
  });

  describe('UiWebSelectHostComponent', () => {
    it('should be rendered from config', () => {
      hostComp.config = { component: UiWebSelectHostComponent };

      fixture.detectChanges();

      const selectElem = fixture.debugElement.query(
        By.directive(UiWebSelectHostComponent),
      );

      expect(selectElem).toBeTruthy();
    });
  });

  describe('UiWebTextareaHostComponent', () => {
    it('should be rendered from config', () => {
      hostComp.config = { component: UiWebTextareaHostComponent };

      fixture.detectChanges();

      const textareaElem = fixture.debugElement.query(
        By.directive(UiWebTextareaHostComponent),
      );

      expect(textareaElem).toBeTruthy();
    });
  });
});
