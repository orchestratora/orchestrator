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

  it('should render attributes from config.attributes', () => {
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

  it('should update attributes when config.attributes changed', () => {
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
