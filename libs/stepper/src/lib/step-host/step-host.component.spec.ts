import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StepHostComponent } from './step-host.component';

describe('StepHostComponent', () => {
  let component: StepHostComponent;
  let fixture: ComponentFixture<StepHostComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StepHostComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StepHostComponent);
    component = fixture.componentInstance;
  });

  it('should render <orc-render-item> with `item` as first element from `@Input(items)`', () => {
    component.items = ['item1', 'item2'] as any;

    fixture.detectChanges();

    const renderItemElem = fixture.debugElement.query(
      By.css('orc-render-item'),
    );

    expect(renderItemElem).toBeTruthy();
    expect(renderItemElem.properties.item).toBe('item1');
  });

  it('should not render <orc-render-item> if `@Input(items)` is not set', () => {
    component.items = null;

    fixture.detectChanges();

    const renderItemElem = fixture.debugElement.query(
      By.css('orc-render-item'),
    );

    expect(renderItemElem).toBeFalsy();
  });
});
