import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HtmlTextConfig } from './html-text-config';
import { HtmlTextComponent } from './html-text.component';

describe('HtmlTextComponent', () => {
  @Component({
    selector: 'orc-test',
    template: `<orc-html-text [config]="config"></orc-html-text>`,
  })
  class TestComponent {
    config?: HtmlTextConfig;
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HtmlTextComponent, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should render text from config.text when set', () => {
    component.config = { text: 'text' };

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toMatch('text');
  });

  it('should not render text when config.text not set', () => {
    component.config = { text: 'text' };

    fixture.detectChanges();

    component.config = {};

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toMatch('text');
  });
});
