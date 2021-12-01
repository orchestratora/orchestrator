import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UiWebTextHostComponent } from './ui-web-text-host.component';
import { SimpleChange } from '@angular/core';

describe('UiWebTextHostComponent', () => {
  let component: UiWebTextHostComponent;
  let fixture: ComponentFixture<UiWebTextHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiWebTextHostComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiWebTextHostComponent);
    component = fixture.componentInstance;
  });

  it('should render p with text from `config.text`', () => {
    component.config = { text: 'some text' };

    fixture.detectChanges();

    const pElem = fixture.debugElement.query(By.css('p'));

    expect(pElem).toBeTruthy();
    expect(pElem.nativeElement.textContent).toMatch('some text');
  });

  describe('textWithCtx', () => {
    it('should render p with text with context', () => {
      component.config = { textFn: (ctx) => `Val: ${ctx.val}` };
      component.context = { val: 'from context' };

      fixture.detectChanges();

      const pElem = fixture.debugElement.query(By.css('p'));

      expect(pElem).toBeTruthy();
      expect(pElem.nativeElement.textContent).toMatch('Val: from context');
    });
  });

  describe('preserveFormatting option', () => {
    it('should render text withing `pre` when set to `true`', () => {
      component.config = { text: 'some\ntext', preserveFormatting: true };

      fixture.detectChanges();

      const pElem = fixture.debugElement.query(By.css('pre p'));

      expect(pElem).toBeTruthy();
      expect(pElem.nativeElement.textContent).toMatch(/some\ntext/);
    });
  });
});
