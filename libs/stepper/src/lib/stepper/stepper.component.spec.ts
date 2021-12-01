import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { StepperComponent } from './stepper.component';

describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [StepperComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;
  });

  describe('step section', () => {
    it('should render step by `initialStep` 0 by default', () => {
      component.steps = [
        { component: 'step1', config: {} as any },
        { component: 'step2', config: {} as any },
        { component: 'step3', config: {} as any },
      ];

      fixture.detectChanges();

      const stepElem = fixture.debugElement.query(
        By.css('.step-content-wrapper .step-content orc-render-item'),
      );

      expect(stepElem).toBeTruthy();
      expect(stepElem.properties.item).toBe(component.steps[0]);
    });

    it('should render step by `initialStep`', () => {
      component.steps = [
        { component: 'step1', config: {} as any },
        { component: 'step2', config: {} as any },
        { component: 'step3', config: {} as any },
      ];
      component.initialStep = 1;

      fixture.detectChanges();

      const stepElem = fixture.debugElement.query(
        By.css('.step-content-wrapper .step-content orc-render-item'),
      );

      expect(stepElem).toBeTruthy();
      expect(stepElem.properties.item).toBe(component.steps[1]);
    });

    it('should NOT render step if not set', () => {
      component.steps = [];

      fixture.detectChanges();

      const stepElem = fixture.debugElement.query(
        By.css('.step-content-wrapper .step-content orc-render-item'),
      );

      expect(stepElem).toBeFalsy();
    });
  });

  describe('header section', () => {
    it('should render by default step name', () => {
      component.steps = [
        { component: 'step1', config: { name: 'Step 1', id: 's1' } },
        { component: 'step2', config: { name: 'Step 2', id: 's2' } },
      ];

      fixture.detectChanges();

      const headerElem = fixture.debugElement.query(
        By.css('.step-header-wrapper .step-header'),
      );

      expect(headerElem).toBeTruthy();
      expect(headerElem.nativeElement.textContent).toBe('Step 1');
    });

    it('should render provided item from @Input(header) with context of current step', () => {
      component.steps = [
        { component: 'step1', config: { name: 'Step 1', id: 's1' } },
        { component: 'step2', config: { name: 'Step 2', id: 's2' } },
      ];
      component.header = { component: 'custom-header' };

      fixture.detectChanges();

      const headerElem = fixture.debugElement.query(
        By.css('.step-header-wrapper .step-header orc-render-item'),
      );

      expect(headerElem).toBeTruthy();
      expect(headerElem.properties.item).toBe(component.header);
      expect(headerElem.properties.context).toBe(component.steps[0]);
    });

    it('should render from current step `config.header` with context of current step', () => {
      component.steps = [
        {
          component: 'step1',
          config: { name: 'Step 1', id: 's1', header: {} as any },
        },
        { component: 'step2', config: { name: 'Step 2', id: 's2' } },
      ];

      fixture.detectChanges();

      const headerElem = fixture.debugElement.query(
        By.css('.step-header-wrapper .step-header orc-render-item'),
      );

      expect(headerElem).toBeTruthy();
      expect(headerElem.properties.item).toBe(component.steps[0].config.header);
      expect(headerElem.properties.context).toBe(component.steps[0]);
    });

    it('should NOT render if current step `config.header` is falsy', () => {
      component.steps = [
        {
          component: 'step1',
          config: { name: 'Step 1', id: 's1', header: false },
        },
        { component: 'step2', config: { name: 'Step 2', id: 's2' } },
      ];

      fixture.detectChanges();

      const headerElem = fixture.debugElement.query(
        By.css('.step-header-wrapper .step-header'),
      );

      expect(headerElem).toBeFalsy();
    });

    it('should NOT render if no steps set', () => {
      component.steps = [];

      fixture.detectChanges();

      const headerElem = fixture.debugElement.query(
        By.css('.step-header-wrapper .step-header'),
      );

      expect(headerElem).toBeFalsy();
    });
  });

  describe('footer section', () => {
    it('should render provided item from @Input(footer) with context of current step', () => {
      component.steps = [
        { component: 'step1', config: { name: 'Step 1', id: 's1' } },
        { component: 'step2', config: { name: 'Step 2', id: 's2' } },
      ];
      component.footer = { component: 'custom-footer' };

      fixture.detectChanges();

      const footerElem = fixture.debugElement.query(
        By.css('.step-footer-wrapper .step-footer orc-render-item'),
      );

      expect(footerElem).toBeTruthy();
      expect(footerElem.properties.item).toBe(component.footer);
      expect(footerElem.properties.context).toBe(component.steps[0]);
    });

    it('should render from current step `config.footer` with context of current step', () => {
      component.steps = [
        {
          component: 'step1',
          config: { name: 'Step 1', id: 's1', footer: {} as any },
        },
        { component: 'step2', config: { name: 'Step 2', id: 's2' } },
      ];

      fixture.detectChanges();

      const footerElem = fixture.debugElement.query(
        By.css('.step-footer-wrapper .step-footer orc-render-item'),
      );

      expect(footerElem).toBeTruthy();
      expect(footerElem.properties.item).toBe(component.steps[0].config.footer);
      expect(footerElem.properties.context).toBe(component.steps[0]);
    });

    it('should NOT render if no steps set', () => {
      component.steps = [];

      fixture.detectChanges();

      const footerElem = fixture.debugElement.query(
        By.css('.step-footer-wrapper .step-footer'),
      );

      expect(footerElem).toBeFalsy();
    });

    it('should NOT render if current step `config.footer` is falsy', () => {
      component.steps = [
        {
          component: 'step1',
          config: { name: 'Step 1', id: 's1', footer: false },
        },
        { component: 'step2', config: { name: 'Step 2', id: 's2' } },
      ];

      fixture.detectChanges();

      const footerElem = fixture.debugElement.query(
        By.css('.step-footer-wrapper .step-footer'),
      );

      expect(footerElem).toBeFalsy();
    });

    describe('default', () => {
      it('should render by default 2 control buttons', () => {
        component.steps = [
          { component: 'step1', config: { name: 'Step 1', id: 's1' } },
          { component: 'step2', config: { name: 'Step 2', id: 's2' } },
        ];

        fixture.detectChanges();

        const footerElem = fixture.debugElement.query(
          By.css('.step-footer-wrapper .step-footer'),
        );

        expect(footerElem).toBeTruthy();

        const btns = footerElem.queryAll(By.css('button'));

        expect(btns.length).toBe(2);
      });

      describe('prev button', () => {
        it('should have class `.step-footer--prev`', () => {
          component.steps = [
            { component: 'step1', config: { name: 'Step 1', id: 's1' } },
          ];

          fixture.detectChanges();

          const prevBtnElem = fixture.debugElement.query(
            By.css('.step-footer-wrapper .step-footer .step-footer--prev'),
          );

          expect(prevBtnElem).toBeTruthy();
        });

        it('should have text `Prev`', () => {
          component.steps = [
            { component: 'step1', config: { name: 'Step 1', id: 's1' } },
          ];

          fixture.detectChanges();

          const prevBtnElem = fixture.debugElement.query(
            By.css('.step-footer-wrapper .step-footer .step-footer--prev'),
          );

          expect(prevBtnElem).toBeTruthy();
          expect(prevBtnElem.nativeElement.textContent.trim()).toBe('Prev');
        });

        it('should activate previous step on click', () => {
          component.steps = [
            { component: 'step1', config: { name: 'Step 1', id: 's1' } },
            { component: 'step2', config: { name: 'Step 2', id: 's2' } },
          ];
          component.initialStep = 1;

          fixture.detectChanges();

          const stepElem = fixture.debugElement.query(
            By.css('.step-content orc-render-item'),
          );
          const prevBtnElem = fixture.debugElement.query(
            By.css('.step-footer-wrapper .step-footer .step-footer--prev'),
          );

          expect(stepElem.properties.item).toBe(component.steps[1]);
          expect(prevBtnElem).toBeTruthy();

          prevBtnElem.triggerEventHandler('click', {});

          fixture.detectChanges();

          expect(stepElem.properties.item).toBe(component.steps[0]);
        });
      });

      describe('next button', () => {
        it('should have class `.step-footer--next`', () => {
          component.steps = [
            { component: 'step1', config: { name: 'Step 1', id: 's1' } },
          ];

          fixture.detectChanges();

          const nextBtnElem = fixture.debugElement.query(
            By.css('.step-footer-wrapper .step-footer .step-footer--next'),
          );

          expect(nextBtnElem).toBeTruthy();
        });

        it('should have text `Next`', () => {
          component.steps = [
            { component: 'step1', config: { name: 'Step 1', id: 's1' } },
          ];

          fixture.detectChanges();

          const nextBtnElem = fixture.debugElement.query(
            By.css('.step-footer-wrapper .step-footer .step-footer--next'),
          );

          expect(nextBtnElem).toBeTruthy();
          expect(nextBtnElem.nativeElement.textContent.trim()).toBe('Next');
        });

        it('should activate next step on click', () => {
          component.steps = [
            { component: 'step1', config: { name: 'Step 1', id: 's1' } },
            { component: 'step2', config: { name: 'Step 2', id: 's2' } },
          ];
          component.initialStep = 0;

          fixture.detectChanges();

          const stepElem = fixture.debugElement.query(
            By.css('.step-content orc-render-item'),
          );
          const nextBtnElem = fixture.debugElement.query(
            By.css('.step-footer-wrapper .step-footer .step-footer--next'),
          );

          expect(stepElem.properties.item).toBe(component.steps[0]);
          expect(nextBtnElem).toBeTruthy();

          nextBtnElem.triggerEventHandler('click', {});

          fixture.detectChanges();

          expect(stepElem.properties.item).toBe(component.steps[1]);
        });
      });
    });
  });

  describe('Stepper interface', () => {
    describe('steps prop', () => {
      it('should return all steps items', () => {
        component.steps = [];

        fixture.detectChanges();

        expect(component.steps).toBe(component.steps);
      });
    });

    describe('currentStep prop', () => {
      it('should return currently active step item', () => {
        component.steps = [
          { component: 'step1', config: { name: 'Step 1', id: 's1' } },
          { component: 'step2', config: { name: 'Step 2', id: 's2' } },
        ];
        component.initialStep = 1;

        fixture.detectChanges();

        expect(component.currentStep).toBe(component.steps[1]);
      });
    });

    describe('currentStepIdx prop', () => {
      it('should return currently active step index', () => {
        component.steps = [
          { component: 'step1', config: { name: 'Step 1', id: 's1' } },
          { component: 'step2', config: { name: 'Step 2', id: 's2' } },
        ];

        fixture.detectChanges();

        expect(component.currentStepIdx).toBe(0);
      });
    });

    describe('stepsCount prop', () => {
      it('should return total count of steps', () => {
        component.steps = [
          { component: 'step1', config: { name: 'Step 1', id: 's1' } },
          { component: 'step2', config: { name: 'Step 2', id: 's2' } },
        ];

        fixture.detectChanges();

        expect(component.stepsCount).toBe(2);
      });
    });

    describe('activateStep() method', () => {
      it('should jump to step by number', () => {
        component.steps = [
          { component: 'step1', config: { name: 'Step 1', id: 's1' } },
          { component: 'step2', config: { name: 'Step 2', id: 's2' } },
          { component: 'step3', config: { name: 'Step 3', id: 's3' } },
        ];
        component.initialStep = 1;

        fixture.detectChanges();

        expect(component.currentStepIdx).toBe(1);

        component.activateStep(0);

        fixture.detectChanges();

        expect(component.currentStepIdx).toBe(0);

        component.activateStep(2);

        fixture.detectChanges();

        expect(component.currentStepIdx).toBe(2);
      });

      it('should remain withing steps boundaries', () => {
        component.steps = [
          { component: 'step1', config: { name: 'Step 1', id: 's1' } },
          { component: 'step2', config: { name: 'Step 2', id: 's2' } },
        ];

        fixture.detectChanges();

        expect(component.currentStepIdx).toBe(0);

        component.activateStep(2);

        fixture.detectChanges();

        expect(component.currentStepIdx).toBe(1);

        component.activateStep(-1);

        fixture.detectChanges();

        expect(component.currentStepIdx).toBe(0);
      });

      it('should cycle between steps if `@Input(loop)` is `true`', () => {
        component.steps = [
          { component: 'step1', config: { name: 'Step 1', id: 's1' } },
          { component: 'step2', config: { name: 'Step 2', id: 's2' } },
        ];
        component.initialStep = 1;
        component.loop = true;

        fixture.detectChanges();

        expect(component.currentStepIdx).toBe(1);

        component.activateStep(2);

        fixture.detectChanges();

        expect(component.currentStepIdx).toBe(0);

        component.activateStep(-1);

        fixture.detectChanges();

        expect(component.currentStepIdx).toBe(1);
      });
    });

    describe('goTo() method', () => {
      describe('with number', () => {
        it('should call `activateStep` with `currentStepIdx + n` and data', () => {
          component.steps = [
            { component: 'step1', config: { name: 'Step 1', id: 's1' } },
            { component: 'step2', config: { name: 'Step 2', id: 's2' } },
            { component: 'step3', config: { name: 'Step 3', id: 's3' } },
          ];
          component.initialStep = 1;

          fixture.detectChanges();

          const activateStep = spyOn(component, 'activateStep');

          component.goTo(1, 'data');

          fixture.detectChanges();

          expect(activateStep).toHaveBeenCalledWith(2, 'data');

          component.goTo(-1, 'data');

          fixture.detectChanges();

          expect(activateStep).toHaveBeenCalledWith(0, 'data');
        });
      });

      describe('with step id', () => {
        it('should call `activateStep` with step index and data', () => {
          component.steps = [
            { component: 'step1', config: { name: 'Step 1', id: 's1' } },
            { component: 'step2', config: { name: 'Step 2', id: 's2' } },
          ];

          fixture.detectChanges();

          const activateStep = spyOn(component, 'activateStep');

          component.goTo('s2', 'data');

          fixture.detectChanges();

          expect(activateStep).toHaveBeenCalledWith(1, 'data');
        });

        it('should NOT call `activateStep` if step index not found', () => {
          component.steps = [
            { component: 'step1', config: { name: 'Step 1', id: 's1' } },
            { component: 'step2', config: { name: 'Step 2', id: 's2' } },
          ];

          fixture.detectChanges();

          const activateStep = spyOn(component, 'activateStep');

          component.goTo('non-existing', 'data');

          fixture.detectChanges();

          expect(activateStep).not.toHaveBeenCalled();
        });
      });
    });

    describe('goNext() method', () => {
      it('should call `goTo` with `1` and extra params', () => {
        const goTo = spyOn(component, 'goTo');

        component.goNext('data');

        expect(goTo).toHaveBeenCalledWith(1, 'data');
      });
    });

    describe('goBack() method', () => {
      it('should call `goTo` with `-1` and extra params', () => {
        const goTo = spyOn(component, 'goTo');

        component.goBack('data');

        expect(goTo).toHaveBeenCalledWith(-1, 'data');
      });
    });

    describe('goToStart() method', () => {
      it('should call `activateStep` with `0` and extra params', () => {
        const activateStep = spyOn(component, 'activateStep');

        component.goToStart('data');

        expect(activateStep).toHaveBeenCalledWith(0, 'data');
      });
    });

    describe('goToEnd() method', () => {
      it('should call `activateStep` with `steps.length - 1` and extra params', () => {
        component.steps = [
          { component: 'step1', config: { name: 'Step 1', id: 's1' } },
          { component: 'step2', config: { name: 'Step 2', id: 's2' } },
        ];

        const activateStep = spyOn(component, 'activateStep');

        component.goToEnd('data');

        expect(activateStep).toHaveBeenCalledWith(1, 'data');
      });
    });
  });
});
