import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UiWebTextareaHostComponent } from './ui-web-textarea-host.component';

describe('UiWebTextareaHostComponent', () => {
  let component: UiWebTextareaHostComponent;
  let fixture: ComponentFixture<UiWebTextareaHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiWebTextareaHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiWebTextareaHostComponent);
    component = fixture.componentInstance;
  });

  it('should render textarea with text from `config.value`', () => {
    component.config = { ...getDefaultConfig(), value: 'some text' };

    fixture.detectChanges();

    const textareaElem = fixture.debugElement.query(By.css('textarea'));

    expect(textareaElem).toBeTruthy();
    expect(textareaElem.nativeElement.textContent).toMatch('some text');
  });

  testConfigProp('name', 'my-name');
  testConfigProp('placeholder', 'description');
  testConfigProp('cols', 10);
  testConfigProp('rows', 15);
  testConfigProp('maxlength', 50, 'maxLength');
  testConfigProp('minlength', 5, 'minLength');
  testConfigProp('spellcheck', true);
  testConfigProp('wrap', 'soft');
  testConfigProp('readonly', true, 'readOnly');
  testConfigProp('disabled', true);
  testConfigProp('required', true);
  testConfigProp('autofocus', true);
  testConfigProp('tabindex', 1, 'tabIndex');

  function testConfigProp(name: string, value: any, propName = name) {
    it(`should render textarea with '${propName}' from 'config.${name}'`, () => {
      component.config = { ...getDefaultConfig(), [name]: value };

      fixture.detectChanges();

      const textareaElem = fixture.debugElement.query(By.css('textarea'));

      expect(textareaElem).toBeTruthy();
      expect(textareaElem.properties[propName]).toBe(value);
    });
  }

  function getDefaultConfig() {
    return { rows: 2, cols: 20 };
  }
});
