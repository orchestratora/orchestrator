# @orchestrator/layout

> A set of simple layout components for Orchestrator library.

![@orchestrator/layout](https://img.shields.io/npm/v/@orchestrator/layout)

## Registration

```ts
import { NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';
import { LayoutModule } from '@orchestrator/layout';

@NgModule({
  imports: [OrchestratorCoreModule.forRoot(), LayoutModule.forRoot()],
})
export class AppModule {}
```

## Components list

| Component                                                                           | Description                                                     |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [orc-layout-flat-host](/libs/layout/src/lib/layout-flat-host/layout-flat-config.ts) | Allows to render components in a simple flat list using flexbox |
|                                                                                     |                                                                 |
