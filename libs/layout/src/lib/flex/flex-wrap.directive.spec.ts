import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FlexWrapDirective } from './flex-wrap.directive';

@Component({
  selector: 'orc-host-wrap-cmp',
  template: ` <div [orcFxWrap]="wrap">Host Component</div> `,
})
class HostFlexWrapComponent {
  wrap = 'wrap';
}

describe('FlexWrapDirective', () => {
  let fixture: ComponentFixture<HostFlexWrapComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HostFlexWrapComponent, FlexWrapDirective],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    }),
  );

  it('should apply correct `wrap` style to host', () => {
    fixture = TestBed.createComponent(HostFlexWrapComponent);
    const element = fixture.debugElement.query(By.css('div'));
    fixture.detectChanges();

    expect(element.styles).toHaveProperty('flex-wrap');
    expect(element.styles['flex-wrap']).toBe('wrap');
  });

  it('should apply correct `wrap` style to host', () => {
    fixture = TestBed.createComponent(HostFlexWrapComponent);
    fixture.componentInstance.wrap = 'nowrap';
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('div'));
    expect(element.styles).toHaveProperty('flex-wrap');
    expect(element.styles['flex-wrap']).toBe('nowrap');
  });
});
