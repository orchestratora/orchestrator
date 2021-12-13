import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LayoutFlatAlignItemsOptions } from '../types';
import { FlexAlignItemsDirective } from './flex-align-items.directive';

@Component({
  selector: 'orc-host-comp',
  template: ` <div [orcFxAlignItems]="alignItems"></div> `,
})
class HostComponent {
  alignItems: LayoutFlatAlignItemsOptions;
}

describe('Directive: FlexAlignItemsDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComp: HostComponent;
  let directiveElem: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FlexAlignItemsDirective, HostComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    hostComp = fixture.componentInstance;
    directiveElem = fixture.debugElement.query(
      By.directive(FlexAlignItemsDirective),
    );
  });

  it('should create an instance', () => {
    expect(directiveElem).toBeTruthy();
  });

  it('should set CSS style `align-items` to it`s input', () => {
    hostComp.alignItems = 'center';

    fixture.detectChanges();

    expect(directiveElem.styles['align-items']).toBe('center');
  });

  it('should update CSS style `align-items` when input changes', () => {
    hostComp.alignItems = 'center';

    fixture.detectChanges();

    expect(directiveElem.styles['align-items']).toBe('center');

    hostComp.alignItems = 'flex-start';

    fixture.detectChanges();

    expect(directiveElem.styles['align-items']).toBe('flex-start');
  });
});
