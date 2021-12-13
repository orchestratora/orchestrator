import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { OrchestratorConfigItem } from '@orchestrator/core';

import { StepConfig } from '../step-host';
import { Stepper } from '../stepper.class';
import { getStepAnimation } from './animation';

interface SectionAnimation {
  curr: boolean;
  prev: boolean;
  animate: boolean;
  shouldAnimate(): boolean;
}

@Component({
  selector: 'orc-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [...getStepAnimation('stepAnimation')],
  providers: [{ provide: Stepper, useExisting: StepperComponent }],
})
export class StepperComponent implements OnInit, OnChanges, Stepper {
  @Input() steps: OrchestratorConfigItem<StepConfig>[] = [];
  @Input() header: OrchestratorConfigItem;
  @Input() footer: OrchestratorConfigItem;

  @Input() initialStep = 0;

  @Input() loop = false;

  get stepsCount() {
    return this.steps ? this.steps.length : 0;
  }

  currentStepIdx: number | undefined;
  currentStep: OrchestratorConfigItem<StepConfig> | undefined;
  prevStep: OrchestratorConfigItem<StepConfig> | undefined;

  get hideHeader() {
    return this.isHeaderHidden(this.currentStep);
  }

  get headerItem() {
    if (this.hideHeader) {
      return;
    }

    const header = this.currentStep.config.header;
    return typeof header === 'object' ? header : this.header;
  }

  get hideFooter() {
    return this.isFooterHidden(this.currentStep);
  }

  get footerItem() {
    if (this.hideFooter) {
      return;
    }

    const footer = this.currentStep.config.footer;
    return typeof footer === 'object' ? footer : this.footer;
  }

  goingBack = false;

  animationHeader: SectionAnimation = {
    curr: false,
    prev: false,
    animate: false,
    shouldAnimate: () => this.doAnimateHeader(),
  };
  animationContent: SectionAnimation = {
    curr: false,
    prev: false,
    animate: false,
    shouldAnimate: () => this.doAnimateContent(),
  };
  animationFooter: SectionAnimation = {
    curr: false,
    prev: false,
    animate: false,
    shouldAnimate: () => this.doAnimateFooter(),
  };

  private animations: SectionAnimation[] = [
    this.animationHeader,
    this.animationContent,
    this.animationFooter,
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.steps) {
      this.activateStep(this.initialStep);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('steps' in changes) {
      this.activateStep(
        this.currentStepIdx != null ? this.currentStepIdx : this.initialStep,
      );
    }
  }

  async goTo(offsetOrId: string | number, stepData?: any) {
    if (typeof offsetOrId === 'number') {
      return await this.jumpSteps(offsetOrId, stepData);
    } else {
      return await this.toStep(offsetOrId, stepData);
    }
  }

  async goNext(stepData?: any) {
    return await this.goTo(1, stepData);
  }

  async goBack(stepData?: any) {
    return await this.goTo(-1, stepData);
  }

  async goToStart(stepData?: any) {
    return await this.activateStep(0, stepData);
  }

  async goToEnd(stepData?: any) {
    return await this.activateStep(this.steps.length - 1, stepData);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async activateStep(idx: number, stepData?: any) {
    // Bounds normalization
    if (idx >= this.steps.length) {
      idx = this.loop ? idx % this.steps.length : this.steps.length - 1;
    } else if (idx < 0) {
      idx = this.loop ? idx + this.steps.length : 0;
    }

    if (idx === this.currentStepIdx) {
      return;
    }

    // TODO(gund): do something with stepData...

    this.goingBack = this.currentStepIdx > idx;

    this.prevStep = this.currentStep;
    this.currentStep = this.steps[idx];
    this.currentStepIdx = idx;

    this.updateAnimations();
    this.cdr.markForCheck();
  }

  cleanupPrevStep() {
    this.prevStep = undefined;
  }

  private async toStep(id: string, stepData?: any) {
    const idx = this.steps.findIndex((step) => step.config.id === id);

    if (idx !== -1) {
      return await this.activateStep(idx, stepData);
    }
  }

  private async jumpSteps(n: number, stepData?: any) {
    return await this.activateStep(this.currentStepIdx + n, stepData);
  }

  private updateAnimations() {
    this.animations.forEach((animation) => {
      animation.animate = animation.shouldAnimate();

      if (animation.animate) {
        if (this.goingBack) {
          animation.prev = !animation.prev;
        } else {
          animation.curr = !animation.curr;
        }
      }
    });
  }

  private doAnimateHeader() {
    return (
      !!this.currentStep &&
      !!this.prevStep &&
      this.isHeaderHidden(this.currentStep) !==
        this.isHeaderHidden(this.prevStep)
    );
  }

  private doAnimateContent() {
    return !!this.currentStep && !!this.prevStep;
  }

  private doAnimateFooter() {
    return (
      !!this.currentStep &&
      !!this.prevStep &&
      this.isFooterHidden(this.currentStep) !==
        this.isFooterHidden(this.prevStep)
    );
  }

  private isHeaderHidden(step: OrchestratorConfigItem<StepConfig>) {
    return 'header' in step.config && !step.config.header;
  }

  private isFooterHidden(step: OrchestratorConfigItem<StepConfig>) {
    return 'footer' in step.config && !step.config.footer;
  }
}
