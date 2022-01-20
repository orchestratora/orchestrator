import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiWebTextareaHostComponent } from './ui-web-textarea-host.component';

describe('UiWebTextareaHostComponent', () => {
  let component: UiWebTextareaHostComponent;
  let fixture: ComponentFixture<UiWebTextareaHostComponent>;

  beforeEach(
    waitForAsync(async () => {
      await TestBed.configureTestingModule({
        declarations: [UiWebTextareaHostComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();

      fixture = TestBed.createComponent(UiWebTextareaHostComponent);
      component = fixture.componentInstance;
    }),
  );

  it('should render textarea with text from `config.value`', () => {
    testConfig('value', 'some text', (textareaElem) =>
      expect(textareaElem.nativeElement.textContent).toMatch('some text'),
    );
  });

  testConfigProp('name', 'my-name');
  testConfigProp('placeholder', 'description');
  testConfigAttr('cols', 10);
  testConfigAttr('rows', 15);
  testConfigProp('maxlength', 50, 'maxLength');
  testConfigProp('minlength', 5, 'minLength');
  testConfigAttr('spellcheck', true);
  testConfigProp('wrap', 'soft');
  testConfigProp('readonly', true, 'readOnly');
  testConfigProp('disabled', true);
  testConfigProp('required', true);
  testConfigProp('autofocus', true);
  testConfigProp('tabindex', 1, 'tabIndex');

  function testConfigProp(name: string, value: any, propName = name) {
    it(`should render textarea with prop '${propName}' from 'config.${name}'`, () => {
      testConfig(name, value, (textareaElem) =>
        expect(textareaElem.properties[propName]).toBe(value),
      );
    });
  }

  function testConfigAttr(name: string, value: any, arrtName = name) {
    it(`should render textarea with attr '${arrtName}' from 'config.${name}'`, () => {
      testConfig(name, value, (textareaElem) =>
        expect(textareaElem.attributes[arrtName]).toBe(String(value)),
      );
    });
  }

  function testConfig(
    name: string,
    value: unknown,
    testFn: (textareaElem: DebugElement) => void,
  ) {
    component.config = { [name]: value };

    fixture.detectChanges();

    const textareaElem = fixture.debugElement.query(By.css('textarea'));

    expect(textareaElem).toBeTruthy();
    testFn(textareaElem);
  }
});
