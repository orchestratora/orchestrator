import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UiWebButtonHostComponent } from './ui-web-button-host.component';

describe('UiWebButtonHostComponent', () => {
  let component: UiWebButtonHostComponent;
  let fixture: ComponentFixture<UiWebButtonHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiWebButtonHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiWebButtonHostComponent);
    component = fixture.componentInstance;
  });

  it('should render button with text from `config.text`', () => {
    component.config = { text: 'my text' };

    fixture.detectChanges();

    const buttonElem = getButton();

    expect(buttonElem).toBeTruthy();
    expect(buttonElem.nativeElement.textContent).toMatch('my text');
  });

  it('should set type of button from `config.type`', () => {
    component.config = { text: 'text', type: 'submit' };

    fixture.detectChanges();

    expect(getButton().properties['type']).toBe('submit');
  });

  it('should set disabled of button from `config.disabled`', () => {
    component.config = { text: 'text', disabled: true };

    fixture.detectChanges();

    expect(getButton().properties['disabled']).toBe(true);
  });

  it('should set tabindex of button from `config.tabindex`', () => {
    component.config = { text: 'text', tabindex: 1 };

    fixture.detectChanges();

    expect(getButton().properties['tabIndex']).toBe(1);
  });

  function getButton() {
    return fixture.debugElement.query(By.css('button'));
  }
});
