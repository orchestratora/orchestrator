import { Component } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FlexDirectionDirective } from './flex-direction.directive';

@Component({
  selector: 'orc-host-direction-cmp',
  template: `
    <div [orcFlexDirection]="direction">Host Component</div>
  `,
})
export class HostFlexDirectionComponent {
  direction = 'column';
}

describe('FlexDirectionDirective', () => {
  let fixture: ComponentFixture<HostFlexDirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HostFlexDirectionComponent, FlexDirectionDirective],
    }).compileComponents();
  }));

  it('should apply direction to host', () => {
    fixture = TestBed.createComponent(HostFlexDirectionComponent);
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('div'));
    expect(element.styles).toHaveProperty('flex-direction');
    expect(element.styles['flex-direction']).toBe('column');
  });
});
