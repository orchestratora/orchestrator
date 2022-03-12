import { Component, DebugElement, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  DynamicComponent,
  OrchestratorConfigItem,
  OrchestratorCoreModule,
} from '@orchestrator/core';
import { HtmlTagConfig } from './html-tag-config';
import { HtmlTagComponent } from './html-tag.component';

describe('HtmlTagComponent', () => {
  @Component({
    selector: 'orc-test',
    template: `<orc-html-tag [items]="items" [config]="config"></orc-html-tag>`,
  })
  class TestComponent {
    items?: OrchestratorConfigItem<unknown>[];
    config?: HtmlTagConfig;
  }

  @Injectable({ providedIn: 'root' })
  class TextComponentConfig {
    text?: string;
  }

  @Component({
    selector: 'orc-text',
    template: `{{ config?.text }}`,
  })
  @DynamicComponent({ config: TextComponentConfig })
  class TextComponent {
    items?: OrchestratorConfigItem<unknown>[];
    config?: TextComponentConfig;
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OrchestratorCoreModule.forRoot(),
        OrchestratorCoreModule.withComponents([TextComponent]),
      ],
      declarations: [HtmlTagComponent, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should not render anything when config.tag is not set', () => {
    component.config = {};

    fixture.detectChanges();

    const componentElem = getComponentElem();

    expect(componentElem.children.length).toBe(0);
  });

  it('should render html tag from config.tag', () => {
    component.config = { tag: 'div' };

    fixture.detectChanges();

    const componentElem = getComponentElem();

    expect(componentElem.children.length).toBe(1);
    expect(componentElem.children[0].name.toLowerCase()).toBe('div');
  });

  it('should not re-render when config.tag is same', () => {
    component.config = { tag: 'div' };

    fixture.detectChanges();

    const componentElem1 = getComponentElem();
    const divElem1 = componentElem1.children[0];

    component.config = { tag: 'div' };

    fixture.detectChanges();

    const componentElem2 = getComponentElem();
    const divElem2 = componentElem2.children[0];

    expect(divElem1).toBe(divElem2);
  });

  it('should clear tag after config.tag is unset', () => {
    component.config = { tag: 'div' };

    fixture.detectChanges();

    expect(getComponentElem().children.length).toBe(1);

    component.config = {};

    fixture.detectChanges();

    expect(getComponentElem().children.length).toBe(0);
  });

  it('should render tag with namespace when config.namespace is set', () => {
    component.config = { tag: 'div', namespace: 'xxx' };

    fixture.detectChanges();

    const componentElem = getComponentElem();
    const divElem = componentElem.children[0];

    expect(divElem.name.toLowerCase()).toBe('div');
    expect(divElem.nativeElement.namespaceURI).toBe('xxx');
  });

  describe('attributes', () => {
    it('should render from config.attributes', () => {
      component.config = {
        tag: 'div',
        attributes: { attr1: 'value1', attr2: 'value2' },
      };

      fixture.detectChanges();

      const componentElem = getComponentElem();
      const divElem = componentElem.children[0];

      expect(divElem.nativeElement.getAttribute('attr1')).toBe('value1');
      expect(divElem.nativeElement.getAttribute('attr2')).toBe('value2');
    });

    it('should update when config.attributes changed', () => {
      component.config = {
        tag: 'div',
        attributes: { attr1: 'value1', attr2: 'value2', attr3: 'value3' },
      };

      fixture.detectChanges();

      component.config = {
        tag: 'div',
        attributes: { attr1: 'value1', attr2: 'value22', attr4: 'value4' },
      };

      fixture.detectChanges();

      const componentElem = getComponentElem();
      const divElem = componentElem.children[0];

      expect(divElem.nativeElement.getAttribute('attr1')).toBe('value1');
      expect(divElem.nativeElement.getAttribute('attr2')).toBe('value22');
      expect(divElem.nativeElement.getAttribute('attr3')).toBe(null);
      expect(divElem.nativeElement.getAttribute('attr4')).toBe('value4');
    });

    it('should clear when config.attributes is empty object', () => {
      component.config = {
        tag: 'div',
        attributes: { attr1: 'value1', attr2: 'value2' },
      };

      fixture.detectChanges();

      component.config = {
        tag: 'div',
        attributes: {},
      };

      fixture.detectChanges();

      const componentElem = getComponentElem();
      const divElem = componentElem.children[0];

      expect(divElem.nativeElement.getAttribute('attr1')).toBe(null);
      expect(divElem.nativeElement.getAttribute('attr2')).toBe(null);
    });
  });

  describe('properties', () => {
    it('should render from config.properties', () => {
      component.config = {
        tag: 'div',
        properties: { prop1: 'value1', prop2: true, prop3: 3 },
      };

      fixture.detectChanges();

      const componentElem = getComponentElem();
      const divElem = componentElem.children[0];

      expect(divElem.nativeElement.prop1).toBe('value1');
      expect(divElem.nativeElement.prop2).toBe(true);
      expect(divElem.nativeElement.prop3).toBe(3);
    });

    it('should update when config.properties changed', () => {
      component.config = {
        tag: 'div',
        properties: { prop1: 'value1', prop2: true, prop3: 3 },
      };

      fixture.detectChanges();

      component.config = {
        tag: 'div',
        properties: { prop1: 'value1', prop2: false, prop4: { prop4: true } },
      };

      fixture.detectChanges();

      const componentElem = getComponentElem();
      const divElem = componentElem.children[0];

      expect(divElem.nativeElement.prop1).toBe('value1');
      expect(divElem.nativeElement.prop2).toBe(false);
      expect(divElem.nativeElement.prop3).toBe(undefined);
      expect(divElem.nativeElement.prop4).toEqual({ prop4: true });
    });

    it('should clear when config.properties is empty object', () => {
      component.config = {
        tag: 'div',
        properties: { prop1: 'value1', prop2: true, prop3: 3 },
      };

      fixture.detectChanges();

      component.config = {
        tag: 'div',
        properties: {},
      };

      fixture.detectChanges();

      const componentElem = getComponentElem();
      const divElem = componentElem.children[0];

      expect(divElem.nativeElement.prop1).toBe(undefined);
      expect(divElem.nativeElement.prop2).toBe(undefined);
      expect(divElem.nativeElement.prop3).toBe(undefined);
    });
  });

  it('should render items inside of the tag from items', () => {
    component.items = [
      { component: 'orc-text', config: { text: 'text1' } },
      { component: 'orc-text', config: { text: 'text2' } },
    ];
    component.config = { tag: 'div' };

    fixture.detectChanges();

    const componentElem = getComponentElem();
    const divElem = componentElem.children[0];
    const textElems = divElem.queryAll(By.css('orc-text'));

    expect(textElems.length).toBe(2);
    expect(textElems[0].nativeElement.textContent).toMatch('text1');
    expect(textElems[1].nativeElement.textContent).toMatch('text2');
  });

  it('should clear item when items unset', () => {
    component.items = [{ component: 'orc-text', config: { text: 'text' } }];
    component.config = { tag: 'div' };

    fixture.detectChanges();

    component.items = [];

    fixture.detectChanges();

    const componentElem = getComponentElem();
    const divElem = componentElem.children[0];
    const textElem = divElem.query(By.css('orc-text'));

    expect(textElem).toBeFalsy();
  });

  describe('getElement() method', () => {
    it('should return rendered tag element', () => {
      component.config = { tag: 'div' };

      fixture.detectChanges();

      const componentElem = getComponentElem();
      const divElem = componentElem.children[0];

      expect(componentElem.componentInstance.getElement()).toBe(
        divElem.nativeElement,
      );
    });

    it('should return undefined when no tag rendered', () => {
      component.config = {};

      fixture.detectChanges();

      const componentElem = getComponentElem();

      expect(componentElem.componentInstance.getElement()).toBe(undefined);
    });
  });

  function getComponentElem(): Omit<DebugElement, 'componentInstance'> & {
    componentInstance: HtmlTagComponent;
  } {
    return fixture.debugElement.query(By.directive(HtmlTagComponent));
  }
});
