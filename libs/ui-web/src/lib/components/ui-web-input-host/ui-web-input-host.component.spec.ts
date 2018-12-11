import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UiWebInputHostComponent } from './ui-web-input-host.component';

describe('UiWebInputHostComponent', () => {
  let component: UiWebInputHostComponent;
  let fixture: ComponentFixture<UiWebInputHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiWebInputHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiWebInputHostComponent);
    component = fixture.componentInstance;
  });

  it('should render input with name from `config.name`', () => {
    component.config = { name: 'myInput' };

    fixture.detectChanges();

    const inputElem = fixture.debugElement.query(By.css('input'));

    expect(inputElem).toBeTruthy();
    expect(inputElem.nativeElement.name).toMatch('myInput');
  });

  describe('label option', () => {
    it('should render input with label if label is passed', () => {
      component.config = { name: 'myInput', label: 'My Label' };

      fixture.detectChanges();

      const labelElem = fixture.debugElement.query(By.css('label'));

      expect(labelElem).toBeTruthy();
      expect(labelElem.nativeElement.textContent).toMatch('My Label');
    });
  });

  describe('id option', () => {
    testTextAttribute('id', 'myInput');

    it('should render input with label if label option is supplied', () => {
      component.config = { name: 'myInput', id: 'myInput', label: 'My Label' };

      fixture.detectChanges();

      const labelElem = fixture.debugElement.query(By.css('label[for=myInput]'));

      expect(labelElem).toBeTruthy();
    });
  });

  describe('type option', () => {
    it('should render input type text by default', () => {
      component.config = { name: 'myInput', id: 'myInput' };

      fixture.detectChanges();

      const inputElem = fixture.debugElement.query(By.css('input[type=text]'));

      expect(inputElem).toBeTruthy();
    });

    testTextAttribute('type', 'button');
  });

  describe('value option', () => {
    testTextAttribute('value', 'some value');
  });

  describe('placeholder option', () => {
    testTextAttribute('placeholder', 'My Input');
  });

  describe('required option', () => {
    testBooleanAttribute('required');
  });

  describe('readonly option', () => {
    testBooleanAttribute('readonly', 'readOnly');
  });

  describe('disabled option', () => {
    testBooleanAttribute('disabled');
  });

  describe('autofocus option', () => {
    testBooleanAttribute('autofocus');
  });

  describe('autocomplete option', () => {
    testTextAttribute('autocomplete', 'off');
  });

  describe('tabindex option', () => {
    it('should render input with tabindex attribute', () => {
      component.config = { name: 'myInput', tabindex: 2 };

      fixture.detectChanges();

      const inputElem = fixture.debugElement.query(By.css('input'));

      expect(inputElem).toBeTruthy();
      expect(inputElem.nativeElement.tabIndex).toEqual(2);
    });

    testTextAttribute('type', 'button');
  });

  function testTextAttribute(name: string, value: string) {
    it(`should render input with ${name} attribute`, () => {
      component.config = { name: 'myInput', id: 'myInput', [name]: value };

      fixture.detectChanges();

      const inputElem = fixture.debugElement.query(By.css('input'));

      expect(inputElem).toBeTruthy();
      expect(inputElem.nativeElement[name]).toMatch(value);
    });
  }

  function testBooleanAttribute(name: string, htmlName: string = name) {
    it(`should render input with ${name} attribute`, () => {
      component.config = { name: 'myInput', id: 'myInput', [name]: true };

      fixture.detectChanges();

      const inputElem = fixture.debugElement.query(By.css('input'));

      expect(inputElem).toBeTruthy();
      expect(inputElem.nativeElement[htmlName]).toEqual(true);
    });
  }
});
