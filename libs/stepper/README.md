# @orchestrator/stepper

> A stepper component for Orchestrator library.

![@orchestrator/stepper](https://img.shields.io/npm/v/@orchestrator/stepper)

## Registration

```ts
import { NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';
import { StepperModule } from '@orchestrator/stepper';

@NgModule({
  imports: [OrchestratorCoreModule.forRoot(), StepperModule.forRoot()],
})
export class AppModule {}
```

## Components list

| Component                                                                | Description                     |
| ------------------------------------------------------------------------ | ------------------------------- |
| [orc-stepper-host](/libs/stepper/src/lib/stepper-host/stepper-config.ts) | Allows to render multiple steps |
| [orc-step-host](/libs/stepper/src/lib/step-host/step-config.ts)          | Allows to render a single step  |
|                                                                          |                                 |
