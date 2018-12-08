import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OrchestratorConfigItem, OrchestratorCoreModule } from '@orchestrator/core';

import {
  UiWebButtonHostComponent,
  UiWebImageHostComponent,
  UiWebLabelHostComponent,
} from './components';
import { UiWebModule } from './ui-web.module';

@Component({
  selector: 'orc-host-comp',
  template: `<orc-orchestrator [config]="config"></orc-orchestrator>`,
})
class HostComponent {
  config: OrchestratorConfigItem;
}

describe('UiWebModule', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComp: HostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiWebModule, OrchestratorCoreModule],
      declarations: [HostComponent],
    });
  }));

  const init = async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(HostComponent);
      hostComp = fixture.componentInstance;
    });
  });

  describe('UiWebButtonHostComponent', () => {
    beforeEach(init);

    it('should be rendered from config', () => {
      hostComp.config = { component: UiWebButtonHostComponent };

      fixture.detectChanges();

      const buttonElem = fixture.debugElement.query(By.directive(UiWebButtonHostComponent));

      expect(buttonElem).toBeTruthy();
    });
  });

  describe('UiWebLabelHostComponent', () => {
    beforeEach(init);

    it('should be rendered from config', () => {
      hostComp.config = { component: UiWebLabelHostComponent };

      fixture.detectChanges();

      const labelElem = fixture.debugElement.query(By.directive(UiWebLabelHostComponent));

      expect(labelElem).toBeTruthy();
    });
  });

  describe('UiWebImageHostComponent', () => {
    beforeEach(init);

    it('should be rendered from config', () => {
      hostComp.config = { component: UiWebImageHostComponent };

      fixture.detectChanges();

      const imageElem = fixture.debugElement.query(By.directive(UiWebImageHostComponent));

      expect(imageElem).toBeTruthy();
    });
  });
});
