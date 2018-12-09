import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UiWebInputHostComponent } from './ui-web-input-host.component';

describe.only('UiWebInputHostComponent', () => {
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
    it('should render input with id', () => {
      component.config = { name: 'myInput', id: 'myInput' };

      fixture.detectChanges();

      const inputElem = fixture.debugElement.query(By.css('input#myInput'));

      expect(inputElem).toBeTruthy();
    });

    it('should render input with label if label option is supplied', () => {
      component.config = { name: 'myInput', id: 'myInput', label: 'My Label' };

      fixture.detectChanges();

      const labelElem = fixture.debugElement.query(By.css('label[for=myInput]'));

      expect(labelElem).toBeTruthy();
    });
  });
});
