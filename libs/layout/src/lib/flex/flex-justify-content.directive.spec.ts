import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LayoutFlatJustifyOptions } from '../types';
import { FlexJustifyContentDirective } from './flex-justify-content.directive';

@Component({
  selector: 'orc-host-comp',
  template: ` <div [orcFxJustifyContent]="justifyContent"></div> `,
})
class HostComponent {
  justifyContent: LayoutFlatJustifyOptions;
}

describe('Directive: FlexJustifyContent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComp: HostComponent;
  let directiveElem: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlexJustifyContentDirective, HostComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    hostComp = fixture.componentInstance;
    directiveElem = fixture.debugElement.query(
      By.directive(FlexJustifyContentDirective),
    );
  });

  it('should create an instance', () => {
    expect(directiveElem).toBeTruthy();
  });

  it('should set CSS style `justify-content` to it`s input', () => {
    hostComp.justifyContent = 'center';

    fixture.detectChanges();

    expect(directiveElem.styles['justify-content']).toBe('center');
  });

  it('should update CSS style `justify-content` when input changes', () => {
    hostComp.justifyContent = 'center';

    fixture.detectChanges();

    expect(directiveElem.styles['justify-content']).toBe('center');

    hostComp.justifyContent = 'flex-start';

    fixture.detectChanges();

    expect(directiveElem.styles['justify-content']).toBe('flex-start');
  });
});
