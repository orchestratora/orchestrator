import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OrchestratorCoreModule } from '@orchestrator/core';

import { LayoutFlexModule } from '../flex';
import { LayoutFlatConfig } from './layout-flat-config';
import { LayoutFlatHostComponent } from './layout-flat-host.component';

@Component({
  selector: 'orc-host-comp',
  template: `
    <orc-layout-flat-host
      [items]="items"
      [config]="config"
    ></orc-layout-flat-host>
  `,
})
class HostComponent {
  items: any;
  config: LayoutFlatConfig;
}

describe('LayoutFlatHostComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComp: HostComponent;
  let compElem: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayoutFlexModule],
      declarations: [LayoutFlatHostComponent, HostComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  const init = async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(HostComponent);
      hostComp = fixture.componentInstance;
      compElem = fixture.debugElement.query(
        By.directive(LayoutFlatHostComponent),
      );
    });
  });

  describe('by default', () => {
    beforeEach(init);

    it('should render `orc-layout-flat` component', () => {
      fixture.detectChanges();

      expect(compElem).toBeTruthy();
      expect(compElem.query(By.css('orc-layout-flat'))).toBeTruthy();
    });

    it('should set `items` input to `orc-layout-flat` component', () => {
      hostComp.items = 'my-items';
      fixture.detectChanges();

      expect(getLayoutElem().properties['items']).toBe('my-items');
    });

    it('should set `flex-wrap` style on `orc-layout-flat` from `config.wrap`', () => {
      hostComp.config = { wrap: 'wrap-reverse' };
      fixture.detectChanges();

      expect(getLayoutElem().styles['flex-wrap']).toBe('wrap-reverse');
    });

    it('should set `flex-direction` style on `orc-layout-flat` from `config.direction`', () => {
      hostComp.config = { direction: 'column' };
      fixture.detectChanges();

      expect(getLayoutElem().styles['flex-direction']).toBe('column');
    });

    it('should set `justify-content` style on `orc-layout-flat` from `config.justify`', () => {
      hostComp.config = { justify: 'space-around' };
      fixture.detectChanges();

      expect(getLayoutElem().styles['justify-content']).toBe('space-around');
    });

    it('should set `align-items` style on `orc-layout-flat` from `config.alignItems`', () => {
      hostComp.config = { alignItems: 'stretch' };
      fixture.detectChanges();

      expect(getLayoutElem().styles['align-items']).toBe('stretch');
    });

    it('should set `align-content` style on `.orc-layout-flat` from `config.alignContent`', () => {
      hostComp.config = { alignContent: 'flex-end' };
      fixture.detectChanges();

      expect(getLayoutElem().styles['align-content']).toBe('flex-end');
    });
  });

  describe('default layout styles from DI `LayoutFlatConfig`', () => {
    let defaultConfig: LayoutFlatConfig;

    beforeEach(done => {
      defaultConfig = {
        alignContent: 'space-around',
        alignItems: 'flex-start',
        direction: 'row',
        justify: 'space-between',
        wrap: 'nowrap',
      };

      TestBed.configureTestingModule({
        imports: [
          OrchestratorCoreModule.withComponents([LayoutFlatHostComponent]),
        ],
        providers: [{ provide: LayoutFlatConfig, useValue: defaultConfig }],
      }).overrideTemplate(
        HostComponent,
        `<orc-orchestrator [config]="items"></orc-orchestrator>`,
      );

      init(done);
    });

    function updateCompElem() {
      fixture.detectChanges();
      compElem = fixture.debugElement.query(
        By.directive(LayoutFlatHostComponent),
      );
      fixture.detectChanges();
    }

    it('should be applied', () => {
      hostComp.items = { component: LayoutFlatHostComponent };

      updateCompElem();

      const layoutElem = getLayoutElem();

      expect(layoutElem.styles['flex-wrap']).toBe(defaultConfig.wrap);
      expect(layoutElem.styles['flex-direction']).toBe(defaultConfig.direction);
      expect(layoutElem.styles['justify-content']).toBe(defaultConfig.justify);
      expect(layoutElem.styles['align-items']).toBe(defaultConfig.alignItems);
      expect(layoutElem.styles['align-content']).toBe(
        defaultConfig.alignContent,
      );
    });

    it('should be overridden by `config` input', () => {
      hostComp.items = {
        component: LayoutFlatHostComponent,
        config: {
          direction: 'column',
          wrap: 'inherit',
        },
      };

      updateCompElem();

      const layoutElem = getLayoutElem();

      expect(layoutElem.styles['flex-wrap']).toBe('inherit');
      expect(layoutElem.styles['flex-direction']).toBe('column');
      expect(layoutElem.styles['justify-content']).toBe(defaultConfig.justify);
      expect(layoutElem.styles['align-items']).toBe(defaultConfig.alignItems);
      expect(layoutElem.styles['align-content']).toBe(
        defaultConfig.alignContent,
      );
    });
  });

  function getLayoutElem(): DebugElement {
    return compElem.query(By.css('orc-layout-flat'));
  }
});
