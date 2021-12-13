import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiWebSelectHostComponent } from './ui-web-select-host.component';

describe('UiWebSelectHostComponent', () => {
  let component: UiWebSelectHostComponent;
  let fixture: ComponentFixture<UiWebSelectHostComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UiWebSelectHostComponent],
        schemas: [NO_ERRORS_SCHEMA],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UiWebSelectHostComponent);
    component = fixture.componentInstance;
  });

  it('should render `orc-ui-web-select` with options prop from `config.options`', () => {
    component.config = { options: ['op1', 'op2'] };

    fixture.detectChanges();

    const selectElem = getSelectElem();

    expect(selectElem).toBeTruthy();
    expect(selectElem.properties['options']).toEqual(['op1', 'op2']);
  });

  it('should render `orc-ui-web-select` with `value` prop from `config.value`', () => {
    component.config = { value: 'my-value', options: [] };

    fixture.detectChanges();

    expect(getSelectElem().properties['value']).toBe('my-value');
  });

  it('should render `orc-ui-web-select` with `name` prop from `config.name`', () => {
    component.config = { name: 'my-name', options: [] };

    fixture.detectChanges();

    expect(getSelectElem().properties['name']).toBe('my-name');
  });

  it('should render `orc-ui-web-select` with `multiple` prop from `config.multiple`', () => {
    component.config = { multiple: true, options: [] };

    fixture.detectChanges();

    expect(getSelectElem().properties['multiple']).toBe(true);
  });

  it('should render `orc-ui-web-select` with `size` prop from `config.size`', () => {
    component.config = { size: 2, options: [] };

    fixture.detectChanges();

    expect(getSelectElem().properties['size']).toBe(2);
  });

  it('should render `orc-ui-web-select` with `required` prop from `config.required`', () => {
    component.config = { required: true, options: [] };

    fixture.detectChanges();

    expect(getSelectElem().properties['required']).toBe(true);
  });

  it('should render `orc-ui-web-select` with `disabled` prop from `config.disabled`', () => {
    component.config = { disabled: true, options: [] };

    fixture.detectChanges();

    expect(getSelectElem().properties['disabled']).toBe(true);
  });

  it('should render `orc-ui-web-select` with `tabIndex` prop from `config.tabindex`', () => {
    component.config = { tabindex: 1, options: [] };

    fixture.detectChanges();

    expect(getSelectElem().properties['tabIndex']).toBe(1);
  });

  it('should render `orc-ui-web-select` with `autofocus` prop from `config.autofocus`', () => {
    component.config = { autofocus: true, options: [] };

    fixture.detectChanges();

    expect(getSelectElem().properties['autofocus']).toBe(true);
  });

  function getSelectElem() {
    return fixture.debugElement.query(By.css('orc-ui-web-select'));
  }
});
