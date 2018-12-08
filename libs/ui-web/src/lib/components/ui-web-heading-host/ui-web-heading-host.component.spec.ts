import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UiWebHeadingLevel } from './ui-web-heading-config';
import { UiWebHeadingHostComponent } from './ui-web-heading-host.component';

describe('UiWebHeadingHostComponent', () => {
  let component: UiWebHeadingHostComponent;
  let fixture: ComponentFixture<UiWebHeadingHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiWebHeadingHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiWebHeadingHostComponent);
    component = fixture.componentInstance;
  });

  testHeading('h1');
  testHeading('h1', UiWebHeadingLevel.One);
  testHeading('h2', UiWebHeadingLevel.Two);
  testHeading('h3', UiWebHeadingLevel.Three);
  testHeading('h4', UiWebHeadingLevel.Four);
  testHeading('h5', UiWebHeadingLevel.Five);
  testHeading('h6', UiWebHeadingLevel.Six);

  function testHeading(tag: string, level?: UiWebHeadingLevel) {
    it(`should render ${tag} with text from 'config.text' when 'config.level' is ${
      UiWebHeadingLevel[level]
    }`, () => {
      component.config = { text: 'my text', level };

      fixture.detectChanges();

      const headingElem = fixture.debugElement.query(By.css(tag));

      expect(headingElem).toBeTruthy();
      expect(headingElem.nativeElement.textContent).toMatch('my text');
    });
  }
});
