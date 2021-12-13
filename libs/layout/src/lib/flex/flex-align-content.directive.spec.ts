import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LayoutFlatAlignContentOptions } from '../types';
import { FlexAlignContentDirective } from './flex-align-content.directive';

@Component({
  selector: 'orc-host-comp',
  template: ` <div [orcFxAlignContent]="alignContent"></div> `,
})
class HostComponent {
  alignContent: LayoutFlatAlignContentOptions;
}

describe('Directive: FlexAlignContentDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComp: HostComponent;
  let directiveElem: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FlexAlignContentDirective, HostComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    hostComp = fixture.componentInstance;
    directiveElem = fixture.debugElement.query(
      By.directive(FlexAlignContentDirective),
    );
  });

  it('should create an instance', () => {
    expect(directiveElem).toBeTruthy();
  });

  it('should set CSS style `align-content` to it`s input', () => {
    hostComp.alignContent = 'center';

    fixture.detectChanges();

    expect(directiveElem.styles['align-content']).toBe('center');
  });

  it('should update CSS style `align-content` when input changes', () => {
    hostComp.alignContent = 'center';

    fixture.detectChanges();

    expect(directiveElem.styles['align-content']).toBe('center');

    hostComp.alignContent = 'flex-start';

    fixture.detectChanges();

    expect(directiveElem.styles['align-content']).toBe('flex-start');
  });
});
