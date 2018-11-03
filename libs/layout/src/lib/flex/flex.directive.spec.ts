import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FlexDirective } from './flex.directive';

// FlexDirective

@Component({
  selector: 'orc-host-cmp',
  template: `
    <div orcFlex>Host Component</div>
  `,
})
export class HostFlexComponent {}

describe('FlexDirective', () => {
  let fixture: ComponentFixture<HostFlexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HostFlexComponent, FlexDirective],
    }).compileComponents();
  }));

  it('should apply display: flex to host', () => {
    fixture = TestBed.createComponent(HostFlexComponent);
    const element = fixture.debugElement.query(By.css('div'));
    fixture.detectChanges();

    expect(element.styles).toHaveProperty('display');
    expect(element.styles['display']).toBe('flex');
  });
});
