import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { StepperHostComponent } from './stepper-host.component';

describe('StepperHostComponent', () => {
  let component: StepperHostComponent;
  let fixture: ComponentFixture<StepperHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepperHostComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperHostComponent);
    component = fixture.componentInstance;
  });

  it('should render <orc-stepper>', () => {
    fixture.detectChanges();

    const stepperElem = fixture.debugElement.query(By.css('orc-stepper'));

    expect(stepperElem).toBeTruthy();
  });

  it('should set `steps` of <orc-stepper> to `@Input(items)`', () => {
    component.items = 'items' as any;

    fixture.detectChanges();

    const stepperElem = fixture.debugElement.query(By.css('orc-stepper'));

    expect(stepperElem).toBeTruthy();
    expect(stepperElem.properties.steps).toBe('items');
  });

  it('should set `header` of <orc-stepper> to `@Input(config).header`', () => {
    component.config = { header: 'header' as any };

    fixture.detectChanges();

    const stepperElem = fixture.debugElement.query(By.css('orc-stepper'));

    expect(stepperElem).toBeTruthy();
    expect(stepperElem.properties.header).toBe('header');
  });

  it('should set `footer` of <orc-stepper> to `@Input(config).footer`', () => {
    component.config = { footer: 'footer' as any };

    fixture.detectChanges();

    const stepperElem = fixture.debugElement.query(By.css('orc-stepper'));

    expect(stepperElem).toBeTruthy();
    expect(stepperElem.properties.footer).toBe('footer');
  });

  it('should set `loop` of <orc-stepper> to `@Input(config).loopSteps`', () => {
    component.config = { loopSteps: 'loopSteps' as any };

    fixture.detectChanges();

    const stepperElem = fixture.debugElement.query(By.css('orc-stepper'));

    expect(stepperElem).toBeTruthy();
    expect(stepperElem.properties.loop).toBe('loopSteps');
  });
});
